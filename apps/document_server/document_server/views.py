import os
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient
from PyPDF2 import PdfReader
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaIoBaseDownload
from dotenv import load_dotenv
import threading
import io
import base64
import tempfile
from bson import ObjectId 
load_dotenv()

# MongoDB setup
MONGO_URI = os.getenv('MONGO_URI')
DATABASE_NAME = os.getenv('DATABASE_NAME')
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
student_collection = db['students']
stud_info_collection = db['studentinfos']

# Google Drive API setup with Service Account
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

# List to keep track of processing user IDs
processing_users = []
lock = threading.Lock()  # To manage access to the processing list

def create_service_account_file():
    # Get the base64-encoded service account JSON from environment variables
    service_account_base64 = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON_BASE64')

    
    if not service_account_base64:
        raise ValueError("Base64 encoded service account key is missing.")
    
    # Decode the base64 string
    service_account_json = base64.b64decode(service_account_base64)
    
    # Create a temporary file to store the service account JSON
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
    temp_file.write(service_account_json)
    temp_file.flush()
    
    return temp_file.name  # Return the path to the temporary file

def get_drive_service():
    # Create the service account file from the base64-encoded string
    service_account_json_path = create_service_account_file()
    
    # Ensure the file exists
    if not os.path.exists(service_account_json_path):
        raise FileNotFoundError(f"Service account file not found: {service_account_json_path}")
    
    # Load the credentials using the temporary service account file
    creds = Credentials.from_service_account_file(service_account_json_path)
    
    # Build the Drive API client
    drive_service = build('drive', 'v3', credentials=creds)
    
    return drive_service


@api_view(['POST'])
def verify_user(request):
    user_id = request.data.get('userId')

    # Convert userId to ObjectId
    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        return Response({'message': 'Invalid user ID format'}, status=400)

    with lock:  # Locking to ensure thread safety
        if user_id in processing_users:
            return Response({'message': 'User is already being processed'}, status=400)
        processing_users.append(user_id)

    try:
        # Fetch user data from MongoDB
        user_data = student_collection.find_one({'_id': user_id})
        if not user_data:
            return Response({'message': 'User not found'}, status=404)

        # Fetch user info using stud_info_id
        stud_info_id = user_data.get('stud_info_id')
        if not stud_info_id:
            return Response({'message': 'User info not found'}, status=404)

        # Fetch student info from the studentinfos collection
        stud_info = stud_info_collection.find_one({'_id': ObjectId(stud_info_id)})
        if not stud_info:
            return Response({'message': 'Student info not found'}, status=404)

        # Fetch marksheet URLs
        marksheets = [
            stud_info.get('stud_sem1_marksheet'),
            stud_info.get('stud_sem2_marksheet'),
            stud_info.get('stud_sem3_marksheet'),
            stud_info.get('stud_sem4_marksheet'),
            stud_info.get('stud_sem5_marksheet'),
            stud_info.get('stud_sem6_marksheet'),
            stud_info.get('stud_sem7_marksheet'),
            stud_info.get('stud_sem8_marksheet'),
        ]

        verification_success = False

        # Iterate through each marksheet URL
        for pdf_url in marksheets:
            if not pdf_url:  # Skip if the URL is None
                continue

            # Download the PDF from Google Drive
            drive_service = get_drive_service()
            file_id = pdf_url.split('/')[-2]  # Extract file ID from URL
            request = drive_service.files().get_media(fileId=file_id)

            # Use an in-memory buffer to download the PDF
            pdf_stream = io.BytesIO()
            downloader = MediaIoBaseDownload(pdf_stream, request)
            done = False
            while not done:
                status, done = downloader.next_chunk()

            pdf_stream.seek(0)  # Reset buffer position

            # Extract text from the PDF
            reader = PdfReader(pdf_stream)
            extracted_text = ""
            for page in reader.pages:
                extracted_text += page.extract_text() or ""

            print(extracted_text, user_data.get('name'))

            # Extract and compare additional details
            name_check = user_data.get('stud_name') in extracted_text
            branch_check = user_data.get('branch') in extracted_text  # Assuming 'branch' is a field in user_data
            

            sem_n_check = False
            for i in range(1, 9):  # Assuming 8 semesters
                sem_name = stud_info.get(f'{i}')
                if sem_name and f"Semester {i}" in extracted_text:
                    print(extracted_text)
                    sem_n_check = True
                    break

            # Dynamic SGPI check
            sgpi_check = False
            for i in range(1, 9):  # Assuming 8 semesters
                sgpi_value = stud_info.get(f'stud_sem{i}_grade')
                if sgpi_value and f"SGPI: {sgpi_value}" in extracted_text:
                    sgpi_check = True
                    break  # If any SGPI matches, break out of the loop

            # If all checks pass for this marksheet, set verification_success to True
            if name_check and sgpi_check and branch_check and sem_name_check:
                verification_success = True
                break  # No need to check further marksheets

        # Determine final verification status
        if verification_success:
            # Update verification status in MongoDB
            student_collection.update_one({'_id': user_id}, {'$set': {'isVerified': True}})
            response_message = 'Verification successful'
        else:
            response_message = 'Verification failed'

        return Response({'message': response_message})

    finally:
        with lock:
            processing_users.remove(user_id)



def convert_objectid(data):
    if isinstance(data, dict):
        return {k: convert_objectid(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_objectid(i) for i in data]
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data


@api_view(['GET'])
def test(request):
    # Fetch all users from the MongoDB collection
    users = student_collection.find()

    # Convert MongoDB cursor to a list of dictionaries and recursively handle ObjectId
    users_list = [convert_objectid(user) for user in users]

    # Return the list of users as a JSON response
    return Response({'users': users_list})
