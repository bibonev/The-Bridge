# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-16 11:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_remove_message_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='handle_type',
            field=models.TextField(default='user'),
            preserve_default=False,
        ),
    ]
