import os
import base64
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient
from PyPDF2 import PdfReader
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from decouple import config
from googleapiclient.http import MediaIoBaseDownload
import threading

# MongoDB setup
MONGO_URI = config('MONGO_URI')
DATABASE_NAME = config('DATABASE_NAME')
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
student_collection = db['students']

# Google Drive API setup
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

# List to keep track of processing user IDs
processing_users = []
lock = threading.Lock()  # To manage access to the processing list

def get_drive_service():
    creds = None
    # Decode the Base64 encoded credentials
    base64_creds = config('GOOGLE_CREDENTIALS_BASE64')
    decoded_creds = base64.b64decode(base64_creds)

    # Save to a temporary credentials.json file
    with open('credentials.json', 'wb') as f:
        f.write(decoded_creds)

    # Load credentials from the temporary file
    if os.path.exists('credentials.json'):
        creds = Credentials.from_authorized_user_file('credentials.json', SCOPES)

    if not creds or not creds.valid:
        raise Exception("Invalid credentials")
    
    drive_service = build('drive', 'v3', credentials=creds)

    # Clean up the credentials file after use
    os.remove('credentials.json')

    return drive_service

@api_view(['POST'])
def verify_user(request):
    user_id = request.data.get('userId')

    with lock:  # Locking to ensure thread safety
        if user_id in processing_users:
            return Response({'message': 'User is already being processed'}, status=400)
        processing_users.append(user_id)

    try:
        # Fetch user data from MongoDB
        user_data = student_collection.find_one({'_id': user_id})
        if not user_data:
            return Response({'message': 'User not found'}, status=404)

        # Fetch PDF URL from user data
        pdf_url = user_data.get('pdf_url')
        if not pdf_url:
            return Response({'message': 'PDF not found for user'}, status=404)

        # Download the PDF from Google Drive
        drive_service = get_drive_service()
        file_id = pdf_url.split('/')[-2]  # Extract file ID from URL
        request = drive_service.files().get_media(fileId=file_id)
        
        pdf_path = f'temp_{user_id}.pdf'
        downloader = MediaIoBaseDownload(open(pdf_path, 'wb'), request)
        done = False
        while not done:
            status, done = downloader.next_chunk()

        # Extract text from the PDF
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""

        # Compare extracted text with user-provided data
        if user_data['name'] in text:
            # Update verification status in MongoDB
            student_collection.update_one({'_id': user_id}, {'$set': {'isVerified': True}})
            response_message = 'Verification successful'
        else:
            response_message = 'Verification failed'
    
        return Response({'message': response_message})

    finally:
        with lock:
            processing_users.remove(user_id)  # Ensure removal even if an error occurs
        # Clean up
        os.remove(pdf_path)



api_view(['GET'])
def test(request):
    return Response({'message': 'Test successful'})