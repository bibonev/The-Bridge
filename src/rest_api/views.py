from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions, filters
from django.contrib.auth.models import User
from developer import models as developer_models
from posts import models as posts_models
from django.db.models import Q
from . import serializers

class UserListAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

# REST API list all organisations on url: /api/v1/organisations/
class OrganisationListAPIView(generics.ListAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = developer_models.Organisation.objects.all()
    serializer_class = serializers.OrganisationSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'description', 'category', 'locations',)

class OrganisationRetrieveAPIView(generics.RetrieveAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = developer_models.Organisation.objects.all()
    serializer_class = serializers.OrganisationSerializer

class OrganisationCurrUserListAPIView(generics.ListAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    serializer_class = serializers.OrganisationSerializer

    def get_queryset(self):
        queryset_list = developer_models.Organisation.objects.filter(host=self.request.user)

        return queryset_list

class ReviewListAPIView(generics.ListAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    serializer_class = serializers.ReviewListSerializer

    def get_queryset(self):
        org_obj = get_object_or_404(developer_models.Organisation, pk=self.kwargs['pk'])
        queryset_list = developer_models.Review.objects.filter(organisation=org_obj)
        return queryset_list

class ReviewRetrieveAPIView(generics.RetrieveAPIView):
    queryset = developer_models.Review.objects.all()
    serializer_class = serializers.ReviewListSerializer
    #permission_classes = [permissions.IsOwnerOrReadOnly]

class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = developer_models.Review.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        organisation_id = self.kwargs['pk']
        return serializers.create_review_serializer(organisation_id=organisation_id, request=self.request)

class PostListAPIView(generics.ListAPIView):
    queryset = posts_models.Post.objects.all()
    serializer_class = serializers.PostListSerializer

    def get_queryset(self):
        queryset_list = posts_models.Post.objects.all()
        organisation_id = self.request.GET.get('org_id')
        if organisation_id :
            org_obj = developer_models.Organisation.objects.get(pk=organisation_id)
            queryset_list = posts_models.Post.objects.filter(organisation=org_obj)

        return queryset_list

class PostRetrieveAPIView(generics.RetrieveAPIView):
    queryset = posts_models.Post.objects.all()
    serializer_class = serializers.PostListSerializer
    #permission_classes = [permissions.IsOwnerOrReadOnly]

class PostCreateAPIView(generics.CreateAPIView):
    queryset = posts_models.Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        organisation_id = self.request.GET.get('org_id')
        return serializers.create_post_serializer(organisation_id=organisation_id, request=self.request)

class CommentListAPIView(generics.ListAPIView):
    queryset = posts_models.Comment.objects.all()
    serializer_class = serializers.CommentListSerializer
    #permission_classes = [permissions.IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset_list = posts_models.Comment.objects.all()
        post = self.request.query_params.get('post', None)
        if post is not None:
            queryset_list = queryset_list.filter(post_id=post)

        return queryset_list

class CommentRetrieveAPIView(generics.RetrieveAPIView):
    queryset = posts_models.Comment.objects.all()
    serializer_class = serializers.CommentListSerializer
    #permission_classes = [permissions.IsOwnerOrReadOnly]


class CommentCreateAPIView(generics.CreateAPIView):
    queryset = posts_models.Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        model_type = self.request.GET.get('type')
        organisation_id = self.request.GET.get('org_id')
        post_id = self.request.GET.get('post_id')
        return serializers.create_comment_serializer(
            model_type=model_type,
            organisation_id=organisation_id, 
            post_id=post_id,
            request=self.request)

