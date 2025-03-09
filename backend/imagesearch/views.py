from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pymongo
import requests

# API test call through browser
# http://127.0.0.1:8000/search_images/?query=dog&page=1&per_page=1


# Connect to MongoDB
client = pymongo.MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]
collection = db['images']

@api_view(['GET'])
def search_images(request):
    query = request.GET.get('query', '')
    page = int(request.GET.get('page', '1'))  # Convert to integer
    per_page = int(request.GET.get('per_page', '10'))  # Convert to integer

    if not query:
        return Response({'error': 'Query parameter is required'}, status=400)

    # Unsplash API endpoint
    url = f"https://api.unsplash.com/search/photos?query={query}&page={page}&per_page={per_page}"
    headers = {
        "Authorization": f"Client-ID {settings.UNSPLASH_API_KEY}"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return Response({'error': 'Failed to fetch images from Unsplash'}, status=response.status_code)

    data = response.json()
    print("API Response:", data)  # Debugging: Log the API response

    images = data.get('results', [])

    # Store images in MongoDB
    if images:
        collection.insert_many(images)

    # Remove or convert ObjectId fields for JSON serialization
    for image in images:
        if '_id' in image:
            image['_id'] = str(image['_id'])  # Convert ObjectId to string

    return Response(images)

@api_view(['GET'])
def get_image(request, image_id):
    image = collection.find_one({'id': image_id})
    if not image:
        return Response({'error': 'Image not found'}, status=404)

    # Remove or convert ObjectId field for JSON serialization
    if '_id' in image:
        image['_id'] = str(image['_id'])  # Convert ObjectId to string

    return Response(image)
