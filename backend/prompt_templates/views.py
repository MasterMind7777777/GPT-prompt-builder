from rest_framework import viewsets
from .models import Template, TemplatePart
from .serializers import TemplateSerializer, TemplatePartSerializer

class TemplateViewSet(viewsets.ModelViewSet):
    serializer_class = TemplateSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        visibility = self.request.query_params.get('visibility', None)
        queryset = Template.objects.all()

        if user:
            queryset = queryset.filter(user__username=user)
        if visibility:
            queryset = queryset.filter(visibility=visibility)

        return queryset

class TemplatePartViewSet(viewsets.ModelViewSet):
    queryset = TemplatePart.objects.all()
    serializer_class = TemplatePartSerializer

