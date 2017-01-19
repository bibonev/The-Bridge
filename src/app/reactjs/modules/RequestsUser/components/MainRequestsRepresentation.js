import React from 'react'
import Textarea from 'react-textarea-autosize'

export default class MainStudioRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.requestObject = this.requestObject.bind(this)
        this.pendingObject = this.pendingObject.bind(this)
    }
    requestObject(request_id){
        var request_object = {}
        this.props.relations.map(function(request){
                if(request_id == request.id){
                    request_object = request
                }
            });
        return request_object;
    }
    pendingObject(request_id){
       var request_object = {}
       this.props.pending_requests.map(function(request){
               if(request_id == request.id){
                   request_object = request
               }
           });
       return request_object;
    }
    render(){
        const relation = this.requestObject(this.props.curr_request_id);
        const pending_request = this.pendingObject(this.props.curr_pending_id);
        const conversation = this.props.conversation;
        const messages = this.props.messages;

        const all_messages = messages.map(function(m){
            let currentClass = '';
            if(m.handle_type == 'user'){
                currentClass = 'send-message'
            }else if(m.handle_type == 'organisation'){
                currentClass = 'receive-message'
            }
            return <div key={m.id} className={currentClass}>
                        <p>{m.handle}</p> 
                        <div className="message-display">{m.message}</div>
                    </div>
        })

        const chatBox = () => {
            return <div>
                        <div className="all-messages">
                            {all_messages}
                        </div>
                        <div className="message-box">
                            <Textarea placeholder="Write your message..." onKeyDown={handleKeyPress}></Textarea>
                        </div>
                    </div>
        }

        const chat = (c) => {
            return <div>
                        <div className="chat-header">
                            <p>{c.organisation.title}</p>
                        </div>
                        {chatBox()}
                    </div>
        }

        const conversationDisplay = () => {
            if((typeof this.props.curr_pending_id !== 'undefined' || typeof this.props.curr_request_id !== 'undefined') && (typeof conversation !== 'undefined' && !jQuery.isEmptyObject(conversation))){
                return chat(conversation);
            }else{
                return <div className="nothing-selected">
                            <span>No requests selected</span>
                        </div> 
            }
        }

        const handleKeyPress = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                var messageText = $(e.target).val();
                $(e.target).val('');
                var handle = conversation.user.first_name + " " + conversation.user.last_name
                this.props.addCurrentMessage(handle, messageText)
            }
        }
        return <div className="studio-main">
                    {conversationDisplay()}
                </div>
    }
}