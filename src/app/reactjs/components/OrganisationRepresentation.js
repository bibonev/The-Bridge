import React from 'react';

export default (props) => {
    const data = props.data.map(org =>
      <a class="organisation-link">
        <div class="org-box">
            <div class="gradient-background">
                <span class="org-box-title">
                    org.title
                </span>
                <span class="org-box-category">
                    org.category
                </span>
                <span class="org-box-locations">
                   org.locations
                </span>
            </div>
        </div>
    </a>
    )
    return <div>
        {data}
    </div>
}


