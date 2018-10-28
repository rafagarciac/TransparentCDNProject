from rest_framework import serializers
from book.models import Book
from user.serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response



class BookSerializer(serializers.ModelSerializer):
    lookup_field='user_borrowed'
    class Meta:
        model = Book
        fields = ('id', 'ISBNCode', 'title', 'author', 'user_borrowed')

    def create(self, validated_data):
        """
        Create and return a new `Book` instance, given the validated data.
        """
        # Verify repeat Book
        for book in Book.objects.all():
            if book.ISBNCode == validated_data['ISBNCode']:
                return Response(status=status.HTTP_400_BAD_REQUEST) 

        return Book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Book` instance, given the validated data.
        """
        instance.isbncode = validated_data.get('isbncode', instance.title)
        instance.title = validated_data.get('title', instance.code)
        instance.author = validated_data.get('author', instance.linenos)
        instance.save()
        return instance

class BookReadSerializer(BookSerializer):
    user_borrowed = UserSerializer(read_only=True)