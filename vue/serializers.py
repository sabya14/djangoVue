from rest_framework import serializers
from vue.models import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id','upvotes','writer','plot')