# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-22 22:06
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('developer', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='_unused_organisation_relation', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='organisations', to='developer.Organisation')),
            ],
            options={
                'verbose_name_plural': 'Friends',
                'verbose_name': 'Friend',
            },
        ),
        migrations.CreateModel(
            name='FriendshipRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(blank=True, verbose_name='Message')),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('rejected', models.DateTimeField(blank=True, null=True)),
                ('viewed', models.DateTimeField(blank=True, null=True)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='organisation_requests_sent', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='organisation_requests_received', to='developer.Organisation')),
            ],
            options={
                'verbose_name_plural': 'Friendship Requests',
                'verbose_name': 'Friendship Request',
            },
        ),
        migrations.AlterUniqueTogether(
            name='friendshiprequest',
            unique_together=set([('from_user', 'to_user')]),
        ),
        migrations.AlterUniqueTogether(
            name='friend',
            unique_together=set([('from_user', 'to_user')]),
        ),
    ]