import React from 'react'
import { Link } from 'react-router'

export default class RequestsRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.onClickOrganisationChange = this.onClickOrganisationChange.bind(this)
        this.onClickRequestResult = this.onClickRequestResult.bind(this)
        this.showOrganisationOptions = this.showOrganisationOptions.bind(this)
        this.organisationDisplay = this.organisationDisplay.bind(this)
    }
    onClickOrganisationChange(org_id){
        $('.organisationOptions').hide();
        this.props.showRequests(org_id);
    }
    showOrganisationOptions(e){
        e.stopPropagation();
        $('.currentOptionsShow:visible:not(.organisationOptions)').hide();
        $('.organisationOptions').toggle();
    }
    organisationDisplay(org_id){
        var org_object = {}
        this.props.org_u_rows.map(function(org){
                if(org_id == org.id){
                    org_object = org
                }
            });
        return org_object;
    }
    onClickRequestResult(org_id, pending_request_id, result){
        this.props.submitRequestResult(org_id, pending_request_id, result);
    }
    render(){
        const pending_requests = this.props.pending_requests || [];
        const relations = this.props.relations || [];
        const currentOrganisationId = this.props.curr_organisation_id;
        const currUserOrg = this.props.org_u_rows.map(org => 
                <Link to={`/${org.id}/`} key={org.id}>
                    <button onClick={() => this.onClickOrganisationChange(org.id)} key={org.id}>
                        {org.title}
                    </button>
                </Link>
            )
        const organisationDisplay = this.organisationDisplay(currentOrganisationId);
        const requestsResult = relations.map(request =>
                           <li key={request.id} className="requestDisplay">
                               <Link to={`/${currentOrganisationId}/${request.id}/`} activeClassName="active-request" className="requestButton">
                                    <img src={"//localhost:8000" + request.user.front_picture} width="32" height="32" />
                                    <span className="request-title">{request.user.first_name} {request.user.last_name}</span>
                               </Link>
                           </li>
                   )
        const pendingRequestsResult = pending_requests.map(request =>
                           <li key={request.id} className="requestDisplay">
                               <Link to={`/${currentOrganisationId}/pending/${request.id}/`} activeClassName="active-request" className="requestButton">
                                    <img src={"//localhost:8000" + request.user.front_picture} width="32" height="32" />
                                    <span className="request-title">{request.user.first_name} {request.user.last_name}</span>
                               </Link>
                               <button className="approve" onClick={() => this.onClickRequestResult(currentOrganisationId, request.id, 'approve')}><i className="fa fa-check" aria-hidden="true"></i></button>
                               <button className="reject" onClick={() => this.onClickRequestResult(currentOrganisationId, request.id, 'reject')}><i className="fa fa-times" aria-hidden="true"></i></button>
                           </li>
                   )
        const haveOrganisations = () => {
            if(typeof this.props.org_u_rows !== 'undefined' && this.props.org_u_rows.length > 0 && !jQuery.isEmptyObject(organisationDisplay)){
                return <div>
                        <div className="organisationChooseBox">
                            <button className="organisationDisplay" onClick={this.showOrganisationOptions}>{organisationDisplay.title}</button>
                            <div className="organisationOptions currentOptionsShow">
                                {currUserOrg}
                            </div>
                        </div>
                        <div className="bonus-text-all-requests">Pending requests for {organisationDisplay.title}</div>
                        <ul className="all-requests">
                            {pendingRequestsResult}
                        </ul>
                        <div className="bonus-text-all-requests">All requests for {organisationDisplay.title}</div>
                        <ul className="all-requests">
                            {requestsResult}
                        </ul>
                    </div>
            }else{
                return <p>Does not exist organisation</p>; 
            }
        }
        return <div className="studio-info">
                    {haveOrganisations()}
                </div>
    }
}