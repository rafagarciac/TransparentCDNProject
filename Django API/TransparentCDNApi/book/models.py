from django.db import models

# Create your models here.
class Book(models.Model):
    ISBNCode = models.CharField(max_length=17, blank=True, default='')
    title = models.CharField(max_length=200, blank=True, default='')
    author = models.CharField(max_length=100, blank=True, default='Unknow')

    def __str__(self):
        return 'ISBNCOde: {0}, title: {1}, author: {2}'.format(self.ISBNCode, self.title, self.author)        