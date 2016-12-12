import React from 'react';
import Rating from 'react-rating';

export default (props) => {
    const data = props.data.map(review =>
        <div key={review.id} className="posts-dashboard">
            <div className="authorReviewDetails">
                <img src={`//localhost:${port}` + review.author.front_picture} width="40" height="40" />
                <span className="post-author">{review.author.first_name} {review.author.last_name}</span>
                <span className="reviewRating">
                    <Rating 
                        name="starratingdisplay" 
                        start={0}
                        stop={5}
                        empty="glyphicon glyphicon-star-empty"
                        full="glyphicon glyphicon-star"
                        initialRate={review.rating}
                        readonly={true}
                    /></span>
                <span className="post-comment-dateTime">{review.timestamp}</span>
            </div>
            <div className="post-description">{review.text}</div>
        </div>
    )
    return <div>
        {data}
    </div>
}