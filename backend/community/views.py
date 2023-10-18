from rest_framework import viewsets
from rest_framework import permissions
from .models import CommunityShare, CommentFeedback
from .serializers import CommunityShareSerializer, CommentFeedbackSerializer

class CommunityShareViewSet(viewsets.ModelViewSet):
    queryset = CommunityShare.objects.all()
    serializer_class = CommunityShareSerializer
    permission_classes = [permissions.IsAuthenticated]

class CommentFeedbackViewSet(viewsets.ModelViewSet):
    queryset = CommentFeedback.objects.all()
    serializer_class = CommentFeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

