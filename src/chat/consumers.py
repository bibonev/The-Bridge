import re
import json
import logging

from channels import Group
from channels.sessions import channel_session
from partnership import models as partnership_models
from .models import Conversation

log = logging.getLogger(__name__)

@channel_session
def ws_connect(message):
    print(message)
    # Extract the room from the message. This expects message.path to be of the
    # form /chat/{label}/, and finds a Room if the message path is applicable,
    # and if the Room exists. Otherwise, bails (meaning this is a some othersort
    # of websocket). So, this is effectively a version of _get_object_or_404.
    #try:
    print('Path: ',message['path'])
    prefix = message['path'].split('/')
    request_id = prefix[-1] # last element
    request_type = prefix[-2] # before last element
    if prefix[1] != 'chat':
        log.debug('invalid ws path=%s', message['path'])
        return

    request_object = set()
    conversation = set()

    print("Request type: ",request_type)
    if request_type == 'pending':
        request_object = partnership_models.PendingRequest.objects.get(pk=request_id)
    else:
        request_object = partnership_models.Relation.objects.get(pk=request_id)

    if request_object:
        conversation = Conversation.objects.get(user=request_object.user, organisation=request_object.organisation)
        print("Found the request: ", conversation.label)
    
    label = conversation.label
    # except ValueError:
    #     log.debug('invalid ws path=%s', message['path'])
    #     return
    # except Conversation.DoesNotExist:
    #     log.debug('ws conversation does not exist label=%s', label)
    #     return

    log.debug('chat connect conversation=%s client=%s:%s', 
        conversation.label, message['client'][0], message['client'][1])
    
    # Need to be explicit about the channel layer so that testability works
    # This may be a FIXME?
    Group('chat-'+label, channel_layer=message.channel_layer).add(message.reply_channel)

    message.channel_session['conversation'] = conversation.label

@channel_session
def ws_receive(message):
    print("Received message: ", message)
    # Look up the room from the channel session, bailing if it doesn't exist
    try:
        label = message.channel_session['conversation']
        conversation = Conversation.objects.get(label=label)
        print("Label: ", label)
    except KeyError:
        log.debug('no conversation in channel_session')
        return
    except conversation.DoesNotExist:
        log.debug('recieved message, buy conversation does not exist label=%s', label)
        return

    # Parse out a chat message from the content text, bailing if it doesn't
    # conform to the expected message format.
    try:
        data = json.loads(message['text'])
        print("Data: ", data)
    except ValueError:
        log.debug("ws message isn't json text=%s", text)
        return
    
    if set(data.keys()) != set(('handle', 'message')):
        print("Something")
        log.debug("ws message unexpected format data=%s", data)
        return

    print("New data: ", data)
    if data:
        log.debug('chat message conversation=%s handle=%s message=%s', 
            conversation.label, data['handle'], data['message'])
        m = conversation.messages.create(**data)
        print("Messages: ", m)
        # See above for the note about Group
        Group('chat-'+label, channel_layer=message.channel_layer).send({'text': json.dumps(m.as_dict())})

@channel_session
def ws_disconnect(message):
    try:
        label = message.channel_session['conversation']
        conversation = Conversation.objects.get(label=label)
        Group('chat-'+label, channel_layer=message.channel_layer).discard(message.reply_channel)
    except (KeyError, Conversation.DoesNotExist):
        pass