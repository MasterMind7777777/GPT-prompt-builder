from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Template(models.Model):
    """Represents a prompt template with meta-information."""

    PRIVATE = "Private"
    PUBLIC = "Public"
    SHARED = "Shared"

    VISIBILITY_CHOICES = [
        (PRIVATE, "Private"),
        (PUBLIC, "Public"),
        (SHARED, "Shared"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    visibility = models.CharField(
        max_length=7, choices=VISIBILITY_CHOICES, default=PRIVATE
    )
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class TemplatePart(models.Model):
    """Represents a segment of a prompt template."""

    TITLE = "Title"
    BODY = "Body"
    FOOTER = "Footer"

    TYPE_CHOICES = [
        (TITLE, "Title"),
        (BODY, "Body"),
        (FOOTER, "Footer"),
        # Add more types as needed
    ]

    template = models.ForeignKey(
        Template, related_name="parts", on_delete=models.CASCADE
    )
    content = models.TextField()
    order = models.PositiveIntegerField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default=BODY)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.type} - {self.template.name}"
