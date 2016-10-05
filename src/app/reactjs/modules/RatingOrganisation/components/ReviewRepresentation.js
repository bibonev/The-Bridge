import React from 'react';

export default (props) => {
    const data = props.data.map(review =>
      <div key={review.id}>
        <p>{review.rating}</p>
        <p>{review.text}</p>
    </div>
    )
    return <div>
        {data}
    </div>
}