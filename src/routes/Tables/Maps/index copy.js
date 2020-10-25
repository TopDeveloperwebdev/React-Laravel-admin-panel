/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { userService } from '../../../_services';
import MapPage from './Map';
import { CustomCard } from 'components/GlobalComponents';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Row from './Components/Row';

// function Row(props) {
// 	const { row } = props;
// 	const [open, setOpen] = React.useState(false);


// 	return (
// 		<React.Fragment>
// 			<TableRow >
// 				<TableCell align="left">{row.firstName + ' ' + row.lastName}</TableCell>
// 				<TableCell align="left">{row.phone1}</TableCell>
// 				<TableCell align="right">
// 					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
// 						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 					</IconButton>
// 				</TableCell>
// 			</TableRow>
// 			{open ? <TableRow>
// 				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
// 					<Collapse in={open} timeout="auto" unmountOnExit>
// 						<Box margin={1}>
// 							<Typography gutterBottom component="div">
// 							{row.streetNr}
// 							</Typography>
// 							<Typography gutterBottom component="div">
// 							{row.zipCode}
// 							</Typography>
// 							<Typography gutterBottom component="div">
// 							{row.city}
// 							</Typography>						
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow> : ''}

// 		</React.Fragment>
// 	);
// }

class Maps extends Component {
	constructor(props) {
		super(props)
		this.state = {

			data: [],
			openData: {},
			patients: [],
			selectedPatient : ''


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
			city = this.mapPage.current.getCity(addressArray),
			area = this.mapPage.current.getArea(addressArray),
			state = this.mapPage.current.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.mapPage.current.setState({
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
		this.setState({selectedPatient : id});	
	}
	render() {
		const { data ,selectedPatient } = this.state;
		
		return (
			<div className="mapContainer">
				<div className="patientsContainer">
					<CustomCard>
						{/* <Autocomplete
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
						/> */}
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
				{data && data.length > 0 &&
					<MapPage
					google={ this.props.google }
						center={{ lat: 51.2235516, lng: 6.6673354}}
						height='90vh'
						zoom={12}
						ref={this.mapPage}
						patients={data}
						selectedPatient={selectedPatient}
					/>}
			</div>
		);
	}
}
export default Maps;


