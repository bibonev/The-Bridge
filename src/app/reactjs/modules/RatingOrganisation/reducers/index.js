const RATINGS_INITIAL = {
    rows: [],
    count: 0,
    rating: 0
};

function calculateRating(reviewList){
    var rating = 0;
    if(reviewList.length != 0){
        for(var i = 0; i < reviewList.length; i++){
            rating+=reviewList[i].rating;
        }
        rating = Math.round((rating/reviewList.length)*10)/10
    }
    return rating;
}

export const ratings = (state=RATINGS_INITIAL, action) => {
    switch (action.type) {
        case 'SHOW_RATINGS':
            return Object.assign({}, state, {
                rows: action.reviews,
                count: action.reviews.length,
                rating: calculateRating(action.reviews)
            });
        case 'ADD_RATING':
            return Object.assign({}, state, {
                rows: [
                    action.review,
                    ...state.rows,
                ], 
                count: state.count+1,
                rating: Math.round(((state.rating*state.count+action.review.rating)/(state.count+1))*10)/10
            });
        default:
            return state;
    }
};