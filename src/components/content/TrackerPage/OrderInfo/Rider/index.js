import React from "react";
import './index.css'


const Rider = ({userName, userPhotoUrl, userNumber, availWidth, t}) => {
  return (
    <div className="card" style={{lineHeight: "20px",marginTop: "-12px"}}>
      <div className="card-content" style={{ padding: 0 }}>
          <div className="row valign-wrapper rider-details-box">
            <div className="col s8 rider-details-box-pic">
                <div className="row  left-align">
                  <div className="col s4">
                    <img src={userPhotoUrl} alt="" className="circle responsive-img profile-img-rider"/>
                  </div>
                  <div className="col s8 rider-details-name roboto-regular">
                    <span className="rider-details-name-s1">{userName}</span><br/>
                    <span className="rider-details-name-s2">{t("willDeliverOrder")}</span>
                  </div>
                </div>
            </div>
            <div className="col s4 right-align rider-mobno-container">
                {availWidth <= 769 ? 
                  <div>
                    <div className="line-ver"></div>
                    <div className="call-rider-sym">
                      <a href={`tel:` + userNumber}><i className="material-icons light-green-fg f-size-30">call</i></a>
                    </div>
                  </div> : 
                  <span className="rider-mobno">{`+${userNumber}`}</span>}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Rider;
