from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import cv2
import numpy as np
import os

def index(request):
    context = {}
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image_file.name, image_file)
        uploaded_file_url = fs.url(filename)

        # Read the image file
        image_path = fs.path(filename)
        original_image = cv2.imread(image_path, cv2.IMREAD_COLOR)

        if original_image is None:
            context['error'] = 'Unable to load image.'
        else:
            # Convert to grayscale and detect edges
            gray_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
            edges = cv2.Canny(gray_image, 100, 200)

            # Save the edge detected image
            edges_filename = f"edges_{filename}"
            edges_image_path = fs.path(edges_filename)
            cv2.imwrite(edges_image_path, edges)
            edges_file_url = fs.url(edges_filename)

            # Add URLs to context
            context['original_image'] = uploaded_file_url
            context['edges_image'] = edges_file_url

    return render(request, 'edge_detection_app/index.html', context)
