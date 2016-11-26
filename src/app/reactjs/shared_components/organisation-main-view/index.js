import React from 'react'

export default class OrganisationMainView extends React.Component{
    constructor(props){
        super(props)
        this.styleBoxBackground = this.styleBoxBackground.bind(this)
    }

    styleBoxBackground(cover){
        if(cover == null){
            return {
                background: '#029acf',
                width: "100%",
                height: "100%",
            }
        }else{
            return {
                background:"url('" + cover + "') no-repeat center center",
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
            }
        }
    }
    render(){
        const organisation = this.props.organisation;
        const mainColumn = this.props.mainColumn;
        const userAuthenticated = this.props.userAuthenticated;
        const requestState = this.requestState;
        const leftMostColumn = this.props.leftMostColumn;
        const IsOwner = this.props.IsOwner;


        const coverPhoto = () => {
            <div className="org-cover-photo">
                <div style={styleBoxBackground(organisation.cover_picture)}>
                    <div className="gradient-bottom"></div>
                </div>
            </div>
        }

        const authenitcationPermissions = () => {
            if(userAuthenticated){
                if(requestState == 0){
                    return <div> <button type="button" className="request-btn" data-toggle="modal" data-target="#requestPopUp">Make a request</button>
                        <div className="modal fade" id="requestPopUp" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="request-title">Make your request to <b>{organisation.title}</b></h4>
                                    </div>
                                    <div>
                                    <form action="" method="POST" id="request_form">
                                        <input type="hidden" value="{organisation.id}" name="hidden_org_id"/>
                                        <div className="modal-body">
                                            <textarea className="request-text autoExpand" name="request_text" rows="6" data-min-rows='6' placeholder="Type your request..."></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <input type="submit" value="Send" name="request_organisation" className="send-request"/>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }else if(requestState == 1){
                    return <button className="request-btn">Pending request</button>
                }else if(request_state == 2){
                    return <button className="request-btn">You are in relation!</button>
                }
            }
        }

        const owner = () => {
            if(IsOwner){
                return <a href="{% url 'organisation:my_organisation_edit' pk=org.pk %}">Edit organisation</a>
            }
        }

        const organisationMainView = () => {
            return (<div className="organisation">
                        {coverPhoto()}
                        {authenitcationPermissions()}
                        <div className="organisation-content">
                            <div className="rating-col">
                                <img className="org-profile-photo" width="180" height="180" src="{organisation.front_picture.url}"/>
                                {leftMostColumn}
                            </div>
                            <div className="main-col">
                                <h3>{organisation.title}</h3>
                                <div className="description">{organisation.description}</div>
                                {mainColumn}
                            </div>
                            <div className="info-col">
                                <div className="org-contacts">
                                    <span className="category">{organisation.category}</span>
                                    <span>
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        {organisation.locations}
                                    </span>
                                    <span className="unbreakable">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                        {organisation.phone_number}
                                    </span>
                                    <span className="unbreakable">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        <a href="mailto:{{org.email_organisation}}" target="_top">
                                                {organisation.email_organisation}
                                            </a>
                                    </span>
                                    <span className="unbreakable">
                                        <i className="fa fa-link" aria-hidden="true"></i>
                                        <a href="{{org.website}}" target="_blank">
                                                {organisation.website}
                                            </a>
                                    </span>
                                </div>
                                {owner()}
                            </div>
                        </div>
                    </div>);
        }
        return <div>
                {organisationMainView()}
                </div>
    }
}
