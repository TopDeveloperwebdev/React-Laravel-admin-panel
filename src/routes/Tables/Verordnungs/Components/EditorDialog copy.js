/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Grid, Button, Box, Typography, Dialog, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../../_services';
import { Link } from 'react-router-dom';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';

class EditorDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		open: false,
		instance: null,
		userInstance_id: null,
		title: '',
		content: '',
		contentHeight: 0,
		contentWidth: 0,
		isEdit: false,
		id: null,
		isDownload: false,
		patientsList: [],
		selectedPatients: [],
		instanceName: '',
		phone: '',
		fax: '',
		doctorList: []

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
		content = JSON.stringify(this.state);
		let from = this.state.input16 + this.state.input17 + '.' + this.state.input18 + this.state.input19 + '.' + this.state.input20 + this.state.input21;
		let to = this.state.input22 + this.state.input23 + '.' + this.state.input24 + this.state.input25 + '.' + this.state.input26 + this.state.input27;
		if (from.length > 8) from = 0;
		if (to.length > 8) to = 0;
		let type = "Erstverordnung";
		if (this.state.input7) type = this.state.input7;

		this.props.onConfirm({ content: content, patient: this.state.patient, from: from, to: to, type: type });
		this.setState({ open: false });
	}
	onUpdate() {
		let content;
		content = JSON.stringify(this.state);
		let from = this.state.input16 + this.state.input17 + '.' + this.state.input18 + this.state.input19 + '.' + this.state.input20 + this.state.input21;
		let to = this.state.input22 + this.state.input23 + '.' + this.state.input24 + this.state.input25 + '.' + this.state.input26 + this.state.input27;
		if (from.length > 8) from = 0;
		if (to.length > 8) to = 0;
		let type = "Erstverordnung";
		if (this.state.input7) type = this.state.input7;

		this.props.onUpdate({ id: this.state.id, content: content, patient: this.state.patient, from: from, to: to, type: type });
		this.setState({ open: false });

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
		value = (this.state[event.target.name] ? false : true);
		this.setState({
			[event.target.name]: value
		});
	}
	onChangePatient = (event) => {
		let patient = {};
		let selectedPatients = [];
		selectedPatients = this.state.patientsList.filter(ele => {
			let fullname = (ele.firstName + ' ' + ele.lastName).toLowerCase();
			let keyname = (event.target.value).toLowerCase();
			return (fullname.indexOf(keyname) > -1 || event.target.value == '')
		});
		patient = this.state.patientsList.find(ele => (ele.firstName + ' ' + ele.lastName) == event.target.value);
		this.setState({ selectedPatients: selectedPatients, patient: event.target.value });
		if (patient) {
			let name = patient.firstName + ' ' + patient.lastName;
			if (name == event.target.value) {
				let relatedDoctor = {};
				relatedDoctor = this.state.doctorList.find(ele => ele.doctorName == patient.familyDoctor);
				this.setState({
					['patient']: name,
					['status']: patient.state,
					['insurance']: patient.insurance,
					['insuranceNr']: patient.insuranceNr,
					['streetNr']: patient.streetNr,
					['zipCity']: patient.zipCode + patient.city,
					['birthday']: this.formate_date(patient.birthday),
					['familyDoctor']: patient.familyDoctor,
					['doctorName']: relatedDoctor.doctorName,
					['doctorstreetNr']: relatedDoctor.streetNr,
					['doctorzipCity']: relatedDoctor.zipcode + relatedDoctor.city,
					['doctorphone']: relatedDoctor.phone,
					['doctorfax']: relatedDoctor.fax
				});
			}
		}


		// patient = this.state.patientsList.find(ele => (ele.firstName + ' ' + ele.lastName)  == event.target.value);
		// let relatedDoctor = {};

		// if (patient) {		
		// 	relatedDoctor = this.state.doctorList.find(ele => ele.doctorName == patient.familyDoctor);
		// 	let name = patient.firstName + ' ' + patient.lastName;
		// 	this.setState({
		// 		['patient']: name,
		// 		['status']: patient.state,
		// 		['insurance']: patient.insurance,
		// 		['insuranceNr']: patient.insuranceNr,
		// 		['streetNr']: patient.streetNr,
		// 		['zipCity']: patient.zipCode + patient.city,
		// 		['birthday']: this.formate_date(patient.birthday),
		// 		['familyDoctor']: patient.familyDoctor,
		// 		['doctorName']: relatedDoctor.doctorName,
		// 		['doctorstreetNr']: relatedDoctor.streetNr,
		// 		['doctorzipCity']: relatedDoctor.zipcode + relatedDoctor.city,
		// 		['doctorphone']: relatedDoctor.phone,
		// 		['doctorfax']: relatedDoctor.fax
		// 	});
		// }
		// else {
		// 	this.setState({
		// 		['patient']: event.target.value
		// 	})

		// }


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
	render() {
		console.log('this.state.instance----', this.state.instanceData);
		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
			>
				<DialogContent className="p-10">
					<Box className="text-editor" id="editArea">
						<Grid className="justify-around">
							<Grid xs={12} sm={12} md={5} lg={5} className="insurance">
								<table>
									<tbody>
										<tr>
											<td colSpan="3">
												<label>Krankenkasse bzw. kostenträger</label>
												<input type="text" name="textarea1" value={this.state.insurance} onChange={this.onInputchange.bind(this)} />
											</td>
										</tr>
										<tr>
											<td colSpan="3">
												<label>Name, Vorname des Versicherten</label>
												<Box className="justify-between">
													<AutoComplete data={this.state.selectedPatients.map(ele => ele.firstName + ' ' + ele.lastName)} value={this.state.patient} placeholder="Select Patient" onChange={this.onChangePatient} />
													<label className="date-label">geb . am</label>
												</Box>

												<Grid className="justify-between">
													<Grid sm={5} md={5} lg={5}>
														<input type="text" name="streetNr" value={this.state.streetNr} readOnly />
														<input type="text" name="zipCity" value={this.state.zipCity} readOnly />
													</Grid>
													<Grid sm={5} md={5} lg={5}>
														<input type="text" name="date" value={this.state.birthday} readOnly />

													</Grid>
												</Grid>
											</td>
										</tr>
										<tr>
											<td>
												<label>Kostenträgerkennung </label>
												<input type="text" name="input1" value={this.state.input1} onChange={this.onInputchange.bind(this)} /></td>
											<td>
												<label>Versicherten-Nr</label>
												<input type="text" name="insuranceNr" value={this.state.insuranceNr} readOnly /></td>
											<td>
												<label>Status</label>
												<input type="text" name="status" value={this.state.status} readOnly /></td>
										</tr>
										<tr>
											<td>
												<label>Betriebsstatten-Nr</label>
												<input type="text" name="input4" value={this.state.input4} onChange={this.onInputchange.bind(this)} /></td>
											<td>
												<label>Arzt-Nr</label>
												<input type="text" name="input5" value={this.state.input5} onChange={this.onInputchange.bind(this)} />
											</td>
											<td>
												<label>Datum</label>
												<input type="text" name="input6" value={this.state.input6} onChange={this.onInputchange.bind(this)} />
											</td>
										</tr>

									</tbody>
								</table>
								<Box mt={2} className="justify-around">
									<label className="checkboxContainer"> Erstverordnung
										<input type="radio" name="input7" value="Erstverordnung" onChange={this.onInputchange.bind(this)} />
										<span className="checkmark"></span>
									</label>
									<label className="checkboxContainer"> Folgeverordnung
										<input type="radio" name="input7" value="Folgeverordnung" onChange={this.onInputchange.bind(this)} />
										<span className="checkmark"></span>
									</label>

								</Box>
							</Grid>
							<Grid sm={12} md={6} lg={6} className="diagnostics">
								<h3>Verordnung häuslicher krankenpflege</h3>
								<Typography>{this.state.instanceName}</Typography>
								<Typography>Tel :   {this.state.instanceName}</Typography>
								<Typography><strong>Fax :  {this.state.instanceName}</strong></Typography>
								<label className="label-1">Einschränkungen, die häusliche krankenpflege erforderlich machen</label>
								<label className="label-2">(Vgl. auch Leistungsverzeichnis HKP-Richtlinie)</label>
								<div className="flex-column">
									<input type="text" name="input13" value={this.state.input13} onChange={this.onInputchange.bind(this)} />
									<input type="text" name="input14" value={this.state.input14} onChange={this.onInputchange.bind(this)} />
									<input type="text" name="input15" value={this.state.input15} onChange={this.onInputchange.bind(this)} />
								</div>
								<Box mt={10} className="dateContainer">
									<Box>
										<Box mr={1}>vom</Box>
										<Box>
											<input type="number" placeholder="T" name="input16" value={this.state.input16} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="T" name="input17" value={this.state.input17} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="M" name="input18" value={this.state.input18} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="M" name="input19" value={this.state.input19} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="J" name="input20" value={this.state.input20} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="J" name="input21" value={this.state.input21} onChange={this.onInputchange.bind(this)} />
										</Box>
									</Box>
									<Box>
										<Box mr={1}>bis</Box>
										<Box>
											<input type="number" placeholder="T" name="input22" value={this.state.input22} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="T" name="input23" value={this.state.input23} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="M" name="input24" value={this.state.input24} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="M" name="input25" value={this.state.input25} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="J" name="input26" value={this.state.input26} onChange={this.onInputchange.bind(this)} />
											<input type="number" placeholder="J" name="input27" value={this.state.input27} onChange={this.onInputchange.bind(this)} />
										</Box>
									</Box>

								</Box>
							</Grid>

						</Grid>
						<Grid className="main">
							<h5>Behandlungspflege</h5>
							<Grid className="justify-around">
								<Grid sm={12} md={8} lg={8}>
									<Box className="flex-column">
										<input type="text" name="input28" value={this.state.input28} onChange={this.onInputchange.bind(this)} />
										<input type="text" name="input29" value={this.state.input29} onChange={this.onInputchange.bind(this)} />
										<input type="text" name="input30" value={this.state.input30} onChange={this.onInputchange.bind(this)} />
									</Box>
									<Box>
										<label className="checkboxContainer"> Herrichten der Medikamentenbox
										<input type="checkbox" name="input31" checked={this.state.input31} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
									</Box>
									<Box>
										<label className="checkboxContainer"> Medikamentengabe
										<input type="checkbox" name="input32" checked={this.state.input32} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
									</Box>
									<Box className="justify-around">
										<label className="checkboxContainer"> Injektionen
										<input type="checkbox" name="injektionen" checked={this.state.injektionen} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
										<label className="checkboxContainer">herrichten
										<input type="checkbox" name="input33" checked={this.state.input33} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
										<label className="checkboxContainer"> Intramuskular
										<input type="checkbox" name="input34" checked={this.state.input34} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
										<label className="checkboxContainer"> Subkutan
										<input type="checkbox" name="input35" checked={this.state.input35} onChange={this.onInputchange.bind(this)} />
											<span className="checkmark"></span>
										</label>
									</Box>
									<Box>
										<h6>Blutzuckermessung</h6>
										<Box className="justify-around">
											<label className="checkboxContainer"> Erst- order Meueinstellung<br></br>
(max. 4 Wochen und max. 3x taglisch)
										<input type="checkbox" name="input36" checked={this.state.input36} onChange={this.onInputchange.bind(this)} />
												<span className="checkmark"></span>
											</label>
											<label className="checkboxContainer"> Bei intensivierter Insulintherapie
										<input type="checkbox" name="input37" checked={this.state.input37} onChange={this.onInputchange.bind(this)} />
												<span className="checkmark"></span>
											</label>
										</Box>
									</Box>
									<Box>
										<Grid className="justify-around">
											<Grid sm={6} md={6} lg={6}>
												<h6>Kompressionsbehandlung anzilhen</h6>
											</Grid>
											<Grid sm={6} md={6} lg={6} className="justify-around">
												<Grid sm={4}>
													<label className="checkboxContainer">rechts
										<input type="checkbox" name="input38" checked={this.state.input38} onChange={this.onInputchange.bind(this)} />
														<span className="checkmark"></span>
													</label>
												</Grid>
												<Grid sm={4} >
													<label className="checkboxContainer"> links
										<input type="checkbox" name="input39" checked={this.state.input39} onChange={this.onInputchange.bind(this)} />
														<span className="checkmark"></span>
													</label>
												</Grid>
												<Grid sm={4} ><label className="checkboxContainer">  beidseits
										<input type="checkbox" name="input40" checked={this.state.input40} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
												</label>
												</Grid>
											</Grid>
										</Grid>

										<Grid className="justify-around">
											<Grid sm={6} md={6} lg={6}>
												<label className="checkboxContainer">Kompressionsstrümpfe anziehen
										<input type="checkbox" name="input41" checked={this.state.input41} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
												</label>
											</Grid>
											<Grid sm={6} md={6} lg={6}>
												<label className="checkboxContainer">Kompressionsverbände anlegen
										<input type="checkbox" name="input42" checked={this.state.input42} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
												</label>
											</Grid>
										</Grid>
										<Grid className="justify-around">
											<Grid sm={6} md={6} lg={6}>
												<label className="checkboxContainer">
													Kompressionsstrümpfe ausziehen
										<input type="checkbox" name="input43" checked={this.state.input43} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
												</label>
											</Grid>
											<Grid sm={6} md={6} lg={6}>
												<label className="checkboxContainer">Kompressionsverbände abnehmen
										<input type="checkbox" name="input44" checked={this.state.input44} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
												</label>
											</Grid>
										</Grid>

										<Grid className="justify-around">
											<Grid sm={7} md={7} lg={7}>
												Stutzende und sratabilisierende VerBande, Art
											</Grid>
											<Grid sm={4} md={4} lg={4}>
												<input type="text" name="input45" value={this.state.input45} onChange={this.onInputchange.bind(this)} />
											</Grid>
										</Grid>
										<Grid className="justify-around">
											<Grid sm={4} md={4} lg={4}>
												<h6>Wundversorgung</h6>
											</Grid>
											<Grid sm={7} md={7} lg={7}>
												<input type="text" name="input46" value={this.state.input46} onChange={this.onInputchange.bind(this)} />
											</Grid>
										</Grid>
										<Grid >

											<input type="text" name="input47" value={this.state.input47} onChange={this.onInputchange.bind(this)} />
										</Grid>
										<Grid className="justify-around" >
											<Grid sm={3} md={3} lg={3} className="marginAuto">
												<label className="checkboxContainer">
													<input type="checkbox" name="input48" checked={this.state.input48} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
														DeKubitusbehandlung
													</label>
											</Grid>
											<Grid sm={3} md={3} lg={3} className="marginAuto">
												<label>Lokalisation</label>
												<input type="text" name="input49" value={this.state.input49} onChange={this.onInputchange.bind(this)} />
											</Grid>
											<Grid sm={2} md={2} lg={2} className="marginAuto">
												<label>aktuelle Große</label>
												<input type="text" name="input50" value={this.state.input50} onChange={this.onInputchange.bind(this)} />
											</Grid>
											<Grid sm={2} md={2} lg={2} className="marginAuto">
												<label>aktueller Grad</label>
												<input type="text" name="input51" value={this.state.input51} onChange={this.onInputchange.bind(this)} />
											</Grid>

										</Grid>
										<Grid className="justify-around">
											<Grid sm={3} md={3} lg={3} className="marginAuto">
												<label className="checkboxContainer">
													<input type="checkbox" name="input52" checked={this.state.input52} onChange={this.onInputchange.bind(this)} />
													<span className="checkmark"></span>
														andere Wundverbande
													</label>
											</Grid>
											<Grid sm={3} md={3} lg={3}>
												<input type="text" name="input53" value={this.state.input53} onChange={this.onInputchange.bind(this)} />
											</Grid>
											<Grid sm={2} md={2} lg={2}>
												<input type="text" name="input54" value={this.state.input54} onChange={this.onInputchange.bind(this)} />
											</Grid>
											<Grid sm={2} md={2} lg={2}>

											</Grid>

										</Grid>
										<Grid>
											<h6>Sonstige Mapnahmen der Behandlungspflege</h6>
											<input type="text" name="input55" value={this.state.input55} onChange={this.onInputchange.bind(this)} />
											<input type="text" name="input56" value={this.state.input56} onChange={this.onInputchange.bind(this)} />

										</Grid>
										<Grid>
											<h6>Anleitung zur Behandlungspflege Fur patient.Angehorige</h6>
											<input type="text" name="input57" value={this.state.input57} onChange={this.onInputchange.bind(this)} />

										</Grid>
										<Grid>
											<h5>Grundpflege und hauswirtschaftliche Versorgung</h5>
											<Grid className="justify-around">
												<Grid sm={6} md={6} lg={6} >
													<Box className="flex-column">
														<label className="checkboxContainer">Unterstutzungspflege nach $ 37(1) SGB V
													<input type="checkbox" name="input58" checked={this.state.input58} onChange={this.onInputchange.bind(this)} />
															<span className="checkmark"></span>
														</label>
														<label className="checkboxContainer"> Krankenhausvermeidungspflege nach 37 (1) SGB V
												<input type="checkbox" name="input59" checked={this.state.input59} onChange={this.onInputchange.bind(this)} />
															<span className="checkmark"></span>
														</label>
														<label className="checkboxContainer"> Grundpflege
													<input type="checkbox" name="input60" checked={this.state.input60} onChange={this.onInputchange.bind(this)} />
															<span className="checkmark"></span>
														</label>
														<label className="checkboxContainer">Hauswirtschaftlich Versorgung
														<input type="checkbox" name="input61" checked={this.state.input61} onChange={this.onInputchange.bind(this)} />
															<span className="checkmark"></span>
														</label>

													</Box>
												</Grid>
												<Grid sm={6} md={6} lg={6}>
													<table>
														<thead></thead>
														<tbody>


															<tr>
																<td colSpan="3">Häufigkeit</td>
																<td colSpan="2">Dauer</td>
															</tr>
															<tr>
																<td>tgl.</td>
																<td> wtl.</td>
																<td> mtl .</td>
																<td> vom.</td>
																<td>bis.</td>
															</tr>
															<tr>
																<td><input type="text" name="input62" value={this.state.input62} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input63" value={this.state.input63} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input64" value={this.state.input64} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input65" value={this.state.input65} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input66" value={this.state.input66} onChange={this.onInputchange.bind(this)} /></td>
															</tr>
															<tr>
																<td><input type="text" name="input67" value={this.state.input67} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input68" value={this.state.input68} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input69" value={this.state.input69} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input70" value={this.state.input70} onChange={this.onInputchange.bind(this)} /></td>
																<td><input type="text" name="input71" value={this.state.input71} onChange={this.onInputchange.bind(this)} /></td>
															</tr>
														</tbody>
														<tfoot></tfoot>
													</table>
												</Grid>
											</Grid>
											<Grid>
												<h6>Weitere  Hinweise</h6>
												<input type="text" name="input72" value={this.state.input72} onChange={this.onInputchange.bind(this)} />
												<input type="text" name="input73" value={this.state.input73} onChange={this.onInputchange.bind(this)} />
												<input type="text" name="input74" value={this.state.input74} onChange={this.onInputchange.bind(this)} />
												<input type="text" name="input75" value={this.state.input75} onChange={this.onInputchange.bind(this)} />
											</Grid>

											<Box className="button">
												Ausfertigung für die krankenkasse
											</Box>
										</Grid>

									</Box>

								</Grid>
								<Grid sm={12} md={3} lg={3} className="rightGrid">
									<Grid >
										<table>
											<thead></thead>
											<tbody>
												<tr className="thead-title">
													<td colSpan="5">Dauer nur Oder nur anzugeben bei Abweichung von Dauer der gesamten Verordnung</td>

												</tr>
												<tr className="thead-cols">
													<td colSpan="3">Häufigkeit</td>
													<td colSpan="2">Dauer</td>
												</tr>
												<tr>
													<td>tgl.</td>
													<td> wtl.</td>
													<td> mtl .</td>
													<td> vom.</td>
													<td>bis.</td>
												</tr>
												<tr>
													<td>	<input type="text" name="input118" value={this.state.input118} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input119" value={this.state.input119} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input120" value={this.state.input120} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input121" value={this.state.input121} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input122" value={this.state.input122} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
												<tr>
													<td><input type="text" name="input123" value={this.state.input123} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input124" value={this.state.input124} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input125" value={this.state.input125} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input126" value={this.state.input126} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input127" value={this.state.input127} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
												<tr>
													<td><input type="text" name="input128" value={this.state.input128} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input129" value={this.state.input129} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input130" value={this.state.input130} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input131" value={this.state.input131} onChange={this.onInputchange.bind(this)} /></td>
													<td><input type="text" name="input132" value={this.state.input132} onChange={this.onInputchange.bind(this)} /></td>
												</tr>

											</tbody>
											<tfoot></tfoot>
										</table>
									</Grid>
									<Grid mt={10}>
										<table>
											<tbody>
												<tr>
													<td>	<input type="text" name="input76" value={this.state.input76} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input77" value={this.state.input77} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input78" value={this.state.input78} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input79" value={this.state.input79} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input80" value={this.state.input80} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
											</tbody>
										</table>
									</Grid>
									<Grid mt={10}>
										<table>
											<tbody>
												<tr>
													<td>	<input type="text" name="input81" value={this.state.input81} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input82" value={this.state.input82} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input83" value={this.state.input83} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input84" value={this.state.input84} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input85" value={this.state.input85} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
												<tr>
													<td>	<input type="text" name="input86" value={this.state.input86} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input87" value={this.state.input87} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input88" value={this.state.input88} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input89" value={this.state.input89} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input90" value={this.state.input90} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
											</tbody>
										</table>
									</Grid>
									<Grid mt={10}>
										<table>
											<tbody>
												<tr>
													<td>	<input type="text" name="input91" value={this.state.input91} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input92" value={this.state.input92} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input93" value={this.state.input93} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input94" value={this.state.input94} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input95" value={this.state.input95} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
											</tbody>

										</table>
									</Grid>
									<Grid mt={10}>
										<table>
											<tbody>
												<tr>
													<td>	<input type="text" name="input96" value={this.state.input96} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input97" value={this.state.input97} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input98" value={this.state.input98} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input99" value={this.state.input99} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input100" value={this.state.input100} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
												<tr>
													<td>	<input type="text" name="input101" value={this.state.input101} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input102" value={this.state.input102} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input103" value={this.state.input103} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input104" value={this.state.input104} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input105" value={this.state.input105} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
											</tbody>
										</table>
									</Grid>
									<Grid mt={10}>
										<table>
											<tbody>
												<tr>
													<td>	<input type="text" name="input106" value={this.state.input106} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input107" value={this.state.input107} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input108" value={this.state.input108} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input109" value={this.state.input109} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input110" value={this.state.input110} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
												<tr>
													<td>	<input type="text" name="input111" value={this.state.input111} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input112" value={this.state.input112} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input113" value={this.state.input113} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input114" value={this.state.input114} onChange={this.onInputchange.bind(this)} /></td>
													<td>	<input type="text" name="input115" value={this.state.input115} onChange={this.onInputchange.bind(this)} /></td>
												</tr>
											</tbody>
										</table>
									</Grid>
									<Grid>
										<input type="text" name="input116" value={this.state.input116} onChange={this.onInputchange.bind(this)} />
									</Grid>
									<Grid>
										<Box className="emptyBox">
											<label><strong>{this.state.doctorName}</strong></label>
											<label>{this.state.doctorstreetNr}</label>
											<label>{this.state.doctorzipCity}</label>
											<label>{this.state.doctorphone}</label>
											<label><strong>{this.state.doctorfax}</strong></label>
										</Box>

									</Grid>
								</Grid>

							</Grid>
						</Grid>

					</Box>
				</DialogContent>
				<DialogActions className="px-20 pb-20 justify-content-center">
					{
						!this.state.isDownload && <Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
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

EditorDialog.modules = {
	toolbar: {
		container:
			[
				[{
					'placeholder': ['[name]', '[street]', '[zip]', '[city]', '[insurance]', '[insuranceNr]', '[birthday]', '[phone]']
				}], // my custom dropdown
				['bold', 'italic', 'underline', 'strike'],        // toggled buttons
				['blockquote', 'code-block'],
				[{ 'header': 1 }, { 'header': 2 }],               // custom button values
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
				[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
				[{ 'direction': 'rtl' }],                         // text direction

				[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
				[{ 'font': [] }],
				[{ 'align': [] }],

				['clean']                                    // remove formatting button

			],
		handlers: {
			"placeholder": function (value) {
				if (value) {
					const cursorPosition = this.quill.getSelection().index;
					this.quill.insertText(cursorPosition, value);
					this.quill.setSelection(cursorPosition + value.length);
				}
			}
		}
	}
}
export default EditorDialog;