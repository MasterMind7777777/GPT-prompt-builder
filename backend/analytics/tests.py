from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from metadata.models import Prompt, Outcome
from prompt_templates.models import Template, TemplatePart
from analytics.models import OutcomeMetric, Ranking


class OutcomeMetricAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")

        self.template = Template.objects.create(
            user=self.user,
            name="Example Template",
            visibility=Template.PRIVATE,
        )

        self.part = TemplatePart.objects.create(
            template=self.template,
            content="Part Content",
            order=1,
            type=TemplatePart.BODY,
        )

        self.prompt = Prompt.objects.create(
            template=self.template, filled_content={"key": "value"}
        )

        self.outcome = Outcome.objects.create(
            prompt=self.prompt,
            content="Outcome Content",
            tool_used="Tool Used",
        )

        self.metric1 = OutcomeMetric.objects.create(
            outcome=self.outcome, metric_type="Accuracy", value=0.9
        )

    def test_get_all_metrics(self):
        url = reverse("api_v0:analytics:outcomemetric-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            len(response.data),
            1,
            f"Expected 1 metric, got {len(response.data)}",
        )

    def test_create_metric(self):
        url = reverse("api_v0:analytics:outcomemetric-list")
        data = {
            "outcome": self.outcome.id,
            "metric_type": "Precision",
            "value": 0.85,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected 201 Created, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            OutcomeMetric.objects.count(),
            2,
            f"Expected metric count to be 2, got {OutcomeMetric.objects.count()}",
        )

    def test_get_single_metric(self):
        url = reverse(
            "api_v0:analytics:outcomemetric-detail", args=[self.metric1.id]
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            response.data["metric_type"], "Accuracy", "Metric data mismatch"
        )

    def test_delete_metric(self):
        url = reverse(
            "api_v0:analytics:outcomemetric-detail", args=[self.metric1.id]
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected 204 No Content, got {response.status_code} data: {response.data}",
        )
        with self.assertRaises(
            OutcomeMetric.DoesNotExist,
            msg="OutcomeMetric still exists after delete operation",
        ):
            OutcomeMetric.objects.get(id=self.metric1.id)


class RankingAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")

        self.template = Template.objects.create(
            user=self.user, name="Sample Template", visibility=Template.PRIVATE
        )

        self.part = TemplatePart.objects.create(
            template=self.template,
            content="Part Content",
            order=1,
            type=TemplatePart.BODY,
        )

        self.ranking1 = Ranking.objects.create(
            template=self.template,
            user=self.user,
            score=5,
            comments="Great template!",
        )

    def test_get_all_rankings(self):
        url = reverse("api_v0:analytics:ranking-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            len(response.data),
            1,
            f"Expected 1 ranking, got {len(response.data)}",
        )

    def test_create_ranking(self):
        url = reverse("api_v0:analytics:ranking-list")
        data = {
            "template": self.template.id,
            "user": self.user.id,
            "score": 4,
            "comments": "Good template!",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected 201 Created, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            Ranking.objects.count(),
            2,
            f"Expected ranking count to be 2, got {Ranking.objects.count()}",
        )

    def test_get_single_ranking(self):
        url = reverse(
            "api_v0:analytics:ranking-detail", args=[self.ranking1.id]
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(response.data["score"], 5, "Ranking score mismatch")

    def test_delete_ranking(self):
        url = reverse(
            "api_v0:analytics:ranking-detail", args=[self.ranking1.id]
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected 204 No Content, got {response.status_code} data: {response.data}",
        )
        with self.assertRaises(
            Ranking.DoesNotExist,
            msg="Ranking still exists after delete operation",
        ):
            Ranking.objects.get(id=self.ranking1.id)
