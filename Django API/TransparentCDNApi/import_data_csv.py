#!/usr/bin/env python

"""
    Script to import book data from .csv file to Model Database DJango
    To execute this script run: 
                                1) manage.py shell
                                2) exec(open('import_data_csv.py').read())
"""

__author__ = "Rafael García Cuéllar"
__email__ = "r.gc@hotmail.es"
__copyright__ = "Copyright (c) 2018 Rafael García Cuéllar"
__license__ = "MIT"

import csv
from book.models import Book

CSV_PATH = '../../libros.csv'

contSuccess = 0
# Remove all data from Table
Book.objects.all().delete()

with open(CSV_PATH, newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';', quotechar=';')
    print('Loading...')
    for row in spamreader:
        Book.objects.create(ISBNCode=row[0], title=row[1], author=row[2])
        contSuccess += 1
    print(f'{str(contSuccess)} inserted successfully! ')