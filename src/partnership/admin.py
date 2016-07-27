from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Relation)
admin.site.register(models.PendingRequest)
