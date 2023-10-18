from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from metadata.models import Tag, Prompt, Outcome
from prompt_templates.models import Template
from django.contrib.auth import get_user_model

User = get_user_model()


class TagAPITestCase(APITestCase):
    def setUp(self):
        self.tag1 = Tag.objects.create(name="Science")
        self.tag2 = Tag.objects.create(name="Math")
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")

    def test_get_all_tags(self):
        url = reverse("api_v0:metadata:tag-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            len(response.data), 2, f"Expected 2 tags, got {len(response.data)}"
        )

    def test_create_tag(self):
        url = reverse("api_v0:metadata:tag-list")
        data = {"name": "Physics"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected 201 Created, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            Tag.objects.count(),
            3,
            f"Expected tag count to be 3, got {Tag.objects.count()}",
        )
        self.assertEqual(
            Tag.objects.get(id=3).name,
            "Physics",
            "New tag not created correctly",
        )

    def test_get_single_tag(self):
        url = reverse("api_v0:metadata:tag-detail", args=[self.tag1.id])
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(response.data["name"], "Science", "Tag data mismatch")

    def test_update_tag(self):
        url = reverse("api_v0:metadata:tag-detail", args=[self.tag1.id])
        data = {"name": "Natural Science"}
        response = self.client.put(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.tag1.refresh_from_db()
        self.assertEqual(
            self.tag1.name, "Natural Science", "Tag not updated correctly"
        )

    def test_delete_tag(self):
        url = reverse("api_v0:metadata:tag-detail", args=[self.tag2.id])
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected 204 No Content, got {response.status_code} data: {response.data}",
        )
        with self.assertRaises(
            Tag.DoesNotExist, msg="Tag still exists after delete operation"
        ):
            Tag.objects.get(id=self.tag2.id)


class PromptAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")
        self.template = Template.objects.create(
            name="Example Template", user=self.user
        )
        self.assertTrue(
            isinstance(self.template, Template), "Template object not created."
        )
        self.prompt1 = Prompt.objects.create(
            template=self.template, filled_content={"key": "value1"}
        )
        self.prompt2 = Prompt.objects.create(
            template=self.template, filled_content={"key": "value2"}
        )

        self.assertTrue(
            isinstance(self.prompt1, Prompt), "Prompt 1 object not created."
        )
        self.assertTrue(
            isinstance(self.prompt2, Prompt), "Prompt 2 object not created."
        )

    def test_get_all_prompts(self):
        url = reverse("api_v0:metadata:prompt-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            len(response.data),
            2,
            f"Expected 2 prompts, got {len(response.data)}",
        )

    def test_create_prompt(self):
        url = reverse("api_v0:metadata:prompt-list")
        data = {
            "template": self.template.id,
            "filled_content": {"key": "new_value"},
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected 201 Created, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            Prompt.objects.count(),
            3,
            f"Expected prompt count to be 3, got {Prompt.objects.count()}",
        )

    def test_get_single_prompt(self):
        url = reverse("api_v0:metadata:prompt-detail", args=[self.prompt1.id])
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            response.data["template"], self.template.id, "Prompt data mismatch"
        )

    def test_delete_prompt(self):
        url = reverse("api_v0:metadata:prompt-detail", args=[self.prompt2.id])
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected 204 No Content, got {response.status_code} data: {response.data}",
        )
        with self.assertRaises(
            Prompt.DoesNotExist,
            msg="Prompt still exists after delete operation",
        ):
            Prompt.objects.get(id=self.prompt2.id)


class OutcomeAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")

        self.template = Template.objects.create(
            name="Example Template", user=self.user
        )
        self.prompt = Prompt.objects.create(
            template=self.template, filled_content={"key": "value"}
        )
        self.outcome1 = Outcome.objects.create(
            prompt=self.prompt, content="Outcome1", tool_used="Tool1"
        )
        self.outcome2 = Outcome.objects.create(
            prompt=self.prompt, content="Outcome2", tool_used="Tool2"
        )

    def test_get_all_outcomes(self):
        url = reverse("api_v0:metadata:outcome-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            len(response.data),
            2,
            f"Expected 2 outcomes, got {len(response.data)}",
        )

    def test_create_outcome(self):
        url = reverse("api_v0:metadata:outcome-list")
        data = {
            "prompt": self.prompt.id,
            "content": "Outcome3",
            "tool_used": "Tool3",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected 201 Created, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            Outcome.objects.count(),
            3,
            f"Expected outcome count to be 3, got {Outcome.objects.count()}",
        )

    def test_get_single_outcome(self):
        url = reverse(
            "api_v0:metadata:outcome-detail", args=[self.outcome1.id]
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected 200 OK, got {response.status_code} data: {response.data}",
        )
        self.assertEqual(
            response.data["content"], "Outcome1", "Outcome data mismatch"
        )

    def test_delete_outcome(self):
        url = reverse(
            "api_v0:metadata:outcome-detail", args=[self.outcome2.id]
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected 204 No Content, got {response.status_code} data: {response.data}",
        )
        with self.assertRaises(Outcome.DoesNotExist):
            Outcome.objects.get(id=self.outcome2.id)
