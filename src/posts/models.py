from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from reversion.models import Version
from developer import models as developer_models

class Post(models.Model):
    description = models.TextField()
    organisation = models.ForeignKey(developer_models.Organisation)

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

class CommentManager(models.Manager):
    def all(self):
        qs = super(CommentManager, self).filter(post=None)
        return qs
        
    def filter_by_instance(self, instance):
        qs = super(CommentManager, self).filter(post=instance)
        return qs

class Comment(models.Model):
    post = models.ForeignKey(Post)
    text = models.TextField()

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    objects = CommentManager()

    def __str__(self):
        return self.text
    

