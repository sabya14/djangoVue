from django.db import models

# Create your models here.
class Story(models.Model):
    upvotes=models.PositiveIntegerField()
    writer=models.CharField(max_length=20)
    plot=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)