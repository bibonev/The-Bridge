from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers
from developer import models as developer_models
from posts import models as posts_models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
        )
        model = User

class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'title',
            'description',
            'category',
            'locations',
            'phone_number',
            'email_organisation',
            'website',
            'front_picture',
            'cover_picture',
            'host',
        )
        model = developer_models.Organisation

class PostListSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    organisation = serializers.SerializerMethodField('which_organisation')

    def which_organisation(self, obj):
        org_obj = developer_models.Organisation.objects.get(pk=obj.organisation.pk)
        organisation = OrganisationSerializer(org_obj, many=False).data
        return organisation
        
    def get_comments(self, obj):
        c_qs = posts_models.Comment.objects.filter_by_instance(obj)
        comments = CommentListSerializer(c_qs, many=True).data
        return comments

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'description',
            'organisation',
            'comments',
        )
        model = posts_models.Post

def create_post_serializer(organisation_id=None, request=None):
    class PostCreateSerializer(serializers.ModelSerializer):
        class Meta:
            # add the fields to the api serializer
            fields = (
                'id',
                'description',
            )
            model = posts_models.Post
        
        def __init__(self, *args, **kwargs):
            self.organisation_object = None
            self.organisation_qs = None
            if organisation_id:
                self.organisation_qs = developer_models.Organisation.objects.filter(id=organisation_id, host=request.user)

            return super(PostCreateSerializer, self).__init__(*args, **kwargs)

        def validate(self, data):
            if self.organisation_qs.exists() and self.organisation_qs.count() == 1:
                self.organisation_object = self.organisation_qs.first()
            else:
                raise ValidationError("Unable to create post for organisation that is not owned by the current user")

            return data
            
        def create(self, validated_data):
            description = validated_data.get('description')
            organisation_object = self.organisation_object
            post = posts_models.Post.objects.create(description=description, organisation=organisation_object)

            return post


    return PostCreateSerializer

def create_comment_serializer(model_type='user', organisation_id=None, post_id=None, request=None):
    class CommentCreateSerializer(serializers.ModelSerializer):
        class Meta:
            # add the fields to the api serializer
            fields = (
                'id',
                'text',
            )
            model = posts_models.Comment

        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.post_obj = None
            self.post_qs = None
            if post_id:
                self.post_qs = posts_models.Post.objects.filter(id=post_id)

            return super(CommentCreateSerializer, self).__init__(*args, **kwargs)

        def validate(self, data):
            model_type = self.model_type
            model_qs = ContentType.objects.filter(model=model_type)

            if self.post_qs.exists() and self.post_qs.count() == 1:
                self.post_obj = self.post_qs.first()
            else: 
                raise ValidationError("Unable to create comment for non existing post")
            if not model_qs.exists() or model_qs.count() !=1:
                raise ValidationError("This is not a valid content type")

            SomeModel = model_qs.first().model_class()
            if not SomeModel == User and not SomeModel == developer_models.Organisation:
                raise ValidationError("Unable to create comment that is not user or organisation")

            if SomeModel == developer_models.Organisation:
                obj_qs = developer_models.Organisation.objects.filter(id=organisation_id, host=request.user)
                if not obj_qs.exists() or obj_qs.count() != 1:
                    raise ValidationError("This is not an id for this organisation")

            return data

        def create(self, validated_data):
            text = validated_data.get("text")
            model_type = self.model_type
            post_obj = self.post_obj

            comment = posts_models.Comment.objects.create_by_model_type(
                model_type=model_type,
                organisation_id=organisation_id,
                text=text,
                post_obj = post_obj,
                request=request
            )
            return comment

    return CommentCreateSerializer
                
class CommentListSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField('which_author')

    def which_author(self, comment):
        content_object = comment.content_object
        if content_object.__class__ == User:
            user_pic = ""
            if content_object.profile.user_picture:
                user_pic = content_object.profile.user_picture.url
            else:
                user_pic = content_object.profile.default_image
            return {
                'id':content_object.pk,
                'first_name':content_object.first_name,
                'last_name':content_object.last_name,
                'email':content_object.email,
            }
        elif content_object.__class__ == developer_models.Organisation:
            return {
                'id':content_object.pk,
                'title':content_object.title,
                'description':content_object.description,
                'locations':content_object.locations,
                'category':content_object.category,
                'phone_number':content_object.phone_number,
                'email_organisation':content_object.email_organisation,
                'website':content_object.website,
            }

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'post',
            'text',
            'content_type',
            'object_id',
            'author'
        )
        model = posts_models.Comment