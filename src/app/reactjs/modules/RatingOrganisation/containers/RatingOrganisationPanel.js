import React, {Component}  from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import { loadReviews, addRating } from '../actions';
import { bindActionCreators } from 'redux';

import ReviewRepresentation from '../components/ReviewRepresentation';

function getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == ""){
            org_id = curr_url.pop();
        }
        return org_id;
    }

class RatingOrganisationPanel extends Component {
    componentWillMount() {
        const { loadReviews } = this.props;
        loadReviews(getCurrentOrganisationId());
    }
    render(){
        const { rows, count, rating } = this.props.ratings;
        const { addRating } = this.props;
        const handleRatingClick = (e, data) => addRating(getCurrentOrganisationId(), data.rating);

        return (
            <div>
                <StarRating name="handler" totalStars={5} onRatingClick={handleRatingClick} />
                <div>{rating} out of 5</div>
                <ReviewRepresentation data={rows} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ratings: state.ratings,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadReviews, addRating
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RatingOrganisationPanel);