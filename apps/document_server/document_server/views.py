import os
import logging
import tempfile  # Import tempfile here
import re
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from adobe.pdfservices.operation.auth.service_principal_credentials import ServicePrincipalCredentials
from adobe.pdfservices.operation.exception.exceptions import ServiceApiException, ServiceUsageException, SdkException
from adobe.pdfservices.operation.io.cloud_asset import CloudAsset
from adobe.pdfservices.operation.io.stream_asset import StreamAsset
from adobe.pdfservices.operation.pdf_services import PDFServices
from adobe.pdfservices.operation.pdf_services_media_type import PDFServicesMediaType
from adobe.pdfservices.operation.pdfjobs.jobs.ocr_pdf_job import OCRPDFJob
from adobe.pdfservices.operation.pdfjobs.result.ocr_pdf_result import OCRPDFResult


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@api_view(['POST'])
def upload_pdf(request):
    if request.method == 'POST' and 'pdf_file' in request.FILES:
        pdf_file = request.FILES['pdf_file']
        
        if not pdf_file.name.endswith('.pdf'):
            return JsonResponse({'error': 'The uploaded file is not a PDF.'}, status=400)
        
        if pdf_file.size > 5 * 1024 * 1024:
            return JsonResponse({'error': 'The uploaded file is too large. Maximum size is 5MB.'}, status=400)
        
        try:
            # Save the uploaded PDF to a temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
                for chunk in pdf_file.chunks():
                    temp_pdf.write(chunk)
                temp_pdf_path = temp_pdf.name

            # Perform OCR using Adobe PDF Services SDK
            output_file_path = 'output/OcrPDFWithOptions.pdf'
            ocr_pdf_with_options(temp_pdf_path, output_file_path)

            # Read the OCR result
            with open(output_file_path, 'rb') as result_file:
                result_text = result_file.read().decode('utf-8')

            # Extract SGPI value from result text
            sgpi_value = extract_sgpi_from_text(result_text)
            if not sgpi_value:
                sgpi_value = 'SGPI not found'

            return JsonResponse({'success': True, 'sgpi': sgpi_value, 'extracted_text': result_text})

        except Exception as e:
            logger.error(f'Error processing PDF: {str(e)}')
            return JsonResponse({'error': f'Failed to process the PDF: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request. Please upload a PDF file.'}, status=400)

def ocr_pdf_with_options(input_pdf_path, output_pdf_path):
    """Run OCR on the provided PDF file using Adobe PDF Services SDK."""
    try:
        credentials = ServicePrincipalCredentials(
            client_id=os.getenv('705f9530b33d48c8b648adaac1ac5219'),
            client_secret=os.getenv('p8e-h_zkVYVbhMS3NI21dojfa-tTHDwPBFJs')
        )

        pdf_services = PDFServices(credentials=credentials)

        with open(input_pdf_path, 'rb') as file:
            input_stream = file.read()

        input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.PDF)

        ocr_pdf_params = OCRParams(
            ocr_locale=OCRSupportedLocale.EN_US,
            ocr_type=OCRSupportedType.SEARCHABLE_IMAGE
        )

        ocr_pdf_job = OCRPDFJob(input_asset=input_asset, ocr_pdf_params=ocr_pdf_params)
        location = pdf_services.submit(ocr_pdf_job)
        pdf_services_response = pdf_services.get_job_result(location, OCRPDFResult)

        result_asset = pdf_services_response.get_result().get_asset()
        stream_asset = pdf_services.get_content(result_asset)

        with open(output_pdf_path, "wb") as file:
            file.write(stream_asset.get_input_stream())
    
    except (ServiceApiException, ServiceUsageException, SdkException) as e:
        logger.exception(f'Exception encountered while executing operation: {e}')

def extract_sgpi_from_text(text):
    """Search for SGPI value in extracted text using regex."""
    sgpi_match = re.search(r'SGPI\s*:\s*(\d+(\.\d+)?)', text, re.IGNORECASE)
    return sgpi_match.group(1) if sgpi_match else None

@api_view(["GET"])
def test(request):
    return JsonResponse({'success': True})
