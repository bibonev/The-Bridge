import React from 'react';

export default (props) => {
    function styleBoxBackground(cover){
        if(cover == null){
            return {
                background: '#029acf'
            }
        }else{
            return {
                background:"url('" + cover + "') no-repeat center center",
                backgroundSize: "cover",
            }
        }
    }
    const data = props.data.map(org =>
      <a key={org.id} className="organisation-link" href={"//localhost:8000/organisations/" + org.id}>
        <div className="org-box" style={styleBoxBackground(org.cover_picture)}>
            <div className="gradient-background">
                <span className="org-box-title">
                    {org.title}
                </span>
                <div className="rating-org"><span className="ratingNum">{parseFloat(org.rating).toFixed(1)}</span><span className="glyphicon glyphicon-star ratingStar" aria-hidden="true"></span></div>
                <span className="org-box-category">
                    {org.category}
                </span>
                <span className="org-box-locations">
                   {org.locations}
                </span>
            </div>
        </div>
    </a>
    )
    return <div>
        {data}
    </div>
}


