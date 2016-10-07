import React, {Component}  from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import { loadReviews, addReview } from '../actions';
import { bindActionCreators } from 'redux';

import ReviewRepresentation from '../components/ReviewRepresentation';

let myRating = 0;

function updateMyRating(e, data){
    myRating = data.rating;
}

function getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == ""){
            org_id = curr_url.pop();
        }
        return org_id;
    }

class ReviewOrganisationPanel extends Component {
    componentWillMount() {
        const { loadReviews } = this.props;
        loadReviews(getCurrentOrganisationId());
    }
    render(){
        const { rows, count, rating } = this.props.reviews;
        const { addReview } = this.props;

        const reviewSubmit = (e) => {
            e.preventDefault();
            let reviewText = $("textarea[name=reviewtext]").val();
            $("textarea[name=reviewtext]").val("")
            let starRating = myRating;
            addReview(getCurrentOrganisationId(), reviewText, starRating)
        }

        return (
            <div>
                <div className="ratingMain"><p>{rating} <span className="glyphicon glyphicon-star" aria-hidden="true"></span></p></div>
                <div className="reviewsCount">{count} reviews</div>
                <form onSubmit={reviewSubmit} method="POST" className="reviewAddForm">
                    <StarRating name="starrating" totalStars={5} size={30} onRatingClick={updateMyRating}/>
                    <textarea type="text" name="reviewtext" placeholder="Write your review..." className="reviewField"></textarea>
                    <input type="submit" value="Add review" className="addReviewButton"/>
                </form>
                <ReviewRepresentation data={rows} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reviews: state.reviews,
})

const mapDispatchToProps = dispatch => bindActionCreators({
   loadReviews, addReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrganisationPanel);