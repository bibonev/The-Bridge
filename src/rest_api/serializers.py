from django.core.exceptions import ValidationError
from rest_framework import serializers
from developer import models as developer_models
from posts import models as posts_models

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
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'description',
            'organisation',
            'comments',
        )
        model = posts_models.Post
    
    def get_comments(self, obj):
        c_qs = posts_models.Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments

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
                raise ValidationError("Unable to create post for organisation that is not owned by the current user!")

            return data
            
        def create(self, validated_data):
            description = validated_data.get('description')
            organisation_object = self.organisation_object
            post = posts_models.Post.objects.create(description=description, organisation=organisation_object)

            return post


    return PostCreateSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'post',
            'text',
            'content_type',
            'object_id',
        )
        model = posts_models.Comment

def create_comment_serializer(model_type='user', post=None):
    pass

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'post',
            'text',
            'content_type',
            'object_id',
        )
        model = posts_models.Comment