import React from 'react';

import './index.css';

const Header=({logo, websiteUrl, title, tripId, userName, availWidth, t}) => {
  return (
    <div className="card order-details-header">
      <div className="card-content">
          <div className="row valign-wrapper" style={{height: "70px"}}>
            <div className="col s6">
                    <a href={websiteUrl}>
                      <img src={logo ? logo : ""} className="left" alt={title}/>
                    </a>
            </div>
              <div className="col s6 right-align">
                <div className="order-details-header-right">
                  {t('order')}&nbsp; <a href={"/#/" + tripId}>{`#${tripId}`}</a>
                </div>
                <div className="order-details-header-rn">{userName}</div>
              </div>
          </div>
      </div>
    </div>

  )
}

export default Header;
