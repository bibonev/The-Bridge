from datetime import datetime 
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from reversion.models import Version
from developer import models as developer_models

class Post(models.Model):
    description = models.TextField()
    organisation = models.ForeignKey(developer_models.Organisation)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.description

    def post_on_change_field(field, organisation):
        org_versions = Version.objects.get_for_object(organisation)

        if len(versions) > 1:
            v0 = org_versions[0].field_dict[field]
            v1 = org_versions[1].field_dict[field]
            if v0 != v1:
                desc = organisation.title + " changed its " + field + " from " + v1 + " to " + v0
                return Post.objects.create(description=desc, organisation=organisation)

    def create_post_org_change(organisation):
        post_on_change_field('category', organisation)
        post_on_change_field('locations', organisation)

    class Meta:
        ordering = ['-timestamp']

class CommentManager(models.Manager):
    def all(self):
        qs = super(CommentManager, self).all()
        return qs

    def filter_by_instance(self, instance):
        qs = super(CommentManager, self).filter(post=instance)
        return qs

    def create_by_model_type(self, model_type, organisation_id, text, post_obj, request):
        model_qs = ContentType.objects.filter(model=model_type)
        if model_qs.exists():
            SomeModel = model_qs.first().model_class()
            if SomeModel == User:
                obj_qs = request.user
                c_t = ContentType.objects.get(model=ContentType.objects.get_for_model(obj_qs.__class__))
                o_i = obj_qs.id
            elif SomeModel == developer_models.Organisation and organisation_id:
                obj_qs = developer_models.Organisation.objects.filter(id=organisation_id, host=request.user)
                c_t = model_qs.first()
                o_i = obj_qs.first().id
            if obj_qs == request.user or (obj_qs.exists() and obj_qs.count() == 1):
                instance = self.model()
                instance.text = text
                instance.post = post_obj
                instance.content_type = c_t
                instance.object_id = o_i
                instance.save()
                return instance 

        return None

class Comment(models.Model):
    post = models.ForeignKey(Post)
    text = models.TextField()
    timestamp = models.DateTimeField(default=datetime.now)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    objects = CommentManager()

    def __str__(self):
        return self.text
    
    class Meta:
        ordering = ['timestamp']
    

