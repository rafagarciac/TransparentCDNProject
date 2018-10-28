from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.shortcuts import render, get_object_or_404, get_list_or_404
import datetime


from book.models import Book
from book.models import User
from book.serializers import BookSerializer, BookReadSerializer

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

@api_view(['GET', 'POST'])
def books_borrowed(request):
    if request.method == 'GET':
        borrowedbooks = Book.objects.all().filter(user_borrowed__isnull=False)
        serializer = BookReadSerializer(borrowedbooks, many=True)
        return JsonResponse(serializer.data, safe=False)

    # Borrow books from the Catalog
    elif request.method == 'POST': 
        bookId = request.data['bookid']
        n_socio = request.data['n_socio']
        try:
            book = Book.objects.get(id=bookId)
            user = User.objects.all().get(n_socio=n_socio)
        except (Book.DoesNotExist):
            return HttpResponse(status=404)    # status = 400 ?

        book.user_borrowed = user 
        book.borrow_date = datetime.datetime.now()
        book.save()

        serializer = BookSerializer(book, many=False)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def books_notborrowed(request):
    if request.method == 'GET':
        notborrowedbooks = Book.objects.all().filter(user_borrowed__isnull=True)
        serializer = BookSerializer(notborrowedbooks, many=True)
        return JsonResponse(serializer.data, safe=False)

    # Unborrowed books in the Catalog
    elif request.method == 'POST': 
        bookId = request.data['bookid']
        try:
            book = Book.objects.get(id=bookId)
        except (Book.DoesNotExist):
            return HttpResponse(status=404)    # status = 400 ?

        book.user_borrowed = None
        book.borrow_date = None
        book.save()

        serializer = BookSerializer(book, many=False)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def books_morosos(request):
    if request.method == 'GET':

        LIMIT_DAYS_TO_MOROSO = 15
        limit_date = datetime.datetime.now() - datetime.timedelta(days=LIMIT_DAYS_TO_MOROSO)
        morososbooks = Book.objects.all().filter(borrow_date__lte=limit_date)

        serializer = BookReadSerializer(morososbooks, many=True)
        return JsonResponse(serializer.data, safe=False)
