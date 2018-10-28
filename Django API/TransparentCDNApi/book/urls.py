from django.urls import path
from book import views

urlpatterns = [
    path('borrowed/', views.books_borrowed),
    path('', views.books_list),
    path('<int:id>/', views.books_detail),
]