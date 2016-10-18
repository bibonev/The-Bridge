import React from 'react';

export default (props) => {
    const data = props.suggestions.map(title =>
     <div>
        {title}
     </div>
    )
    return <div>
        <span>
            {data}
        </span>
    </div>
}


