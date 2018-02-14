import React from "react";
import { translate, Trans } from 'react-i18next';
import './index.css';
const moment = require('moment');

let monthNames = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June",
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];


class Status extends React.Component {
  state={
    extend: false
  }

  _handleExtend =()=>{
    this.setState({
      extend:!this.state.extend
    })
  }

  _statusMsg =(status, userName, t)=>{
    switch (status) {
      case "STARTED":
          return t("packageDispatched");
      case "CANCELED":
          return userName + " " + t("packageAssigned");
      case "NOT_STARTED":
          return t("packageNotStarted");
      case "DELIVERED":
          return userName + " " + t("packageDelivered");
    }
  }

  _statusSecton = (status, triggeredOn, amount, gst, clientName, eta, t) => {
    if ((status=="STARTED") || (status=="NOT_STARTED")) {
      return (
        <div className="roboto-regular light-black-fg">
            <div className="row">
              <div className="col s12">
                  <span className="left opacity-7 f-size-14">{status=="STARTED" ? t("exAT") : t("exAD")}</span>
                  <span className="order-pin-box right">{`${t("pin")}: 4122`}</span>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                  <span className="left f-size-40">
                    <strong>
                      {
                        status=="STARTED" ? 
                        <span>
                          {('0' + new Date(eta).getHours()).slice(-2)}:{('0' + new Date(eta).getMinutes()).slice(-2)} 
                          <span className="pm">{(new Date(eta).getHours() >= 12) ? "PM" : "AM"}</span> 
                        </span> : 
                        <span>
                          {new Date(eta).getDate()} 
                          <span className="pm">
                            {monthNames[new Date(eta).getMonth()]}
                          </span>
                        </span>
                      }
                    </strong>
                  </span>
                  <div className="right order-details-amount-text">{`${t("pay")}: `}
                    <span className="order-details-amount">
                      &#x20b9;{amount.amount && (parseFloat(amount.amount.amount)+((parseFloat(amount.amount.amount)*gst)/100)).toFixed(2)} {/*amount.amount && amount.amount.currency*/}
                    </span>
                  </div>
              </div>
            </div>

            <div className="row margin-top-minus-30">
              <div className="col s12">
                <div className="progress light-grey-bg">
                  <div className="determinate light-blue-bg" style={{width: "70%"}}></div>
                </div>
              </div>
            </div>
          </div>
      )
    } else {
      return (
        <div>
          <div className="row roboto-regular light-black-fg">
            <div className="col s12">
                <span className="left">{`${clientName}`}</span>
            </div>
           </div>

           <div className="row margin-top-minus-30">
             <div className="col s12 margin-top-minus-30">
                 { 
                   status.status == "COMPLETED" ?
                   <span className="left f-size-25" style={{color: "#00695c"}}>{`${t("orderDelivered")}`}</span> :
                   <span className="left f-size-25" style={{color: "#f44336"}}>{`${t("orderCancelled")}`}</span>
                 }
                 <span className="right">{moment(triggeredOn).format('MMM Do YYYY, h:mm a')}</span>
             </div>
            </div>
        </div>
      )
    }
  }

  render() {
    const {_handleExtend, _statusMsg, _statusSecton} = this;
    const {extend}= this.state;
    const {
      status, 
      source, 
      destination, 
      from, 
      to, 
      amount, 
      clientName, 
      userName, 
      eta,
      t
    }= this.props;

    let gst= 12;
    return (
      <div className="card">
        <div className="card-content order-status-box">
          {_statusSecton(status.status, status.triggeredOn, amount, gst, clientName, moment(eta).valueOf(), t)}
          <div className="collapsible-header margin-top-minus-30 order-details-collapsed roboto-regular f-size-14" onClick={_handleExtend}>
            <span className="left">{_statusMsg(status.status, userName, t)}</span> <span className="right arrow-key"> {extend ? <i className="material-icons">keyboard_arrow_up</i> : <i className="material-icons">keyboard_arrow_down</i>}</span>
          </div>
            {extend && <div className="statusAddressSection">
              <div className="row">
                <div className="col s2 roboto-medium">
                  {t('from')}:
                </div>
                <div className="col s10 roboto-regular">
                  <span className="f-size-14 light-black-fg">{from}</span><br/>
                  <span>{source && source.address}</span>
                  <div className="divider divider-margin"/>
                </div>
              </div>

              <div className="row">
                <div className="col s2 roboto-medium">
                  {t('to')}:
                </div>
                <div className="col s10 roboto-regular">
                  <span className="f-size-14 light-black-fg">{to}</span><br/>
                  <span>{destination && destination.address}</span>
                </div>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}

export default translate('translations')(Status);
