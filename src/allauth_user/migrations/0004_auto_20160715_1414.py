# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-15 14:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('allauth_user', '0003_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
