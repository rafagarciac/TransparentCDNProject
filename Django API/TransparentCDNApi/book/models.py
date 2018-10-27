from django.db import models
from user.models import User

# Create your models here.
class Book(models.Model):
    ISBNCode = models.CharField(max_length=17, blank=True, default='')
    title = models.CharField(max_length=200, blank=True, default='')
    author = models.CharField(max_length=100, blank=True, default='Unknow')
    user_borrowed = models.ForeignKey('user.User', on_delete=models.CASCADE, default=0)

    def __str__(self):
        return 'ISBNCode: {0}, title: {1}, author: {2}, user_borrowed-email: {3}'.format(self.ISBNCode, self.title, self.author, User.objects.get(id=self.user_borrowed).email)        