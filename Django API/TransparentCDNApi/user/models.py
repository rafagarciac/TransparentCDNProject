from django.db import models

# Create your models here.

# Add role class Admin // No Admin -> 1 | 0 ?
class Role(models.Model):
    DEFAULT_PERMISION = 1
    PERMISSIONS = (
        ('ADMIN', 'Administrator'),
        ('NORMAL', 'Normal User')
    )
    permision = models.CharField(max_length=10, choices=PERMISSIONS, default='NORMAL') 

class User(models.Model):
    n_socio = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=254, blank=True, default='')    # A CharField that checks that the value is a valid email address using EmailValidator.
    password = models.CharField(max_length=50)                           # DJango doesn't provide PasswordField... Should provides ? ... ;)
    user_permision = models.ForeignKey('Role', on_delete=models.CASCADE, default=Role.DEFAULT_PERMISION)

    def __str__(self):
        return 'Numero de Socio: {0}, email: {1}, password: {2}, permision: {3}'.format(str(self.n_socio), self.email, self.password, self.user_permision)        