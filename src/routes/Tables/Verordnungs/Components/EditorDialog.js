/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Grid, Button, Box, Typography, Input, InputAdornment, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';
import { Link } from 'react-router-dom';
// import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
class EditorDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		instance: null,
		userInstance_id: 0,
		title: '',
		content: '',
		contentHeight: 0,
		contentWidth: 0,
		isEdit: false,
		id: null,
		isDownload: false,
		patientsList: [],
		selectedPatients: [],
		patients: [],
		doctorList: [],
		services: [],
		newData: {
			service: '',
			comment: '',
			tgl: '',
			wtl: ''
		},
		document: {
			instanceInfo: {},
			doctorInfo: { doctorName: '' },
			patientInfo: {},
			selectedServices: []
		},
		type: {
			type1: false,
			type2: false,
			type3: false
		},
		from: new Date(),
		to: new Date(),
		selectedPatient: null

	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true });
	};

	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false, title: '', content: '', isEdit: false });
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false, title: '', content: '', isEdit: false });
	};
	onSubmit() {
		let content;
		content = JSON.stringify(this.state.document);
		let patient = this.state.document.patientInfo.firstName + ' ' + this.state.document.patientInfo.lastName;
		let from = this.state.from;
		let to = this.state.to;
		let type = {
			type1: false,
			type2: false,
			type3: false
		}
		if (this.state.type) type = this.state.type;

		this.props.onConfirm({ content: content, patient: patient, from: from.toISOString(), to: to.toISOString(), type: JSON.stringify(type) });
		this.setState({ open: false, isEdit: false });
	}
	onUpdate() {
		let content;
		content = JSON.stringify(this.state.document);
		let patient = this.state.document.patientInfo.firstName + ' ' + this.state.document.patientInfo.lastName;
		let from = this.state.from;
		let to = this.state.to;
		let type = {
			type1: false,
			type2: false,
			type3: false
		}
		if (this.state.type) type = this.state.type;
		this.props.onUpdate({ id: this.state.id, content: content, patient: patient, from: from.toISOString(), to: to.toISOString(), type: JSON.stringify(type) });
		this.setState({ open: false, isEdit: false });

	}
	onChange(content) {
		let contentHeight = document.getElementById('editArea').clientHeight;
		let contentWidth = document.getElementById('editArea').clientWidth;

		this.setState({ content: content, contentHeight: contentHeight, contentWidth: contentWidth });
	}

	titleChanged(e) {
		this.setState({ title: e.target.value });
	}
	onInit = (note) => {
		note.reset()
		const regex = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/i
		if (this.state.content.match(regex) !== null) {
			note.replace(this.state.content)
		} else {
			note.insertText(this.state.content)
		}
	}
	onInputchange(event) {

		console.log('event.target', event.target.name);
		let name = event.target.name;
		this.setState(prevState => {
			const type = { ...prevState.type };
			type[name] = type[name] ? false : true;
			return { ...prevState, type };
		});
	}

	onChangePatient = (event, patient) => {

		if (patient) {
			let name = patient.firstName + ' ' + patient.lastName;
			let relatedDoctor = {};
			relatedDoctor = this.state.doctorList.find(ele => ele.doctorName == patient.familyDoctor);

			this.setState(prevState => {
				let document = { ...prevState.document };
				document.patientInfo = patient;
				document.doctorInfo = relatedDoctor;
				console.log('document', document);
				return { ...prevState, document, selectedPatient: patient };
			});
		}

	}
	onChangeService = (event, service) => {
		if (service) {
			this.setState(prevState => {
				let newData = { ...prevState.newData };
				newData.service = service.services;
				return { ...prevState, newData };
			});
		}

	}
	onChangeComment = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState(prevState => {
			let newData = { ...prevState.newData };
			newData[name] = value;
			return { ...prevState, newData };
		});

	}
	addService = (event) => {
		this.setState(prevState => {
			let document = { ...prevState.document };
			document.selectedServices.push(this.state.newData)
			return { ...prevState, document };
		});

	}
	formate_date(dateString) {
		let date;
		if (dateString) {
			let str = dateString.split(" ");
			date = str[0].split('-');
			date = date[2] + '.' + date[1] + '.' + date[0];
		}

		return date;
	}

	formate_dateT(dateString) {
		let data = '00.00.0000';
		if (dateString) {
			dateString = dateString.toISOString();
			let date = dateString.split('T');
			if (date.length > 1) {
				data = date[0].split('-');
				data = data[2] + '.' + data[1] + '.' + data[0];
			}

		}

		return data;
	}
	handleFromChange = (date) => {
		this.setState({ from: date })
	}
	handleToChange = (date) => {
		this.setState({ to: date })
	}
	render() {
		//const { folders, classes } = this.props;
		const { document: { instanceInfo, doctorInfo, patientInfo, selectedServices }, patientsList, services, type } = this.state;
		console.log('instanceInfotype000', patientInfo);
		const patientsProps = {
			options: patientsList,
			getOptionLabel: (option) => option.firstName + ' ' + option.lastName,
		};
		const servicesProps = {
			options: services,
			getOptionLabel: (option) => option.services,
		};

		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
			>
				<DialogContent className="p-10">
					<Box className="text-editor" id="editArea">
						<Box mb="1" className="logo">
							<img src={instanceInfo.instanceLogo} width="35" />
						</Box>
						<Typography><strong>{instanceInfo.instanceName} | {instanceInfo.streetNr} | {instanceInfo.zipCode} {instanceInfo.city}</strong></Typography>
						<Grid container className="justify-between">
							<Grid item sm={7} md={7} lg={7}>
								<Box pt={1}>

									<Typography><strong>{doctorInfo.doctorName}</strong></Typography>
									<Typography>{doctorInfo.streetNr}</Typography>
									<Typography>{doctorInfo.zipcode} {doctorInfo.city}</Typography>

								</Box>
							</Grid>
							<Grid item sm={3} md={3} lg={3}>
								<Box pt={1}>
									<Typography>{instanceInfo.instanceName}</Typography>
									<Typography>{instanceInfo.streetNr}</Typography>
									<Typography>{instanceInfo.zip} {instanceInfo.city}</Typography>
								</Box>
							</Grid>

						</Grid>
						<Grid container className="justify-between">
							<Grid item sm={7} md={7} lg={7}>
								<Box pt={1}>
									<Typography><strong>Fax: {doctorInfo.fax}</strong></Typography>
								</Box>
							</Grid>
							<Grid item sm={3} md={3} lg={3}>
								<Box pt={1}>
									<Typography><strong>Tel.:  {instanceInfo.phone}</strong></Typography>
									<Typography><strong>Fax:  {instanceInfo.fax}</strong></Typography>
									<Typography><strong>E-Mail:  {instanceInfo.email}</strong></Typography>
								</Box>
							</Grid>

						</Grid>


						<Grid container className="justify-between">
							<Grid item sm={7} md={7} lg={7}>
								<Box>

									<Autocomplete
										{...patientsProps}
										id="auto-complete"
										autoComplete
										includeInputInList
										value={this.state.selectedPatient}

										onChange={this.onChangePatient}
										renderInput={(params) => <TextField
											id="input-with-icon-textfield"
											label="Patienten suchen"
											{...params}
											margin="normal"

										/>}
									/>

								</Box>
							</Grid>
							<Grid item sm={3} md={3} lg={3}>
								<Box>
									<Typography>{this.formate_dateT(new Date())}</Typography>
								</Box>
							</Grid>

						</Grid>
						<Box pt={10} >
							<Grid container sm={12} md={12} lg={12} className="justify-between checkboxs">
								<Grid item xs={12} sm={12} md={2} lg={2}>
									<h5 className="title-h5"><strong>Anforderung</strong></h5>
								</Grid>
								<Grid item xs={12} sm={12} md={3} lg={3} className="justify-center">
									<label className="checkboxContainer" >
										<input type="checkbox" name="type1" value="Erstverordnung" checked={type.type1} onChange={this.onInputchange.bind(this)} />
										<span className="checkmark"></span>
									</label>
									<h5><strong>Erstverordnung</strong></h5>

								</Grid>
								<Grid item sm={12} md={3} lg={3} className="justify-center">
									<label className="checkboxContainer">
										<input type="checkbox" name="type2" value="Folgeverordnung" checked={type.type2} onChange={this.onInputchange.bind(this)} />
										<span className="checkmark"></span>
									</label>
									<h5><strong>Folgeverordnung</strong></h5>

								</Grid>
								<Grid item sm={12} md={3} lg={3} className="justify-center">
									<label className="checkboxContainer">
										<input type="checkbox" name="type3" checked={this.state.type3} checked={type.type3} onChange={this.onInputchange.bind(this)} />
										<span className="checkmark"></span>
									</label>
									<h5><strong>Medikamentenplan</strong></h5>

								</Grid>


							</Grid>

						</Box>
						<Box pt={1} >
							<Grid container sm={12} md={12} lg={12} className="datecontainer">
								<h6>Zeitraum:</h6>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid mr={3} item sm={4} md={4} lg={4} className="justify-around">
										<Typography>von:</Typography>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="dd.MM.yyyy"
											margin="normal"
											id="date-picker-inline"
											value={this.state.from}
											name='from'
											onChange={this.handleFromChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid ml={2} item sm={4} md={4} lg={4} className="justify-around">
										<Typography>bis:</Typography>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="dd.MM.yyyy"
											margin="normal"
											name='to'
											value={this.state.to}
											onChange={this.handleToChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
								</MuiPickersUtilsProvider>


							</Grid>

						</Box>
						<Box pt={1} >
							<Box>
								{patientInfo.firstName} {patientInfo.lastName} , geb. am cbirthday {this.formate_date(patientInfo.birthday)}
							</Box>
							<Box>
								Versicherung:  {patientInfo.insurance} , Versichertennummer:  {patientInfo.insuranceNr}.
							</Box>
						</Box>
						<Box pt={5} >
							<Box className="tableContainer" >
								<Typography>Sehr geehrte Damen und Herren,</Typography>
							</Box>
							<Box className="tableContainer" pt={2}>
								<Typography>für die Durchführung von behandlungspflegerischen Maßnahmen benötigen wir eine Verordnung für folgende Leistungen: </Typography>
							</Box>

							<Box className="tableContainer" pt={2} pb={2}>
								<table>

									<tbody>
										<tr className="thead">
											<th colSpan="1">
												Leistung
										</th>
											<th colSpan="2">
												Häufigkeit
										</th>
										</tr>
										{selectedServices.length ? selectedServices.map((elemnet, index) => (
											<tr key={index}>
												<td className="detail">
													<h6><strong>{elemnet.service}</strong></h6>
													<Box>
														{elemnet.comment}
													</Box>
												</td>
												<td>
													{elemnet.tgl}x tgl.


												</td>
												<td>
													{elemnet.wtl}x wtl.
												</td>
											</tr>
										))
											: null

										}


										<tr className="EditRow">
											<td>
												<Grid container>
													<Grid item sm={12} md={4} lg={4} >
														<Autocomplete
															{...servicesProps}
															id="auto-complete"
															autoComplete
															includeInputInList
															onChange={this.onChangeService}
															renderInput={(params) => <TextField
																id="input-with-icon-textfield"
																label="Leistung"
																{...params}
																margin="normal"

															/>}

														/>
													</Grid>
													<Grid item sm={12} md={7} lg={7} >
														<Box ml={2}>
															<TextField
																id="input-with-icon-textfield"
																label="Kommentar"
																margin="normal"
																name="comment"
																onChange={this.onChangeComment}
															/>
														</Box>

													</Grid>


												</Grid>



											</td>
											<td className="box2">

												<div >
													<Grid container spacing={1} alignItems="flex-end">

														<Grid item sm={6} md={6} lg={6}>
															<TextField id="input-with-icon-grid" name="tgl" onChange={this.onChangeComment} />
														</Grid>
														<Grid item sm={6} md={6} lg={6}>
															x tgl.
														</Grid>
													</Grid>
												</div>
											</td>
											<td className="box2">
												<div >
													<Grid container spacing={1} alignItems="flex-end">

														<Grid item sm={6} md={6} lg={6}>
															<TextField id="input-with-icon-grid" name="wtl" onChange={this.onChangeComment} />
														</Grid>
														<Grid item sm={6} md={6} lg={6}>
															x wtl.
														</Grid>
													</Grid>
												</div>
											</td>

										</tr>

									</tbody>
								</table>

							</Box>
							<Box textAlign="center">
								<Button variant="contained" color="primary" onClick={this.addService} >
									Meue Leistung
								</Button>


							</Box>
						</Box>
						<Box pt={5}>
							<Box>Bitte senden Sie uns die Verordung vor ab per Fax an: {instanceInfo.fax}</Box>
							<Box pt={2}>
								Wir danken Ihnen recht herzlich für Ihre Mühe und stehen Ihnen als zuverlassiger und professioneller
								Versorger jederzeit gerne zur Seite.
								</Box>
							<Box pt={2}> 	Mit freundlichen Grüßen
								</Box>
							<Box>
								Ihr {instanceInfo.instanceName}  Team
								</Box>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions className="px-20 pb-20 justify-content-center">
					{
						!this.state.isDownload && <Box mb={2} width="100%" display="flex" justifyContent="center" p={1} >
							{!this.state.isEdit && <Box mx={2}>
								<Button variant="contained" color="primary" onClick={() => this.onSubmit(true)}>
									Submit
								</Button>
							</Box>
							}
							{this.state.isEdit && <Box mx={2}>
								<Button variant="contained" color="primary" onClick={() => this.onUpdate(true)}>
									Update
								</Button>
							</Box>
							}
							<Button variant="contained" color="secondary" onClick={() => this.onCloseDialog(false)} >
								No
							</Button>
						</Box>
					}


				</DialogActions>

			</Dialog>
		);
	}
}

export default EditorDialog;