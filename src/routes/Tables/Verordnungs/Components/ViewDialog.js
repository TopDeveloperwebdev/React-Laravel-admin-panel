/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Grid, Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as ReactDOM from 'react-dom';
import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import PageTemplate from '../../PatientsTable/Components/PageTemplates';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
let patients = ["Hans-Willi", "Heiner", "Galina", "Josef"];
class ViewDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {}

	formate_date(dateString) {
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
	formate_date_birthday(dateString) {
		let date;
		if (dateString) {
			let str = dateString.split(" ");
			date = str[0].split('-');
			date = date[2] + '.' + date[1] + '.' + date[0];
		}

		return date;
	}
	getUrl(logo) {
		if (logo) {
			let url = '/backend_latest/file_storage/' + logo.split('/')[5];
			return url
		}
	}
	render() {
		console.log('this.props.content.patients000000', this.props.instanceData);
		const { document: { instanceInfo, doctorInfo, patientInfo, selectedServices }, type, from, to } = this.props.content;
		console.log('type', type);
		return (
			<div className="attachPdf">
				<Box className="text-editor" id="editArea">
					<Box mb="1" className="logo">
						<img src={this.getUrl(instanceInfo.instanceLogo)} width="35" />
					</Box>
					<Box>
						<Typography>
							{instanceInfo.instanceName} | {instanceInfo.streetNr} | {instanceInfo.zipCode} {instanceInfo.city}
						</Typography>
					</Box>

					<Grid container className="justify-between">
						<Grid item sm={7} md={7} lg={7}>
							<Box pt={1}>

								<Typography>{doctorInfo.doctorName}</Typography>
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
								<Typography>Fax: {doctorInfo.fax}</Typography>
							</Box>
						</Grid>
						<Grid item sm={3} md={3} lg={3}>
							<Box pt={1}>
								<Typography><span>Tel.:</span>  {instanceInfo.phone}</Typography>
								<Typography><span>Fax:</span>  {instanceInfo.fax}</Typography>
								<Typography><span>E-Mail:</span>  {instanceInfo.email}</Typography>
							</Box>
						</Grid>

					</Grid>

					<Box pt={3}>
						<Grid container className="justify-between">
							<Grid item sm={7} md={7} lg={7}>

							</Grid>
							<Grid item sm={3} md={3} lg={3}>
								<Box>
									<Typography>{this.formate_date(new Date())}</Typography>
								</Box>

							</Grid>

						</Grid>
					</Box>

					<Box pt={10} >
						<Grid container sm={12} md={12} lg={12} className="justify-between checkboxs">

							<Grid item xs={12} sm={12} md={2} lg={2}>
								<h5 className="title-h5">Anforderung</h5>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer" >
									<input type="checkbox" name="type1" value="Erstverordnung" checked={type.type1} />
									<span className="checkmark"></span>
								</label>
								<h5>Erstverordnung</h5>

							</Grid>
							<Grid item sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer">
									<input type="checkbox" name="type2" value="Folgeverordnung" checked={type.type2} />
									<span className="checkmark"></span>
								</label>
								<h5>Folgeverordnung</h5>

							</Grid>
							<Grid item sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer">
									<input type="checkbox" name="type3" checked={this.state.type3} checked={type.type3} />
									<span className="checkmark"></span>
								</label>
								<h5>Medikamentenplan</h5>

							</Grid>


						</Grid>

					</Box>
					<Box pt={1} >
						<Grid container sm={12} md={12} lg={12} className="datecontainer">
							<h6>Zeitraum: </h6>
							<Typography>von: {this.formate_date(from)} </Typography>
							<Typography>bis: {this.formate_date(to)}</Typography>

						</Grid>

					</Box>
					<Box pt={1} >
						<Box>
							{patientInfo.firstName} {patientInfo.lastName}, geb. am {this.formate_date_birthday(patientInfo.birthday)}
						</Box>
						<Box>
							Versicherung:  {patientInfo.insurance}, Versichertennummer:  {patientInfo.insuranceNr}.
							</Box>
					</Box>
					<Box pt={5} >
						<Box className="tableContainer" pt={2}>
							<Typography>Sehr geehrte Damen und Herren,</Typography>
						</Box>
						<Box className="tableContainer" pt={2}>
							<Typography>für die Durchführung von behandlungspflegerischen Maßnahmen benötigen wir eine Verordnung für folgende Leistungen: </Typography>
						</Box>

						<Box className="tableContainer" pt={2} pb={2}>
							<table>

								<tbody>
									<tr className="thead">
										<td colSpan="1" className="th">
											Leistung
										</td>
										<td colSpan="2" className="th2">
											Häufigkeit
										</td>
									</tr>

									{selectedServices.length ? selectedServices.map((elemnet, index) => (
										<tr key={index}>
											<td className="detail">
												<h6>{elemnet.service}</h6>
												<Box>
													{elemnet.comment}
												</Box>
											</td>
											<td>
												{elemnet.tgl}  x  tgl.
											</td>
											<td>
												{elemnet.wtl}  x  wtl.
											</td>
										</tr>
									))
										: <tr>
											<td className="detail none-row" colSpan="3" >
												None
										</td>

										</tr>

									}


								</tbody>
							</table>

						</Box>

					</Box>
					<Box pt={2}>
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


			</div>


		);
	}
}

export default ViewDialog;