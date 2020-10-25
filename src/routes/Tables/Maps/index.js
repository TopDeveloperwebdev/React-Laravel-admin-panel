/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { userService } from '../../../_services';
import MapPage from './Map';
import { CustomCard } from 'components/GlobalComponents';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Row from './Components/Row';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';

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
let activeIcon = { icon: `http://maps.google.com/mapfiles/ms/icons/pink-dot.png`, scaledSize: 100 };
let defaultIcon = { icon: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`, scaledSize: 100 };

class Maps extends Component {
	constructor(props) {
		super(props)
		this.state = {

			data: [],
			openData: {},
			address: '',
			city: '',
			area: '',
			test: '',
			state: '',
			mapPosition: {
				lat: 51.2235516,
				lng: 6.6673354
			},
			markerPosition: {
				lat: 51.2235516,
				lng: 6.6673354
			},

			patients: [],
			patientAddress: [],
			selectedPatient: '',

		};
		this.mapPage = React.createRef();
		this.Row = React.createRef();
		this.handleClick = this.handleClick.bind(this)

	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.getPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			const data = res;
			this.setState({ data });
			this.InitializePatient(data);
		});
	}
	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = (place) => {
		console.log('plc', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: (address) ? address : '',
			area: (area) ? area : '',
			city: (city) ? city : '',
			state: (state) ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};

	handleClick = (id) => {
		this.setState({ selectedPatient: id });
	}


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



	async InitializePatient(patients) {
		let self = this;
		let patientAddress = [];
		patients.map(async function (patient, index) {
			if (patient.streetNr) {
				let response = await Geocode.fromAddress(patient.streetNr);

				const { lat, lng } = response.results[0].geometry.location;
				if (lat && lng) {

					patientAddress.push({ id: patient.id, lat: lat, lng: lng });
					if (patients.length - 2 < index) {
						self.setState({ patientAddress: patientAddress });
					}

				}
			}

		})
	}
	render() {
		const { data, selectedPatient, patientAddress } = this.state;
		console.log('this.state', this.state);
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<>
						{/* <div className="mapContainer">
							<div className="patientsContainer">
								<CustomCard>
									<Autocomplete
										style={{
											width: '100%',
											height: '40px',
											paddingLeft: '16px',
											marginTop: '2px',
											marginBottom: '10px'
										}}
										onPlaceSelected={this.onPlaceSelected}
										types={['(regions)']}
										componentRestrictions={{ country: "de" }}
									/>
									<div className="content">
										<h6>Patient</h6>
										<div>
											<Table aria-label="collapsible table">
												<TableBody>
													{
														this.state.data.length > 0 && this.state.data.map((element, index) => (
															<Row ref={this.Row} key={index} row={element} OnRowclick={this.handleClick} />
														))}
												</TableBody>
											</Table>
										</div>

									</div>

								</CustomCard>
							</div>
							{/* <div className="mapSection">
								{data && data.length > 0 &&
									
								}
							</div> */}
						{/* 
						</div>  */}
						{data && data.length > 0 && <GoogleMap
							
							defaultZoom={12}
							defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
							defaultOptions={{
								styles: darkstyle
							}}
						>
							{
								console.log('data', data)
							}
							{/* {patientAddress.length > 0 && patientAddress.map((patient, index) => {
								console.log('patient.streetNr == this.props.selectedPatient ', selectedPatient);
								return (
									<Marker
										options={patient.id == selectedPatient ? activeIcon : defaultIcon}
										key={index}
										name={'Dolores park'}
										draggable={true}
										onDragEnd={this.onMarkerDragEnd}
										position={{ lat: patient.lat, lng: patient.lng }}
									/>

								)
								})
								}

								<InfoWindow
								onClose={this.onInfoWindowClose}
								position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
								>
								<div>
									<span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
								</div>
								</InfoWindow>
								<Marker
								name={'Dolores park'}
								draggable={true}
								onDragEnd={this.onMarkerDragEnd}
								position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
								/> */}

						</GoogleMap>

						}

					</>
				)
			)
		);

		return (
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
		);
	}
}
export default Maps;


