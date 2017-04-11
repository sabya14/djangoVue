from django.shortcuts import render
from rest_framework import generics
from vue.models import Story
from vue.serializers import StorySerializer


class StoryList(generics.ListCreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer


class StoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
