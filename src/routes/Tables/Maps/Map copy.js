import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";


import { GoogleMapsAPI } from './client-config';


Geocode.setLanguage("de");
Geocode.setRegion("de");
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();
let darkstyle = [

	{
		"featureType": "poi.medical",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "poi.school",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "poi.sports_complex",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit.station.airport",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit.station.rail",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	}
]
let activeIcon = {icon:`http://maps.google.com/mapfiles/ms/icons/pink-dot.png` , scaledSize: 100};
let defaultIcon = {icon:`http://maps.google.com/mapfiles/ms/icons/blue-dot.png` , scaledSize: 100};

class MapPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			address: '',
			city: '',
			area: '',
			test: '',
		    state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			patientAddress: [],
			selectedPatient : '',
		}
		this.InitializePatient = this.InitializePatient.bind(this)
	

	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		this.InitializePatient(this.props.patients)
	};
	// handleChangePatient(address) {
	//    this.setState({selectedPatient : address});
	// }
	async InitializePatient(patients) {
		let self = this;
		let patientAddress = [];
		patients.map(async function (patient, index) {
			if (patient.streetNr) {
				let response = await Geocode.fromAddress(patient.streetNr);

				const { lat, lng } = response.results[0].geometry.location;
				if (lat && lng) {

					patientAddress.push({id : patient.id , lat: lat, lng: lng });
					if (patients.length - 2 < index) {
						self.setState({ patientAddress: patientAddress });
					}

				}
			}

		})


	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {

		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = addressArray.length ? this.getCity(addressArray) : '',
					area = addressArray.length ? this.getArea(addressArray) : '',
					state = addressArray.length ? this.getState(addressArray) : '';
				this.setState({
					address: (address) ? address : '',
					area: (area) ? area : '',
					city: (city) ? city : '',
					state: (state) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				})
			},
			error => {
				console.error(error);
			}
		);

	};




	render() {
		let { patientAddress } = this.state;
        console.log('props' , this.props.selectedPatient);
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap

						defaultZoom={this.props.zoom}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
						defaultOptions={{
							styles: darkstyle
						}}
					>
						{patientAddress.length > 0 && patientAddress.map((patient, index) => {
							console.log('patient.streetNr == this.props.selectedPatient ',this.props.selectedPatient  );
							return (
								<Marker
								   options={patient.id == this.props.selectedPatient ? activeIcon : defaultIcon}									   							
									key={index}
									name={'Dolores park'}
									draggable={true}
							
									position={{lat: patient.lat, lng: patient.lng}}
								/>

							)
						})
						}

					</GoogleMap>
				)
			)
		);

		return (<div>

			<AsyncMap
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDMrIaIY6QY_kiOz0VSZkN36HBd4cnfkH8&libraries=places`}
				loadingElement={
					<div style={{ height: `100%` }} />
				}
				containerElement={
					<div style={{ height: this.props.height }} />
				}
				mapElement={
					<div style={{ height: `100%` }} />
				}
			/>
		</div>)
	}
}
export default MapPage
