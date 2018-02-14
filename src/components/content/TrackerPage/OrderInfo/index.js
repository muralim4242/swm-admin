import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';
import Header from './Header';
import Rider from './Rider';
import Status from './Status';
import Details from './Details';
import FooterLogo from '../../../uiComponents/FooterLogo';
import logo2x from '../../../../assets/images/logo/logo@2x.png';

class OrderInfo extends Component {

	render() {
		let { settings, customerName, tripId, orderDetail, amount, status, source, destination, userName, userNumber, userPhotoUrl, availWidth, t, eta} = this.props;

		return (
			<div className="order-box" style={{"overflowY": availWidth >= 767 ? "auto" : "initial", "overflowX": availWidth >= 767 ? "hidden" : "initial"}}>
					<Header 
						{...settings} 
						userName={customerName} 
						tripId={tripId} 
						availWidth={availWidth} 
						t={t}/>
					<div className="order-detail-box">
						<Rider 
							userName={userName} 
							userNumber={userNumber} 
							userPhotoUrl={userPhotoUrl} 
							availWidth={availWidth} 
							t={t}/>
						<Status 
							status={status} 
							source={source} 
							destination={destination} 
							from={settings && settings.title} 
							to={customerName && customerName} 
							amount={amount} 
							clientName={settings.displayName} 
							userName={userName} 
							eta={eta}/>
						<Details 
							orderDetail={orderDetail} 
							amount={amount}
							t={t}/>
					</div>
					<FooterLogo styles={{left: (availWidth < 769 ? "50%" : availWidth > 991 ? "15%" : "20%")}} marginTop={"-6px"} label={t('poweredBy')}/>
			</div>
		);
	}
}

export default translate('translations')(OrderInfo);
