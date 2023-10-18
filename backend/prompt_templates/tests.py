from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Template, TemplatePart
from django.contrib.auth import get_user_model

User = get_user_model()


class TemplateTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")
        self.template1 = Template.objects.create(
            name="Test Template 1", visibility=Template.PRIVATE, user=self.user
        )
        self.template2 = Template.objects.create(
            name="Test Template 2", visibility=Template.PRIVATE, user=self.user
        )
        self.url = reverse("api_v0:prompt_templates:template-list")

    def test_create_template(self):
        data = {
            "name": "New Template",
            "visibility": Template.PRIVATE,
            "user": self.user.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Template.objects.count(), 3)

    def test_list_templates(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_template(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-detail", args=[self.template1.id]
        )
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test Template 1")

    def test_update_template(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-detail", args=[self.template1.id]
        )
        data = {
            "name": "Updated Template",
            "user": self.user.id,  # include user ID
        }
        response = self.client.put(detail_url, data, format="json")
        if response.status_code != status.HTTP_200_OK:
            print(
                "Response data:", response.data
            )  # Display server's response data
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Failed to update template, got {response.data}",
        )
        self.template1.refresh_from_db()
        self.assertEqual(self.template1.name, "Updated Template")

    def test_delete_template(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-detail", args=[self.template1.id]
        )
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Template.objects.count(), 1)


class TemplatePartTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client.login(username="testuser", password="testpass")
        self.template = Template.objects.create(
            name="Test Template", visibility=Template.PRIVATE, user=self.user
        )
        self.template_part1 = TemplatePart.objects.create(
            template=self.template,
            content="Test Content 1",
            order=1,
            type=TemplatePart.BODY,
        )
        self.template_part2 = TemplatePart.objects.create(
            template=self.template,
            content="Test Content 2",
            order=2,
            type=TemplatePart.BODY,
        )
        self.url = reverse("api_v0:prompt_templates:template-part-list")

    def test_create_template_part(self):
        data = {
            "template": self.template.id,
            "content": "New Content",
            "order": 1,  # Add the missing 'order' field here
        }
        response = self.client.post(self.url, data, format="json")

        if response.status_code != status.HTTP_201_CREATED:
            print(
                f"Failed to create template part, server returned: {response.data}"
            )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected status code 201, but got {response.status_code}. Data: {response.data}",
        )

        created_count = TemplatePart.objects.count()
        if created_count != 3:
            print(
                f"Expected 3 TemplateParts to be present, but found {created_count}"
            )

        self.assertEqual(
            created_count,
            3,
            f"Expected 3 TemplateParts, but got {created_count}",
        )

    def test_list_template_parts(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_template_part(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-part-detail",
            args=[self.template_part1.id],
        )
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["content"], "Test Content 1")

    def test_update_template_part(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-part-detail",
            args=[self.template_part1.id],
        )
        data = {
            "content": "Updated Content",
            "order": self.template_part1.order,  # Include the 'order' field
            "template": self.template.id,  # Include the 'template' field
        }
        response = self.client.put(detail_url, data, format="json")

        if response.status_code != status.HTTP_200_OK:
            print(
                f"Failed to update template part, server returned: {response.data}"
            )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected status code 200, but got {response.status_code}. Data: {response.data}",
        )

        self.template_part1.refresh_from_db()

        if self.template_part1.content != "Updated Content":
            print(
                f"Failed to update content, expected 'Updated Content' but got {self.template_part1.content}"
            )

        self.assertEqual(
            self.template_part1.content,
            "Updated Content",
            f"Expected 'Updated Content' but got {self.template_part1.content}",
        )

    def test_delete_template_part(self):
        detail_url = reverse(
            "api_v0:prompt_templates:template-part-detail",
            args=[self.template_part1.id],
        )
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TemplatePart.objects.count(), 1)
