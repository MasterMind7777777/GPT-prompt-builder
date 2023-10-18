from rest_framework import serializers
from .models import OutcomeMetric, Ranking

class OutcomeMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutcomeMetric
        fields = '__all__'

class RankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = '__all__'
