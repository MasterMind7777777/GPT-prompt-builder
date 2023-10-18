from rest_framework import serializers
from .models import Template, TemplatePart

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'

class TemplatePartSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplatePart
        fields = '__all__'

