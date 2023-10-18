from django.db import models
from prompt_templates.models import Template, TemplatePart
from metadata.models import Outcome
from django.contrib.auth import get_user_model

User = get_user_model()


class OutcomeMetric(models.Model):
    """
    Stores performance metrics associated with either an outcome, template, or template part.
    """

    outcome = models.ForeignKey(
        Outcome, on_delete=models.CASCADE, null=True, blank=True
    )
    template = models.ForeignKey(
        Template, on_delete=models.CASCADE, null=True, blank=True
    )
    part = models.ForeignKey(
        TemplatePart, on_delete=models.CASCADE, null=True, blank=True
    )
    metric_type = models.CharField(max_length=255)
    value = models.FloatField()

    def __str__(self):
        return f"Metric: {self.metric_type}, Value: {self.value}"


class Ranking(models.Model):
    """
    Allows users to rank and review templates or template parts.
    """

    template = models.ForeignKey(
        Template, on_delete=models.CASCADE, null=True, blank=True
    )
    part = models.ForeignKey(
        TemplatePart, on_delete=models.CASCADE, null=True, blank=True
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    comments = models.TextField(null=True, blank=True)
    ranked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ranking by User: {self.user.id}, Score: {self.score}"
