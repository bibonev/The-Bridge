import React from 'react'
import { Link } from 'react-router'
import OrganisationsList from './organisations-list'

export default class RequestsRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.onClickRequestResult = this.onClickRequestResult.bind(this)
    }
    onClickRequestResult(pending_request_id, result){
        console.log("PR: ",pending_request_id)
        this.props.submitRequestResult(pending_request_id, result);
    }
    render(){
        const pending_requests = this.props.pending_requests || [];
        const relations = this.props.relations || [];
        const currentOrganisationId = this.props.curr_organisation_id;
        const showRequests = this.props.showRequests;
        const organisationsList = () => {
            if(typeof currentOrganisationId != 'undefined'){
                return <OrganisationsList org_u_rows={this.props.org_u_rows} currentOrganisationId={currentOrganisationId} showRequests={showRequests}/>
            }else{
                return;
            }
        }

        const requestsType = (request, type) => {
            if(typeof currentOrganisationId != 'undefined'){
                let url = ''
                let decisionButtons;
                if(type == 'relation'){
                   url = `/${request.id}/`
                   return <Link to={url} activeClassName="active-request" className="requests-container relation-style-box">
                            <i className="fa fa-users request-status-r relation-status-icon-r" aria-hidden="true"></i>
                            <img className="request-profile-photo" src={`//localhost:${port}` + request.user.front_picture} width="60" height="60" />
                            <span className="requests-author-title relation-style bonus-margin-title">{request.user.first_name} {request.user.last_name}</span>
                        </Link>
                }else{
                   url = `/pending/${request.id}/`
                   return <Link to={url} activeClassName="active-request" className="requests-container pending-style-box">
                            <i className="fa fa-clock-o request-status-r pending-status-icon-r" aria-hidden="true"></i>
                            <img className="request-profile-photo" src={`//localhost:${port}` + request.user.front_picture} width="60" height="60" />
                            <div className="pending-title-box">
                                <span className="pending-title requests-author-title pending-style">{request.user.first_name} {request.user.last_name}</span>
                                <div className="yes-no-box">
                                    <button className="approve" onClick={() => this.onClickRequestResult(request.id, 'approve')}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    <button className="reject" onClick={() => this.onClickRequestResult(request.id, 'reject')}><i className="fa fa-times" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </Link>
                }
            }else{
                let url = ''
                if(type == 'relation'){
                   url = `/${request.id}/`
                   return <Link to={url} activeClassName="active-request" className="requests-container relation-style-box">
                            <i className="fa fa-users request-status-r relation-status-icon-r" aria-hidden="true"></i>
                            <img className="request-profile-photo" src={`//localhost:${port}` + request.organisation.front_picture} width="60" height="60" />
                            <div className="ratingMain"><span className="ratingNum">{request.organisation.rating}</span><span className="glyphicon glyphicon-star ratingStar" aria-hidden="true"></span></div>
                            <span className="requests-author-title relation-style">{request.organisation.title}</span>
                    </Link>
                }else{
                   url = `/pending/${request.id}/`
                   return <Link to={url} activeClassName="active-request" className="requests-container pending-style-box">
                            <i className="fa fa-clock-o request-status-r pending-status-icon-r" aria-hidden="true"></i>
                            <img className="request-profile-photo" src={`//localhost:${port}` + request.organisation.front_picture} width="60" height="60" />
                            <div className="ratingMain"><span className="ratingNum">{request.organisation.rating}</span><span className="glyphicon glyphicon-star ratingStar" aria-hidden="true"></span></div>
                            <span className="requests-author-title pending-style">{request.organisation.title}</span>
                    </Link>
                }
            }
        }
        const requestsResult = () => {
            if(relations.length == 0){
                return <div className="empty-requests-list">No requests in progress</div>
            }else{
                return relations.map(request =>
                        <li key={request.id} className="request-item">
                           {requestsType(request, 'relation')}
                        </li>
                   )}
        }
        const pendingRequestsResult = () => {
                if(pending_requests.length == 0){
                    return <div className="empty-requests-list">No pending requests</div>
                }else{
                    return pending_requests.map(request =>
                           <li key={request.id} className="request-item">
                               {requestsType(request, 'pending')}
                           </li>
                    )}
            }
        return <div className="studio-info">
                    {organisationsList()}
                    <ul className="bookmark-list">
                        {pendingRequestsResult()}
                        {requestsResult()}
                    </ul>
                </div>
    }
}