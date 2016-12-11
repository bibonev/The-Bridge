from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers
from organisation import models as organisation_models
from posts import models as posts_models
from partnership import models as partnership_models
from chat import models as chat_models

class UserSerializer(serializers.ModelSerializer):
    '''Serialize User's  model'''
    # customize user's front_picture field
    front_picture = serializers.SerializerMethodField('front_picture_url')

    # return the front_picture url or the defaul_image method
    def front_picture_url(self, obj):
        if obj.profile.front_picture:
            return obj.profile.front_picture.url
        else: 
            return obj.profile.default_image()

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'front_picture',
        )
        model = User

class OrganisationSerializer(serializers.ModelSerializer):
    '''Serialize Organisation's  model'''
    # customize organisation's front_picture field and create a rating field
    front_picture = serializers.SerializerMethodField('front_picture_url')
    cover_picture = serializers.SerializerMethodField('cover_picture_url')

    # return the front_picture url or the defaul_image method
    def front_picture_url(self, obj):
        if obj.front_picture:
            return obj.front_picture.url
        else: 
            return obj.default_image()
    
    # return the front_picture url or the defaul_image method
    def cover_picture_url(self, obj):
        if obj.cover_picture:
            return obj.cover_picture.url
        else: 
            return None

    def which_rating(self, obj):
        # visualize rating for particular organisation
        rating = 0.0
        reviews = organisation_models.Review.objects.filter(organisation=obj)
        if reviews:
            for review in reviews: 
                rating+=review.rating
            rating = round(((rating/len(reviews))*10), 0)/10 # round the rating to the first symbol after the comma
        return rating # return string of the rating

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
            'rating',
            'bookmark',
        )
        model = organisation_models.Organisation 

class ReviewListSerializer(serializers.ModelSerializer):
    '''Serialize Review's  model'''
    # customize author, organisation and timestamp fields
    author = serializers.SerializerMethodField('which_author')
    organisation = serializers.SerializerMethodField('which_organisation')
    timestamp = serializers.DateTimeField(format="%H:%M | %d %B %Y")

    # return serialized object in the author field
    def which_author(self, obj):
        auth_obj = User.objects.get(pk=obj.author.pk)
        author = UserSerializer(auth_obj, many=False).data
        return author

    # return serialized object in the organisation field
    def which_organisation(self, obj):
        org_obj = organisation_models.Organisation.objects.get(pk=obj.organisation.pk)
        organisation = OrganisationSerializer(org_obj, many=False).data
        return organisation

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'rating',
            'text',
            'author',
            'organisation',
            'timestamp'
        )
        model = organisation_models.Review

def create_review_serializer(organisation_id=None, request=None):
    '''Create a review'''
    class ReviewCreateSerializer(serializers.ModelSerializer):
        class Meta:
            # add the fields to the api serializer
            fields = (
                'id',
                'rating',
                'text',
            )
            model = organisation_models.Review
        
        # set the initial values of the field required for the creation of a review
        def __init__(self, *args, **kwargs):
            self.organisation_object = None
            self.organisation_qs = None
            if organisation_id:
                self.organisation_qs = organisation_models.Organisation.objects.filter(id=organisation_id)

            return super(ReviewCreateSerializer, self).__init__(*args, **kwargs)

        # validate the initial entries and raise exceptions if they does not exist
        def validate(self, data):
            if self.organisation_qs.exists() and self.organisation_qs.count() == 1:
                self.organisation_object = self.organisation_qs.first()
            else:
                raise ValidationError("Unable to create review for non-existing organisation")

            return data
            
        # create review based on the inputs and the initial entries
        def create(self, validated_data):
            rating = int(validated_data.get('rating'))
            text = validated_data.get('text')
            organisation_object = self.organisation_object
            review = organisation_models.Review.objects.create(rating=rating, text=text, author=request.user, organisation=organisation_object)

            return review

    return ReviewCreateSerializer


class PostListSerializer(serializers.ModelSerializer):
    '''Serialize Post's  model'''
    # cusotmize organsiation and timestamp fields and create comments field
    comments = serializers.SerializerMethodField()
    organisation = serializers.SerializerMethodField('which_organisation')
    timestamp = serializers.DateTimeField(format="%H:%M | %d %B %Y")

    # organisation field returns serialized Organsiation object
    def which_organisation(self, obj):
        if obj.organisation:
            org_obj = get_object_or_404(organisation_models.Organisation, pk=obj.organisation.pk)
            organisation = OrganisationSerializer(org_obj, many=False).data
            return organisation
        
    # comments field returns customized list of all comments for this post
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
            'timestamp',
            'comments',
        )
        model = posts_models.Post

def create_post_serializer(organisation_id=None, request=None):
    '''Create a post'''
    class PostCreateSerializer(serializers.ModelSerializer):
        class Meta:
            # add the fields to the api serializer
            fields = (
                'id',
                'description',
            )
            model = posts_models.Post
        
        # set the initial values of the field required for the creation of a post (the current user needs to be the host of the organisation creating the post)
        def __init__(self, *args, **kwargs):
            self.organisation_object = None
            self.organisation_qs = None
            if organisation_id:
                self.organisation_qs = organisation_models.Organisation.objects.filter(id=organisation_id, host=request.user)

            return super(PostCreateSerializer, self).__init__(*args, **kwargs)

        # validate the initial entries and raise exceptions if they does not exist
        def validate(self, data):
            if self.organisation_qs.exists() and self.organisation_qs.count() == 1:
                self.organisation_object = self.organisation_qs.first()
            else:
                raise ValidationError("Unable to create post for organisation that is not owned by the current user")

            return data

        # create post based on the inputs and the initial entries
        def create(self, validated_data):
            description = validated_data.get('description')
            organisation_object = self.organisation_object
            post = posts_models.Post.objects.create(description=description, organisation=organisation_object)

            return post

    return PostCreateSerializer

class CommentListSerializer(serializers.ModelSerializer):
    '''Serialize Comment's  model'''
    # customize author and timestamp fields
    author = serializers.SerializerMethodField('which_author')
    timestamp = serializers.DateTimeField(format="%H:%M | %d %B %Y")

    # returns the front_picture url or the default_image method for objects User or Organisation
    def front_picture_url(self, obj):
        if obj.front_picture:
            return obj.front_picture.url
        else: 
            return obj.default_image()

    def which_author(self, comment):
        content_object = comment.content_object
        # return custom serialization of User or Organisation
        if content_object.__class__ == User:
            return {
                'id':content_object.pk,
                'first_name':content_object.first_name,
                'last_name':content_object.last_name,
                'email':content_object.email,
                'front_picture':self.front_picture_url(content_object.profile)
            }
        elif content_object.__class__ == organisation_models.Organisation:
            return {
                'id':content_object.pk,
                'title':content_object.title,
                'description':content_object.description,
                'locations':content_object.locations,
                'category':content_object.category,
                'phone_number':content_object.phone_number,
                'email_organisation':content_object.email_organisation,
                'website':content_object.website,
                'front_picture':self.front_picture_url(content_object)
            }

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'post',
            'text',
            'timestamp',
            'content_type',
            'object_id',
            'author'
        )
        model = posts_models.Comment

def create_comment_serializer(model_type='user', organisation_id=None, post_id=None, request=None):
    '''Create a comment'''
    class CommentCreateSerializer(serializers.ModelSerializer):
        class Meta:
            # add the fields to the api serializer
            fields = (
                'id',
                'text',
            )
            model = posts_models.Comment

        # set the initial values of the field required for the creation of a comment
        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.post_obj = None
            self.post_qs = None
            if post_id:
                self.post_qs = posts_models.Post.objects.filter(id=post_id) #filter post by the post id

            return super(CommentCreateSerializer, self).__init__(*args, **kwargs)

        # validate the initial entries and raise exceptions
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
            if not SomeModel == User and not SomeModel == organisation_models.Organisation:
                raise ValidationError("Unable to create comment that is not user or organisation")

            if SomeModel == organisation_models.Organisation:
                obj_qs = organisation_models.Organisation.objects.filter(id=organisation_id, host=request.user)
                if not obj_qs.exists() or obj_qs.count() != 1:
                    raise ValidationError("This is not an id for this organisation")

            return data

        # create comment based on the inputs and the initial entries
        def create(self, validated_data):
            text = validated_data.get("text")
            model_type = self.model_type
            post_obj = self.post_obj
            # create the comment
            comment = posts_models.Comment.objects.create_by_model_type(
                model_type=model_type,
                organisation_id=organisation_id,
                text=text,
                post_obj = post_obj,
                request=request
            )
            return comment

    return CommentCreateSerializer

class PendingRequestListSerializer(serializers.ModelSerializer):
    '''Serialize PendingRequest's  model'''

    user = serializers.SerializerMethodField('which_user')
    organisation = serializers.SerializerMethodField('which_organisation')

    # organisation field returns serialized Organsiation object
    def which_organisation(self, obj):
        if obj.organisation:
            org_obj = get_object_or_404(organisation_models.Organisation, pk=obj.organisation.pk)
            organisation = OrganisationSerializer(org_obj, many=False).data
            return organisation

    # user field returns serialized User object
    def which_user(self, obj):
        if obj.user:
            user_obj = get_object_or_404(User, pk=obj.user.pk)
            user = UserSerializer(user_obj, many=False).data
            return user

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'user',
            'organisation',
            'text'
        )
        model = partnership_models.PendingRequest

class RelationListSerializer(serializers.ModelSerializer):
    '''Serialize Relation's  model'''

    user = serializers.SerializerMethodField('which_user')
    organisation = serializers.SerializerMethodField('which_organisation')

    # organisation field returns serialized Organsiation object
    def which_organisation(self, obj):
        if obj.organisation:
            org_obj = get_object_or_404(organisation_models.Organisation, pk=obj.organisation.pk)
            organisation = OrganisationSerializer(org_obj, many=False).data
            return organisation

    # user field returns serialized User object
    def which_user(self, obj):
        if obj.user:
            user_obj = get_object_or_404(User, pk=obj.user.pk)
            user = UserSerializer(user_obj, many=False).data
            return user

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'user',
            'organisation',
            'text'
        )
        model = partnership_models.Relation

class ConversationListSerializer(serializers.ModelSerializer):
    
    user = serializers.SerializerMethodField('which_user')
    organisation = serializers.SerializerMethodField('which_organisation')
    messages = serializers.SerializerMethodField()

    # user field returns serialized User object
    def which_user(self, obj):
        if obj.user:
            user_obj = get_object_or_404(User, pk=obj.user.pk)
            user = UserSerializer(user_obj, many=False).data
            return user

    # organisation field returns serialized Organsiation object
    def which_organisation(self, obj):
        if obj.organisation:
            org_obj = get_object_or_404(organisation_models.Organisation, pk=obj.organisation.pk)
            organisation = OrganisationSerializer(org_obj, many=False).data
            return organisation
        
    # comments field returns customized list of all comments for this post
    def get_messages(self, obj):
        c_qs = reversed(obj.messages.order_by('-timestamp'))
        messages = MessageListSerializer(c_qs, many=True).data
        return messages

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'user',
            'organisation',
            'label',
            'messages',
        )
        model = chat_models.Conversation

class MessageListSerializer(serializers.ModelSerializer):
    
    conversation = serializers.SerializerMethodField('which_conversation')
    timestamp = serializers.DateTimeField(format="%H:%M | %d %B %Y")

    # organisation field returns serialized Organsiation object
    def which_conversation(self, obj):
        if obj.conversation:
            con_obj = get_object_or_404(chat_models.Conversation, pk=obj.conversation.pk)
            conversation = ConversationListSerializer(con_obj, many=False).data
            return conversation

    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'conversation',
            'handle',
            'message',
            'timestamp'
        )
        model = chat_models.Message