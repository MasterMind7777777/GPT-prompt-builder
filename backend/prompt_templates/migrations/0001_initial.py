# Generated by Django 4.2.6 on 2023-10-18 15:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Template",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                (
                    "visibility",
                    models.CharField(
                        choices=[
                            ("Private", "Private"),
                            ("Public", "Public"),
                            ("Shared", "Shared"),
                        ],
                        default="Private",
                        max_length=7,
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="TemplatePart",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content", models.TextField()),
                ("order", models.PositiveIntegerField()),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Title", "Title"),
                            ("Body", "Body"),
                            ("Footer", "Footer"),
                        ],
                        default="Body",
                        max_length=10,
                    ),
                ),
                (
                    "template",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="parts",
                        to="prompt_templates.template",
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
            },
        ),
    ]