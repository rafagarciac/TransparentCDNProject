from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.shortcuts import render, get_object_or_404, get_list_or_404
from user.models import User, Role
from user.serializers import UserSerializer, RoleSerializer

# Create your views here.

# User Views
@api_view(['GET', 'POST'])
def users_list(request):
    """
    List all code users, or create a new users.
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'DELETE'])
def users_detail(request, n_socio):
    """
    Retrieve, update or delete a code user.
    """

    user = User.objects.get_object_or_404(n_socio=n_socio)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    
    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)

@api_view(['POST'])
def user_login(request):
    """
    Login Post Request:
        @param: user
        @param: password 
    """
    if request.method == 'POST':
        try:
            user = User.objects.get(email=request.data['email'])
        except (User.DoesNotExist):
            return JsonResponse({"message": "The email doesn't exist."}, status=500, safe=False)    # status = 400 ?

        if request.data['password'] != user.password:
            return JsonResponse({"message": "Password incorret!"}, status=500, safe=False)
        
        serializer = UserSerializer(user, many=False)
        return JsonResponse(serializer.data, status=201, safe=False)

# Role Views
@api_view(['GET', 'POST'])
def roles_list(request):
    """
    List all code roles, or create a new roles.
    """
    if request.method == 'GET':
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RoleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'DELETE'])
def roles_detail(request, id):
    """
    Retrieve, update or delete a code role.
    """

    role = Role.objects.get_object_or_404(id=id)

    if request.method == 'GET':
        serializer = RoleSerializer(role)
        return JsonResponse(serializer.data)
    
    elif request.method == 'DELETE':
        role.delete()
        return HttpResponse(status=204)