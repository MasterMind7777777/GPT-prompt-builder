from rest_framework import serializers
from .models import CommunityShare, CommentFeedback

class CommunityShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityShare
        fields = '__all__'

class CommentFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentFeedback
        fields = '__all__'
