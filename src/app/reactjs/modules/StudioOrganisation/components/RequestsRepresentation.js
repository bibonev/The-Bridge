import React from 'react'

export default class RequestsRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.onClickOrganisationChange = this.onClickOrganisationChange.bind(this)
        this.showOrganisationOptions = this.showOrganisationOptions.bind(this)
        this.changeRequestView = this.changeRequestView.bind(this)
    }
    onClickOrganisationChange(org_id){
        //$('.organisationOptions').hide();
        //this.props.updateOrganisationId(org_id)
        window.location.href = "//localhost:8000/studio/" + org_id;
    }
    showOrganisationOptions(e){
        e.stopPropagation();
        $('.currentOptionsShow:visible:not(.organisationOptions)').hide();
        $('.organisationOptions').toggle();
    }
    organisationDisplay(org_id){
        var text = "";
        this.props.org_u_rows.map(function(org){
                if(org_id == org.id){
                    text = org.title
                }
        });
        return text;
    }
    changeRequestView(request_id){
        
        this.props.changeRequestId(request_id)
    }
    render(){
        const requests = this.props.requests || [] // delete [] and see if it is working
        const currentOrganisationId = this.props.curr_organisation_id;
        const currUserOrg = this.props.org_u_rows.map(org => 
                <button onClick={() => this.onClickOrganisationChange(org.id)} key={org.id}>
                    {org.title}
                </button>
            )
        const organisationDisplay = this.organisationDisplay(currentOrganisationId);
        const haveOrganisations = () => {
            if(typeof this.props.org_u_rows !== 'undefined' && this.props.org_u_rows.length > 0){
                return <div className="organisationChooseBox">
                        <button className="organisationDisplay" onClick={this.showOrganisationOptions}>{organisationDisplay}</button>
                        <div className="organisationOptions currentOptionsShow">
                            {currUserOrg}
                        </div>
                    </div>
            }else{
                return; 
            }
        }
        const requestsResult = requests.map(request =>
                           <li key={request.id} className="requestDisplay">
                               <button onClick={() => this.changeRequestView(request.id)} className="requestButton">
                                {request.name}
                               </button>
                           </li>
                   )
        return <div className="studio-info">
                    {haveOrganisations()}
                    <div className="bonus-text-all-requests">All requests for {organisationDisplay}</div>
                    <ul className="all-requests">
                        {requestsResult}
                    </ul>
                </div>
    }
}