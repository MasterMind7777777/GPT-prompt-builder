# Generated by Django 4.2.6 on 2023-11-18 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("prompt_templates", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="templatepart",
            name="template",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="parts",
                to="prompt_templates.template",
            ),
        ),
    ]
