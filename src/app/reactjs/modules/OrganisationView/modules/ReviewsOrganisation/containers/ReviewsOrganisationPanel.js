import React, {Component}  from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { loadReviews, addReview } from '../actions';
import { bindActionCreators } from 'redux';

import Textarea from 'react-textarea-autosize'
import ReviewRepresentation from '../components/ReviewRepresentation';

let myRating = 0;

function updateMyRating(rate, event){
    myRating = rate;
}

function getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == "" || isNaN(org_id)){
            org_id = curr_url.pop();
        }
        return org_id;
    }

class ReviewsOrganisationPanel extends Component {
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
        const correctSpellReview = (c) => {
            let c_num = parseInt(c.count)
            if(c_num==1){
                return (c.count + " review")
            }else{
                return (c.count + " reviews")
            }
        }

        return (
            <div>
                <div className="ratingView">
                    <div className="ratingMain"><span className="ratingNum">{rating}</span><span className="glyphicon glyphicon-star ratingStar" aria-hidden="true"></span></div>
                    <div className="reviewsCount">{correctSpellReview({count})}</div>
                </div>
                <form onSubmit={reviewSubmit} method="POST" className="reviewAddForm">
                    <Rating 
                        name="starratingform" 
                        start={0}
                        stop={5}
                        empty="glyphicon glyphicon-star-empty"
                        full="glyphicon glyphicon-star"
                        onClick={updateMyRating}
                    />
                    <Textarea type="text" name="reviewtext" placeholder="Write your review..." className="reviewField"></Textarea>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsOrganisationPanel);