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
    const isDataFull = () =>  {
        if(data.length == 0){
            return;
        }else{
            return <div className="search-suggestions">
                <div className="arrow-up"></div>
                <div className="arrow-down"></div>
                {data}
                </div>
        }
    }
    return <div>
            {isDataFull()}
        </div>
}


