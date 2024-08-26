import re
import tempfile
import os
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from PyPDF2 import PdfReader
from pdf2image import convert_from_path
from pytesseract import image_to_string

@api_view(['GET'])
def test(request):
    return Response({'message': 'Test Successful'})

@api_view(['POST'])
def upload_pdf(request):
    if request.method == 'POST' and 'pdf_file' in request.FILES:
        pdf_file = request.FILES['pdf_file']
        
        # Ensure the file is a PDF
        if not pdf_file.name.endswith('.pdf'):
            return JsonResponse({'error': 'The uploaded file is not a PDF.'}, status=400)
        
        try:
            text = ''
            
            # Save the uploaded PDF to a temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
                for chunk in pdf_file.chunks():
                    temp_pdf.write(chunk)
                temp_pdf_path = temp_pdf.name
            
            # Initialize the PdfReader
            reader = PdfReader(temp_pdf_path)
            
            # Extract text from each page
            for page in reader.pages:
                extracted_text = page.extract_text()
                if extracted_text:
                    text += extracted_text
                else:
                    # If no text is extracted, use OCR on the page's image
                    with tempfile.TemporaryDirectory() as temp_dir:
                        images = convert_from_path(temp_pdf_path, output_folder=temp_dir)
                        for image in images:
                            text += image_to_string(image)
                        # Clean up temporary images
                        for image in images:
                            os.remove(image.filename)
            
            # Remove the temporary PDF file
            os.remove(temp_pdf_path)
            
            # Search for SGPI in the extracted text
            sgpi_match = re.search(r'SGPI\s*:\s*(\d+(\.\d+)?)', text, re.IGNORECASE)
            sgpi_value = sgpi_match.group(1) if sgpi_match else 'SGPI not found'
            
            return JsonResponse({'success': True, 'sgpi': sgpi_value})
        
        except Exception as e:
            return JsonResponse({'error': f'Failed to process the PDF: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Invalid request. Please upload a PDF file.'}, status=400)
