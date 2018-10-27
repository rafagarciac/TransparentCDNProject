from rest_framework import serializers
from book.models import Book
from user.serializers import UserSerializer

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ISBNCode = serializers.CharField(required=True, max_length=17, trim_whitespace = True, allow_null=False)
    title = serializers.CharField(required=True, max_length=200, trim_whitespace = False, allow_null=False)
    author = serializers.CharField(required=False, max_length=100, trim_whitespace = False, allow_null=True)
    user_borrowed = UserSerializer(read_only=True, required=False)

    def create(self, validated_data):
        """
        Create and return a new `Book` instance, given the validated data.
        """
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

class BookBorrowedSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ISBNCode = serializers.CharField(required=True, max_length=17, trim_whitespace = True, allow_null=False)
    title = serializers.CharField(required=True, max_length=200, trim_whitespace = False, allow_null=False)
    author = serializers.CharField(required=False, max_length=100, trim_whitespace = False, allow_null=True)
    user_borrowed = UserSerializer()