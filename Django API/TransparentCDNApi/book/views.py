from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.shortcuts import render, get_object_or_404, get_list_or_404
from book.models import Book
from book.serializers import BookSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def books_list(request):
    """
    List all code books, or create a new books.
    """
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
        """
        Error Code (invalid_data): Example more characters in ISBNCode than 17.
            {
                "ISBNCode": [
                    "Ensure this field has no more than 17 characters."
                ]
            }
        """

@api_view(['GET', 'DELETE'])
def books_detail(request, id):
    """
    Retrieve, update or delete a code book.
    """

    book = Book.objects.get_object_or_404(id=id)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return JsonResponse(serializer.data)
    
    elif request.method == 'DELETE':
        book.delete()
        return HttpResponse(status=204)
