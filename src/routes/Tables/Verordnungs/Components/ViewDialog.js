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
							<strong>{instanceInfo.instanceName} | {instanceInfo.streetNr} | {instanceInfo.zipCode} {instanceInfo.city}</strong>
						</Typography>
					</Box>

					<Grid container className="justify-between">
						<Grid item sm={7} md={7} lg={7}>
							<Box pt={1}>

								<Typography><strong>{doctorInfo.doctorName}</strong></Typography>
								<Typography>{doctorInfo.streetNr}</Typography>
								<Typography>{doctorInfo.zipcode}</Typography>

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
								<Typography><strong>{doctorInfo.fax}</strong></Typography>
							</Box>
						</Grid>
						<Grid item sm={3} md={3} lg={3}>
							<Box pt={1}>
								<Typography><strong>Tel :  {instanceInfo.phone}</strong></Typography>
								<Typography><strong>Fax :  {instanceInfo.fax}</strong></Typography>
								<Typography><strong>E-Mail :  {instanceInfo.email}</strong></Typography>
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
								<h5><strong>Anforderung</strong></h5>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer" >
									<input type="radio" name="type" checked={type == 'Erstverordnung' ? true : false} />
									<span className="checkmark"></span>
								</label>
								<h5><strong>Erstverordnung</strong></h5>

							</Grid>
							<Grid item sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer">
									<input type="radio" name="type" checked={type == 'Folgeverordnung' ? true : false} />
									<span className="checkmark"></span>
								</label>
								<h5><strong>Folgeverordnung</strong></h5>

							</Grid>
							<Grid item sm={12} md={3} lg={3} className="justify-center">
								<label className="checkboxContainer">
									<input type="radio" name="type" value='Medikamentenplan' checked={type == 'Medikamentenplan' ? true : false} />
									<span className="checkmark"></span>
								</label>
								<h5><strong>Medikamentenplan</strong></h5>

							</Grid>


						</Grid>

					</Box>
					<Box pt={1} >
						<Grid container sm={12} md={12} lg={12} className="datecontainer">
							<h6>Zeitraum:</h6>
							<Typography>von: {this.formate_date(from)}</Typography>
							<Typography>bis: {this.formate_date(to)}</Typography>

						</Grid>

					</Box>
					<Box pt={1} >
						<Box>
							{patientInfo.firstName} {patientInfo.lastName} , geb. am {this.formate_date_birthday(patientInfo.birthday)}
						</Box>
						<Box>
							Versicherung:  {patientInfo.insurance} , Versichertennummer:  {patientInfo.insuranceNr}.
							</Box>
					</Box>
					<Box pt={5} >
						<Typography>Sehr geehrte Damen und Herren,
							fur die Durchfuhrung von behandlungspflegerischen MaBnahmen benotigen wir eine Verordnung fur folgende Leistungen:</Typography>
						<Box className="tableContainer" pt={2} pb={2}>
							<table>
								<thead>
									<tr>
										<th colSpan="1">
											Leistung
										</th>
										<th colSpan="2">
											Haufigkeit
										</th>
									</tr>
								</thead>
								<tbody>


									{selectedServices.length ? selectedServices.map((elemnet, index) => (
										<tr key={index}>
											<td className="detail">
												<h6><strong>{elemnet.service}</strong></h6>
												<Box>
													{elemnet.comment}
												</Box>
											</td>
											<td>
												{elemnet.tgl}
											</td>
											<td>
												{elemnet.wtl}
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
						<Box>Bitte senden Sie uns die Verordung vor ab per Fax an: <strong>{instanceInfo.fax}</strong></Box>
						<Box pt={2}>
							Wir danken Ihnen recht herzlich fur Ihre Muhe und stehen Ihnen als zuverlassiger und professioneller
							Versorger jederzeit gerne zur Seite.
								</Box>
						<Box pt={2}> 	Mit freundlichen GruBen
								</Box>
						<Box>
							Ihr <strong>{instanceInfo.instanceName}</strong>  Team
								</Box>
					</Box>


				</Box>


			</div>


		);
	}
}

export default ViewDialog;