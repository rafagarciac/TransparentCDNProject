# Generated by Django 2.1.1 on 2018-10-25 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('n_socio', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(blank=True, default='', max_length=254)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
    ]
