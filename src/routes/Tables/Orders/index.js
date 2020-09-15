/**
 * Widget Top Sellers Ecommerce Dashboard
 */

import React from 'react'
import { Box, Grid, Button, Container, InputLabel, FormHelperText, NativeSelect, TextField, FormControl, Select } from '@material-ui/core';

import IntlMessages from 'util/IntlMessages';
import { SmallTitleBar } from 'components/GlobalComponents';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { userService } from '../../../_services';


class Orders extends React.Component {
	state = {
		data: {

			selectedMedications: [],
			pharmacy: '',
			patient: '',
			doctor: '',
			note: '',
			
			date : ''

		},
	
		medications: [],
		patients: [],
		doctors: [],
		pharmacies: []
		//medications: ['ele.services1', 'ele.services2', 'ele.services3', 'ele.services4']
	}
	onChangeBillingInformation(key, value) {
		this.setState({
			billingInformation: {
				...this.state.billingInformation,
				[key]: value
			}
		})
	}
	isFormValid() {
		// const { firstName, lastName, streetName, buildingName, zipCode, city } = this.state.billingInformation;
		// if (firstName !== '' && lastName !== '' && streetName !== '' && buildingName !== '' && zipCode !== '' && city !== '') {
		// 	return true
		// } else {
		// 	return false
		// }
	}
	onChange = (event) => {
		this.setState(prevState => {
			let data = prevState.data;
			data.selectedMedications = [...event.target.value]
			return { ...prevState, data };
		});
	}
	handleChangePharmacy = (event) => {
		this.setState(prevState => {
			let data = prevState.data;
			data.pharmacy = event.target.value;
			return { ...prevState, data };
		});
	}
	handleChangeDoctors = (event) => {
		this.setState(prevState => {
			let data = prevState.data;
			data.doctor = event.target.value;
			return { ...prevState, data };
		});
	}

	handleChangePatients = (event) => {
		this.setState(prevState => {
			let data = prevState.data;
			data.patient = event.target.value;
			return { ...prevState, data };
		});
	}
	handleChangeNote = (event) => {
		console.log('test' , event);
		// this.setState(prevState => {
		// 	let data = prevState.data;
		// 	data.note = event.target.value;
		// 	return { ...prevState, data };
		// });
	}

	componentDidMount() {
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('res', this.instance_id);
		userService.showOrders({ instance_id: this.instance_id, pagination: 1 }).then(res => {

			let medications = res.medications.map(ele => {
				return ele.medicationName;
			});
			this.setState({ medications });

			let doctors = res.family_doctors;
			let patients = res.patients;
			let pharmacies = res.pharmacies;
			this.setState({
				medications, doctors, patients, pharmacies
			})

		})

	}
	/** main function */
	render() {

		return (
			<div className="tables-wrapper search-table-wrap">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.order" />}
					center
				/>
				<Container maxWidth="lg">
					<Box pt={10} mt={10} className="checkout-tabs">
						<Grid pt={10} container spacing={3} direction="row">
							<Grid item xs={12} sm={12}>
								<InputLabel htmlFor="uncontrolled-native">Select medication</InputLabel>
								<MultiSelect
									data={this.state.medications}
									value={this.state.selectedMedications}
									onChange={this.onChange}
								/>
							</Grid>

						</Grid>

						<Grid pt={10} container spacing={3} direction="row">
							<Grid item xs={12} sm={6}>
								<InputLabel htmlFor="uncontrolled-native"> Select Patient</InputLabel>
								<Select
									native
									value={this.state.data.patient}
									onChange={this.handleChangePatients}
									inputProps={{
										name: 'age',
										id: 'age-native-simple',
									}}
									className="full-width"
								>
									<option aria-label="None" value="" />
									{
										this.state.patients.map((patient, index) => {
											return (<option key={index} value={patient.id}>{patient.firstName}</option>)
										})
									}

								</Select>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel htmlFor="uncontrolled-native">Select Family doctor</InputLabel>
								<Select
									native
									value={this.state.data.doctor}
									onChange={this.handleChangeDoctors}
									inputProps={{
										name: 'age',
										id: 'age-native-simple',
									}}
									className="full-width"
								>
									<option aria-label="None" value="" />
									{
										this.state.doctors.map((doctor, index) => {
											return (<option key={index} value={doctor.doctorName}>{doctor.doctorName}</option>)
										})
									}

								</Select>
							</Grid>
						</Grid>

						<Grid container spacing={3} direction="row">
							<Grid item xs={12} sm={6}>
								<InputLabel htmlFor="uncontrolled-native">Select Pharmacy</InputLabel>
								<Select
									native
									value={this.state.data.pharmacy}
									onChange={this.handleChangePharmacy}
									inputProps={{
										name: 'age',
										id: 'age-native-simple',
									}}
									className="full-width"
								>
									<option aria-label="None" value="" />
									{
										this.state.pharmacies.map((pharmacy, index) => {
											return (<option key={index} value={pharmacy.doctorName}>{pharmacy.pharmacyName}</option>)
										})
									}
								</Select>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									className="full-width"
									id="datetime-local"
									label="Due date"
									type="datetime-local"
									defaultValue="2017-05-24T10:30"

									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={3} direction="row">
							<Grid item xs={12} sm={12}>
								<TextField
									className="full-width"
									id="outlined-multiline-static"
									label="Add Note"
									multiline
									rows={4}
									defaultValue="Default Value"
									variant="outlined"
									// value = {this.state.data.note}
									// onChange={this.handleChangeNote}
								/>
							</Grid>

						</Grid>
						<Box mt={4}>
							<Button
								disabled={!this.isFormValid()}
								variant="contained"
								onClick={this.props.onComplete}
								color="primary"
							>
								<IntlMessages id="component.continueToPayment" />
							</Button>
						</Box>
					</Box>
				</Container>
			</div>

		);
	}
}

export default Orders;