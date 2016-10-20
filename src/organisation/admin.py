from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Organisation)
admin.site.register(models.Review)