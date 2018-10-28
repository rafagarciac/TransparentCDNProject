from django.urls import path
from user import views

urlpatterns = [
    # User urls
    path('users/', views.users_list),
    path('users/<int:n_socio>/', views.users_detail),
    path('login/', views.user_login),
    # Role urls
    path('roles/', views.roles_list),
    path('roles/<int:id>/', views.roles_detail),
]