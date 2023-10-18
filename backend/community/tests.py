from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from community.models import CommunityShare, CommentFeedback
from prompt_templates.models import Template, TemplatePart

User = get_user_model()


class CommunityShareAPITestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            username="user1", password="pass"
        )
        self.user2 = User.objects.create_user(
            username="user2", password="pass"
        )
        self.template = Template.objects.create(
            user=self.user1, name="template1"
        )
        self.part = TemplatePart.objects.create(
            template=self.template,
            content="part1",
            order=1,
            type=TemplatePart.BODY,
        )
        self.community_share = CommunityShare.objects.create(
            shared_by_user=self.user1,
            shared_with_user=self.user2,
            template=self.template,
        )

        self.client.login(username="user1", password="pass")  # Login as user1

    def test_list_community_shares(self):
        url = reverse("api_v0:community:communityshare-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data),
            1,
            "Incorrect number of community shares returned.",
        )

    def test_create_community_share(self):
        url = reverse("api_v0:community:communityshare-list")
        data = {
            "shared_by_user": self.user1.id,
            "shared_with_user": self.user2.id,
            "template": self.template.id,
        }
        response = self.client.post(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"CommunityShare could not be created. Details: {response.data}",
        )

    def test_retrieve_community_share(self):
        url = reverse(
            "api_v0:community:communityshare-detail",
            kwargs={"pk": self.community_share.pk},
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["id"],
            self.community_share.pk,
            "Retrieved community share does not match.",
        )

    def test_delete_community_share(self):
        url = reverse(
            "api_v0:community:communityshare-detail",
            kwargs={"pk": self.community_share.pk},
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"CommunityShare could not be deleted. Details: {response.data}",
        )

        # Check if object was actually deleted
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            "CommunityShare was not deleted.",
        )


class CommentFeedbackAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user", password="pass")
        self.template = Template.objects.create(
            user=self.user, name="template1"
        )
        self.part = TemplatePart.objects.create(
            template=self.template,
            content="part1",
            order=1,
            type=TemplatePart.BODY,
        )
        self.comment_feedback = CommentFeedback.objects.create(
            user=self.user,
            content="feedback1",
            template=self.template,
        )

        self.client.login(username="user", password="pass")

    def test_list_comment_feedbacks(self):
        url = reverse("api_v0:community:commentfeedback-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data),
            1,
            f"Incorrect number of comment feedbacks returned. Details: {response.data}",
        )

    def test_create_comment_feedback(self):
        url = reverse("api_v0:community:commentfeedback-list")
        data = {
            "user": self.user.id,
            "content": "feedback2",
            "template": self.template.id,
        }
        response = self.client.post(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"CommentFeedback could not be created. Details: {response.data}",
        )

    def test_retrieve_comment_feedback(self):
        url = reverse(
            "api_v0:community:commentfeedback-detail",
            kwargs={"pk": self.comment_feedback.pk},
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["id"],
            self.comment_feedback.pk,
            f"Retrieved comment feedback does not match. Details: {response.data}",
        )

    def test_delete_comment_feedback(self):
        url = reverse(
            "api_v0:community:commentfeedback-detail",
            kwargs={"pk": self.comment_feedback.pk},
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"CommentFeedback could not be deleted. Details: {response.data}",
        )

        # Check if object was actually deleted
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            f"CommentFeedback was not deleted. Details: {response.data}",
        )
