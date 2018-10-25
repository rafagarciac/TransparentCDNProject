from django.urls import path
from book import views

urlpatterns = [
    path('books/', views.books_list),
    path('books/<int:id>/', views.books_detail),
]