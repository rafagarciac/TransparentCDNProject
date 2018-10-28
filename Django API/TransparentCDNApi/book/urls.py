from django.urls import path, re_path
from django.conf.urls import url
from book import views

urlpatterns = [
    path('borrowed', views.books_borrowed),
    path('notborrowed', views.books_notborrowed),
    path('morosos', views.books_morosos),   
    path('', views.books_list),
    path('<int:id>', views.books_detail),
]