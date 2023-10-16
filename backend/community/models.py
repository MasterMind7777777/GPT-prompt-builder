from django.db import models
from django.conf import settings
from prompt_templates.models import Template, TemplatePart
from django.contrib.auth import get_user_model

User = get_user_model()


class CommunityShare(models.Model):
    """
    Facilitates the sharing of templates or parts between users.
    """

    template = models.ForeignKey(
        Template, on_delete=models.CASCADE, null=True, blank=True
    )
    part = models.ForeignKey(
        TemplatePart, on_delete=models.CASCADE, null=True, blank=True
    )
    shared_by_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="shared_by",
    )
    shared_with_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="shared_with",
    )
    date_shared = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shared by User: {self.shared_by_user.id}, With User: {self.shared_with_user.id}"


class CommentFeedback(models.Model):
    """
    Stores comments or feedback from users related to templates or template parts.
    """

    template = models.ForeignKey(
        Template, on_delete=models.CASCADE, null=True, blank=True
    )
    part = models.ForeignKey(
        TemplatePart, on_delete=models.CASCADE, null=True, blank=True
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    content = models.TextField()
    parent_comment = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, blank=True
    )
    date_commented = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by User: {self.user.id}, Date: {self.date_commented}"
