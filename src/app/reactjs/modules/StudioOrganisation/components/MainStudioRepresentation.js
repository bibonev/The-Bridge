import React from 'react'

export default class MainStudioRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.organisationObject = this.organisationObject.bind(this)
        this.requestObject = this.requestObject.bind(this)
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
        this.props.requests.map(function(request){
                if(request_id == request.id){
                    request_object = request
                }
            });
        return request_object;
    }
    render(){
        const request = this.requestObject(this.props.curr_request_id);
        const organisation = this.organisationObject(this.props.curr_organisation_id);
        const organisationDisplay = () => {
            if(typeof organisation == 'undefined' || jQuery.isEmptyObject(organisation)){
                return <div>
                            <h3>Does not exist organisation. </h3>
                        </div> 
            }else if(typeof request !== 'undefined' && !jQuery.isEmptyObject(request)  ){
                return <div>
                            <p>Request name: {request.name}</p>
                            <p>Organisation name: {organisation.title}</p>
                        </div>
            }else{
                return <div>
                            <h3>No requests selected</h3>
                        </div> 
            }
        }
        
        return <div className="studio-main">
                    {organisationDisplay()}
                </div>
    }
}