import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';
import { MapWithDirectionsRenderer } from '../../../uiComponents/maps';
import _ from 'lodash';
const moment = require('moment');

class MapsInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: null,
			destination: null,
			userLocation: null,
			eta: -1,
			tripStatus: "",
			dNearBy: false,
			enrouteOrders: null,
			showLocationTrail: false
		};
	}

	componentDidMount() {
		let { props } = this;
		this.initializeMap(props);
	}

	initializeMap(props) {
		if(props.source && props.destination && props.userLocation) {
			this.setState({
				source: props.source,
				destination: props.destination,
				userLocation: props.userLocation,
				eta: props.eta ? moment(props.eta).valueOf() - new Date().getTime() : -1,
				showLocationTrail: props.showLocationTrail || false,
				tripStatus: props.status.status,
				dNearBy: props.enrouteOrders && props.enrouteOrders.length,
				enrouteOrders: props.enrouteOrders
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!_.isEqual(this.props, nextProps)) {
			this.initializeMap(nextProps);
		}
	}

	render() {
		const { source, destination, userLocation, enrouteOrders, eta, tripStatus, dNearBy, showLocationTrail } = this.state;
		const { refresh, t, availWidth } = this.props;
		return (
			<div className="map-box">
				<a className="refresh-btn btn-floating btn-large waves-effect waves-light lightBlack" href="javascript:void(0)" onClick={refresh}>
					<i className="material-icons">refresh</i>
				</a>
				<MapWithDirectionsRenderer 
					availWidth={availWidth}
					source={source} 
					destination={destination} 
					userLocation={userLocation} 
					showLocationTrail={showLocationTrail} 
					yetToStartLabel={t('trackingYetToStart')} 
					eta={eta}
					tripStatus={tripStatus}
					dNearBy={dNearBy}
					enrouteOrders={enrouteOrders}
					dNearByLabel={t('deliveringOrdersNearBy')}/>
			</div>
		);
	}
}

export default translate('translations')(MapsInfo);
