from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from PyPDF2 import PdfReader
from django.http import JsonResponse

@api_view(['GET'])
def test(request):
    return Response({'message':'Test Successful'})




@api_view(['POST'])
def upload_pdf(request):
    if request.method == 'POST' and request.FILES['pdf_file']:
        pdf_file = request.FILES['pdf_file']
        
        # Read the PDF file
        reader = PdfReader(pdf_file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        
        # Return the extracted text
        return JsonResponse({'content': text})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)