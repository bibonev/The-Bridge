import React from 'react';

export default (props) => {
    const data = props.suggestions.map(org =>
     <div className="suggestion-info">
        <a href={"//localhost:8000/organisations/" + org.id}>
            <img src={"//localhost:8000" + org.front_picture} width="32" height="32" />
            <span className="suggestion-title">{org.title}</span>
        </a>
     </div>
    )
    return <div className="search-suggestions">
                {data}
    </div>
}


