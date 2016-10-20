from datetime import datetime 
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from reversion.models import Version
from organisation import models as organisation_models

class Post(models.Model):
    '''Post configurations'''
    description = models.TextField()
    organisation = models.ForeignKey(organisation_models.Organisation)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.description

    # call this method on creating post when editing organsiation
    def post_on_change_field(field, organisation):
        org_versions = Version.objects.get_for_object(organisation)

        if len(org_versions) > 1:
            v0 = org_versions[0].field_dict[field]
            v1 = org_versions[1].field_dict[field]
            if v0 != v1:
                desc = organisation.title + " changed its " + field + " from " + v1 + " to " + v0
                return Post.objects.create(description=desc, organisation=organisation)

    # create posts when organisations' category or locations are being changed
    def create_post_org_change(organisation):
        Post.post_on_change_field('category', organisation)
        Post.post_on_change_field('locations', organisation)

    class Meta:
        # order posts by time of creation: on bottom is the oldest
        ordering = ['-timestamp']

class CommentManager(models.Manager):
    '''Set a custom Comment model manager'''
    # gets all objects
    def all(self):
        qs = super(CommentManager, self).all()
        return qs

    # filters object by instance
    def filter_by_instance(self, instance):
        qs = super(CommentManager, self).filter(post=instance)
        return qs

    # create new comment both from user or organisation
    def create_by_model_type(self, model_type, organisation_id, text, post_obj, request):
        model_qs = ContentType.objects.filter(model=model_type) # filter to check if the a particular model exists
        if model_qs.exists():
            SomeModel = model_qs.first().model_class() # finds the current model (User or Organisation)
            # checks if the model is User, then gets the current instance
            if SomeModel == User:
                obj_qs = request.user
                c_t = ContentType.objects.get(model=ContentType.objects.get_for_model(obj_qs.__class__))
                o_i = obj_qs.id
            # checks if the model is Organisation, then gets the current instance
            elif SomeModel == organisation_models.Organisation and organisation_id:
                obj_qs = organisation_models.Organisation.objects.filter(id=organisation_id, host=request.user)
                c_t = model_qs.first()
                o_i = obj_qs.first().id
            # if comment is made by the current user or user's organisation create it(save)
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
    '''Comment configurations'''
    post = models.ForeignKey(Post)
    text = models.TextField()
    timestamp = models.DateTimeField(default=datetime.now)

    # use ContentType in order to be able to create comment from two or more roles (User and Organisation)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    # use the custom CommentManager
    objects = CommentManager()

    def __str__(self):
        return self.text
    
    class Meta:
        # order posts by time of creation: on bottom is the newest
        ordering = ['timestamp']
    

