# Generated by Django 4.2.6 on 2023-10-18 15:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("prompt_templates", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Outcome",
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
                ("generated_at", models.DateTimeField(auto_now_add=True)),
                ("tool_used", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
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
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "outcomes",
                    models.ManyToManyField(blank=True, to="metadata.outcome"),
                ),
                (
                    "template_parts",
                    models.ManyToManyField(
                        blank=True, to="prompt_templates.templatepart"
                    ),
                ),
                (
                    "templates",
                    models.ManyToManyField(
                        blank=True, to="prompt_templates.template"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Prompt",
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
                ("filled_content", models.JSONField()),
                ("date_generated", models.DateTimeField(auto_now_add=True)),
                (
                    "template",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="prompt_templates.template",
                    ),
                ),
            ],
            options={
                "ordering": ["-date_generated"],
            },
        ),
        migrations.AddField(
            model_name="outcome",
            name="prompt",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="metadata.prompt",
            ),
        ),
    ]
