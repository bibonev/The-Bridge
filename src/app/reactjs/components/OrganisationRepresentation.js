import React from 'react';

export default (props) => {
    const data = props.data.map(org =>
      <a className="organisation-link">
        <div className="org-box">
            <div className="gradient-background">
                <span className="org-box-title">
                    {org.title}
                </span>
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


