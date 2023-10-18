from rest_framework import viewsets
from rest_framework import permissions
from .models import OutcomeMetric, Ranking
from .serializers import OutcomeMetricSerializer, RankingSerializer

class OutcomeMetricViewSet(viewsets.ModelViewSet):
    queryset = OutcomeMetric.objects.all()
    serializer_class = OutcomeMetricSerializer
    permission_classes = [permissions.IsAuthenticated]

class RankingViewSet(viewsets.ModelViewSet):
    queryset = Ranking.objects.all()
    serializer_class = RankingSerializer
    permission_classes = [permissions.IsAuthenticated]
