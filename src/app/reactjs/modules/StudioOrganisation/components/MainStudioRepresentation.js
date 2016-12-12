import React from 'react'
import Textarea from 'react-textarea-autosize'

export default class MainStudioRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.organisationObject = this.organisationObject.bind(this)
        this.requestObject = this.requestObject.bind(this)
        this.pendingObject = this.pendingObject.bind(this)
    }
    organisationObject(org_id){
        var org_object = {}
        this.props.org_u_rows.map(function(org){
                if(org_id == org.id){
                    org_object = org
                }
            });
        return org_object;
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
        const organisation = this.organisationObject(this.props.curr_organisation_id);
        const conversation = this.props.conversation;
        const messages = this.props.messages;

        const mainStudio = (object) => {
            return <div>
                        <p>Request name: {object.user.first_name} {object.user.last_name}</p>
                        <p>Message: {object.text} </p>
                        <p>Organisation name: {organisation.title}</p>
                    </div>
        }
        const checkPendingAndRelationExistence = (r_obj, p_obj) => {
            if(typeof r_obj !== 'undefined' && !jQuery.isEmptyObject(r_obj)){
                return mainStudio(r_obj);
            }else if(typeof p_obj !== 'undefined' && !jQuery.isEmptyObject(p_obj)){
                return mainStudio(p_obj);
            }else{
                return <div>
                            <h3>No requests selected</h3>
                        </div> 
            }
        }
        const organisationDisplay = () => {
            if(typeof organisation == 'undefined' || jQuery.isEmptyObject(organisation)){
                return; 
            }else{
                return checkPendingAndRelationExistence(relation, pending_request)
             }
        }

        const all_messages = messages.map(m => 
            <div key={m.id}><span>{m.timestamp} {m.handle} :</span>{m.message}</div>
        )
        const chat = () => {
            if(typeof this.props.curr_request_id !== 'undefined' || typeof this.props.curr_pending_id !== 'undefined'){
                return <div>
                    {all_messages}
                    <div>
                        <Textarea placeholder="Write your message..." onKeyDown={handleKeyPress}></Textarea>
                    </div>
                </div>
            }
        }
        const handleKeyPress = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                var messageText = $(e.target).val();
                $(e.target).val('');
                var handler = conversation.organisation.title
                this.props.addCurrentMessage(handler, messageText)
            }
        }

        return <div className="studio-main">
                    {organisationDisplay()}
                    {chat()}
                </div>
    }
}