from django.db import models
# Create your models here.

class Item(models.Model):
    subject=models.CharField(max_length=50)
    content=models.CharField(max_length=200)
    schedule_time=models.DateTimeField()
    status=models.BooleanField()