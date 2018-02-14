import React from "react";
import './index.css';

const Details = ({orderDetail, amount, t}) => {
  let {lineItems}=orderDetail;
  let gst=12;
  return (
    <div className="card">
      <div className="card-content order-details-content">
          <div className="row marginBottomZero">
            <div className="col s12">
              <div className="left roboto-medium">{t('orderDetails')}</div>
              <div className="right roboto-regular opacity-7">{lineItems && `${lineItems.length} ${t("items")}` }</div>
            </div>
          </div>

          <div className="divider"/>
          {
            lineItems && lineItems.map((item,index)=>{
              return (
                <div key={index}>
                  <div className="row marginBottomZero roboto-regular">
                    <div className="col s12 opacity-7">
                      <span className="left">{`${item.name} ${item.quantity && "x "+ item.quantity}`}</span>
                      <span className="right">&#x20b9;{`${item.price && parseFloat(item.price.amount).toFixed(2)}`}</span>{/*${item.price && item.price.currency}*/}
                    </div>
                  </div>
                  <div className="divider"/>
                </div>
              )
            })
          }


          <div className="row marginBottomZero roboto-regular">
            <div className="col s12 opacity-7">
              <span className="left">{t('netAmount')}</span>
              <span className="right">&#x20b9;{`${amount.amount && parseFloat(amount.amount.amount).toFixed(2)}`}</span>{/*${amount.amount && amount.amount.currency}*/}
            </div>
          </div>
          <div className="divider"/>
          <div className="row marginBottomZero roboto-regular">
            <div className="col s12 opacity-7">
              <span className="left">{`${t('gst')} (${gst}% rate)`}</span>
              <span className="right">&#x20b9;{`${amount.amount && ((parseFloat(amount.amount.amount)*gst)/100).toFixed(2)}`}</span>{/*${amount.amount && amount.amount.currency}*/}
            </div>
          </div>
          <div className="divider"/>
          <div className="row marginBottomZero roboto-medium">
            <div className="col s12">
              <span className="left">{t("totalAmount")}</span>
              <span className="right f-size-16">&#x20b9;{`${amount.amount && (parseFloat(amount.amount.amount)+((parseFloat(amount.amount.amount)*gst)/100)).toFixed(2)}`}</span>{/*${amount.amount && amount.amount.currency}*/}
            </div>
          </div>


      </div>
    </div>
  );
};

export default Details;
