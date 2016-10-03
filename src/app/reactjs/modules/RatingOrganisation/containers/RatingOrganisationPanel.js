import React, {Component}  from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import { updateRating } from '../actions';
import { bindActionCreators } from 'redux';

class RatingOrganisationPanel extends Component {
    getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == ""){
            org_id = curr_url.pop();
        }
        return org_id;
    }
    handleRatingClick(e, data){
        updateRating(this.getCurrentOrganisationId(), data.rating)
    }
    render(){
        const rating = this.props.ratings[this.getCurrentOrganisationId()] || 0;
        const { updateRating } = this.props;

        return (
            <div>
                <StarRating name="handler" caption="Use onClick Handlers!" totalStars={5} onRatingClick={this.handleRatingClick} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ratings: state.ratings,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   updateRating
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RatingOrganisationPanel);