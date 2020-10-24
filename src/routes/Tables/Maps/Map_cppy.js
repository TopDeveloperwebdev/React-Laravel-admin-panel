/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';

import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";

import Autocomplete from 'react-google-autocomplete';

Geocode.setLanguage("de");
 Geocode.setRegion("de");
Geocode.setApiKey('AIzaSyDMrIaIY6QY_kiOz0VSZkN36HBd4cnfkH8');
Geocode.enableDebug();
class MapPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}


	
	render() {
	   console.log('map page');
		return (
			<div className="attachPdf">
			   <h5>map page</h5>


			</div>


		);
	}
}

export default MapPage;