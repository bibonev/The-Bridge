import React from 'react'
import { Link } from 'react-router'

export default class OrganisationsList extends React.Component{
    constructor(props){
        super(props)
        this.onClickOrganisationChange = this.onClickOrganisationChange.bind(this)
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
    render(){
        const org_u_rows = this.props.org_u_rows || [];
        const currentOrganisationId = this.props.currentOrganisationId;
        const organisationDisplay = this.organisationDisplay(currentOrganisationId);

        const currUserOrg = this.props.org_u_rows.map(org => 
                <a href={`//localhost:${port}/studio/` + org.id} key={org.id}>
                    <button onClick={() => this.onClickOrganisationChange(org.id)} key={org.id}>
                        {org.title}
                    </button>
                </a>
            )
        const haveOrganisations = () => {
            if(typeof org_u_rows !== 'undefined' && org_u_rows.length > 0 && !jQuery.isEmptyObject(organisationDisplay)){
                return <div>
                            <div className="organisationChooseBox">
                                <button className="organisationDisplay" onClick={this.showOrganisationOptions}>{organisationDisplay.title}</button>
                                <div className="organisationOptions currentOptionsShow">
                                    {currUserOrg}
                                </div>
                            </div>
                            <a href={`//localhost:${port}/organisations/` + currentOrganisationId} className="link-to-organisation"><i className="fa fa-external-link" aria-hidden="true"></i></a>
                        </div>
            }else{
                return; 
            }
        }
        return <div>
                 {haveOrganisations()}
                </div>
    }
}