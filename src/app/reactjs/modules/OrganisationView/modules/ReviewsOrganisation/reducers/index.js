import { combineReducers } from 'redux';

const REVIEWS_INITIAL = {
    rows: [],
    count: 0,
    rating: 0.0
};

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function calculateRating(reviewList){
    var rating = 0;
    if(reviewList.length > 0){
        for(var i = 0; i < reviewList.length; i++){
            rating+=reviewList[i].rating;
        }
        rating = round((rating/reviewList.length), 1).toFixed(1)
    }
    return rating;
}

const reviews = (state=REVIEWS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_REVIEWS':
            return Object.assign({}, state, {
                rows: action.reviews,
                count: action.reviews.length,
                rating: calculateRating(action.reviews)
            });
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                rows: [
                    action.review,
                    ...state.rows,
                ], 
                count: state.count+1,
                rating: round((state.rating*state.count+action.review.rating)/(state.count+1), 1).toFixed(1)
            });
        default:
            return state;
    }
};

export default combineReducers({
    reviews,
});