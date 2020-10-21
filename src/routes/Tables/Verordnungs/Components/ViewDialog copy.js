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


	render() {
		console.log('this.props.content.patients000000', this.props.instanceData);

		return (
			<div className="attachPdf">
				<Box className="text-editor" id="editArea">
					<Grid className="justify-around">
						<Grid xs={12} sm={12} md={5} lg={5} className="insurance">
							<table>
								<tbody>
									<tr>
										<td colSpan="3">
											<label>Krankenkasse bzw. kostenträger</label>
											<Typography >{this.props.content.insurance}</Typography>
										</td>
									</tr>
									<tr>
										<td colSpan="3">
											<label>Name, Vorname des Versicherten</label>
											<Box className="justify-between">
												<Typography >{this.props.content.patient}</Typography>
												<label className="date-label">geb . am</label>
											</Box>

											<Grid className="justify-between">
												<Grid sm={5} md={5} lg={5}>
													<Typography >{this.props.content.streetNr}</Typography>
													<Typography >{this.props.content.zipCity}</Typography>

												</Grid>
												<Grid sm={5} md={5} lg={5}>
													<Typography >{this.props.content.birthday}</Typography>

												</Grid>
											</Grid>
										</td>
									</tr>
									<tr>
										<td>
											<label>Kostenträgerkennung </label>
											<Typography >{this.props.content.input1}</Typography>
										</td>
										<td>
											<label>Versicherten-Nr</label>
											<Typography >{this.props.content.insuranceNr}</Typography>
										</td>
										<td>
											<label>Status</label>
											<Typography >{this.props.content.status}</Typography>
										</td>
									</tr>
									<tr>
										<td>
											<label>Betriebsstatten-Nr</label>
											<Typography >{this.props.content.pharmacy}</Typography>
										</td>
										<td>
											<label>Arzt-Nr</label>
											<Typography >{this.props.content.input5}</Typography>

										</td>
										<td>
											<label>Datum</label>
											<Typography >{this.props.content.input6}</Typography>

										</td>
									</tr>

								</tbody>
							</table>
							<Box mt={1} className="justify-around checkboxs">
								<label className="checkboxContainer"> Erstverordnung
								<input type="radio" name="input7" value="Erstverordnung" readOnly />
									<span className="checkmark"></span>
								</label>
								<label className="checkboxContainer"> Folgeverordnung
						<input type="radio" name="input7" value="Folgeverordnung" readOnly />
									<span className="checkmark"></span>
								</label>

							</Box>
						</Grid>
						<Grid sm={12} md={6} lg={6} className="diagnostics">
							<h3>Verordnung häuslicher krankenpflege</h3>						
							<Typography>{this.props.content.instanceName}</Typography>
							<Typography>Tel :   {this.props.content.instanceName}</Typography>
							<Typography><strong>Fax :  {this.props.content.instanceName}</strong></Typography>
							<label className="label-1">Einschränkungen, die häusliche krankenpflege erforderlich machen</label>
							<label className="label-2">(Vgl. auch Leistungsverzeichnis HKP-Richtlinie)</label>
							<div className="flex-column">
								<input type="text" name="input13" value={this.props.content.input13} readOnly />
								<input type="text" name="input14" value={this.props.content.input14} readOnly />
								<input type="text" name="input15" value={this.props.content.input15} readOnly />
							</div>
							<Box mt={10} className="dateContainer">
								<Grid className="justify-between">
									<Grid mr={1} sm={2} md={2} lg={2}>vom</Grid>
									<Grid sm={9} md={9} lg={9}>
										<input type="number" placeholder="T" name="input16" value={this.props.content.input16} readOnly />
										<input type="number" placeholder="T" name="input17" value={this.props.content.input17} readOnly />
										<input type="number" placeholder="M" name="input18" value={this.props.content.input18} readOnly />
										<input type="number" placeholder="M" name="input19" value={this.props.content.input19} readOnly />
										<input type="number" placeholder="J" name="input20" value={this.props.content.input20} readOnly />
										<input type="number" placeholder="J" name="input21" value={this.props.content.input21} readOnly />
									</Grid>
								</Grid>
								<Grid className="justify-between">
									<Grid mr={1} sm={2} md={2} lg={2}>bis</Grid>
									<Grid sm={9} md={9} lg={9}>
										<input type="number" placeholder="T" name="input22" value={this.props.content.input22} readOnly />
										<input type="number" placeholder="T" name="input23" value={this.props.content.input23} readOnly />
										<input type="number" placeholder="M" name="input24" value={this.props.content.input24} readOnly />
										<input type="number" placeholder="M" name="input25" value={this.props.content.input25} readOnly />
										<input type="number" placeholder="J" name="input26" value={this.props.content.input26} readOnly />
										<input type="number" placeholder="J" name="input27" value={this.props.content.input27} readOnly />
									</Grid>
								</Grid>
							</Box>
						</Grid>

					</Grid>
					<Grid className="main">
						<h5>Behandlungspflege</h5>
						<Grid className="justify-around">
							<Grid sm={12} md={8} lg={8}>
								<Box className="flex-column">
									<input type="text" name="input28" value={this.props.content.input28} readOnly />
									<input type="text" name="input29" value={this.props.content.input29} readOnly />
									<input type="text" name="input30" value={this.props.content.input30} readOnly />
								</Box>
								<Box>
									<label className="checkboxContainer"> Herrichten der Medikamentenbox
						<input type="checkbox" name="input31" checked={this.props.content.input31} readOnly />
										<span className="checkmark"></span>
									</label>
								</Box>
								<Box>
									<label className="checkboxContainer"> Medikamentengabe
						<input type="checkbox" name="input32" checked={this.props.content.input32} readOnly />
										<span className="checkmark"></span>
									</label>
								</Box>
								<Box className="justify-around">
									<label className="checkboxContainer"> Injektionen
						<input type="checkbox" name="injektionen" checked={this.props.content.injektionen} readOnly />
										<span className="checkmark"></span>
									</label>
									<label className="checkboxContainer">herrichten
						<input type="checkbox" name="input33" checked={this.props.content.input33} readOnly />
										<span className="checkmark"></span>
									</label>
									<label className="checkboxContainer"> Intramuskular
						<input type="checkbox" name="input34" checked={this.props.content.input34} readOnly />
										<span className="checkmark"></span>
									</label>
									<label className="checkboxContainer"> Subkutan
						<input type="checkbox" name="input35" checked={this.props.content.input35} readOnly />
										<span className="checkmark"></span>
									</label>
								</Box>
								<Box>
									<h6>Blutzuckermessung</h6>
									<Box className="justify-around">
										<label className="checkboxContainer"> Erst- order Meueinstellung<br></br>
(max. 4 Wochen und max. 3x taglisch)
						<input type="checkbox" name="input36" checked={this.props.content.input36} readOnly />
											<span className="checkmark"></span>
										</label>
										<label className="checkboxContainer"> Bei intensivierter Insulintherapie
						<input type="checkbox" name="input37" checked={this.props.content.input37} readOnly />
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
						<input type="checkbox" name="input38" checked={this.props.content.input38} readOnly />
													<span className="checkmark"></span>
												</label>
											</Grid>
											<Grid sm={4} >
												<label className="checkboxContainer"> links
						<input type="checkbox" name="input39" checked={this.props.content.input39} readOnly />
													<span className="checkmark"></span>
												</label>
											</Grid>
											<Grid sm={4} ><label className="checkboxContainer">  beidseits
						<input type="checkbox" name="input40" checked={this.props.content.input40} readOnly />
												<span className="checkmark"></span>
											</label>
											</Grid>
										</Grid>
									</Grid>

									<Grid className="justify-around">
										<Grid sm={6} md={6} lg={6}>
											<label className="checkboxContainer">Kompressionsstrümpfe anziehen
						<input type="checkbox" name="input41" checked={this.props.content.input41} readOnly />
												<span className="checkmark"></span>
											</label>
										</Grid>
										<Grid sm={6} md={6} lg={6}>
											<label className="checkboxContainer">Kompressionsverbände anlegen
						<input type="checkbox" name="input42" checked={this.props.content.input42} readOnly />
												<span className="checkmark"></span>
											</label>
										</Grid>
									</Grid>
									<Grid className="justify-around">
										<Grid sm={6} md={6} lg={6}>
											<label className="checkboxContainer">
												Kompressionsstrümpfe ausziehen
						<input type="checkbox" name="input43" checked={this.props.content.input43} readOnly />
												<span className="checkmark"></span>
											</label>
										</Grid>
										<Grid sm={6} md={6} lg={6}>
											<label className="checkboxContainer">Kompressionsverbände abnehmen
						<input type="checkbox" name="input44" checked={this.props.content.input44} readOnly />
												<span className="checkmark"></span>
											</label>
										</Grid>
									</Grid>

									<Grid className="justify-around">
										<Grid sm={8} md={8} lg={8}>
											<h6>Stutzende und sratabilisierende VerBande, Art</h6>
										</Grid>
										<Grid sm={4} md={4} lg={4}>
											<input type="text" name="input45" value={this.props.content.input45} readOnly />
										</Grid>
									</Grid>
									<Grid className="justify-around">
										<Grid sm={3} md={3} lg={3}>
											<h6>Wundversorgung</h6>
										</Grid>
										<Grid sm={8} md={8} lg={8}>
											<input type="text" name="input46" value={this.props.content.input46} readOnly />
										</Grid>
									</Grid>
									<Grid >

										<input type="text" name="input47" value={this.props.content.input47} readOnly />
									</Grid>
									<Grid className="justify-around" >
										<Grid sm={2} md={2} lg={2} className="marginAuto">
											<label className="checkboxContainer">
												<input type="checkbox" name="input48" checked={this.props.content.input48} readOnly />
												<span className="checkmark"></span>
										DeKubitusbehandlung
									</label>
										</Grid>
										<Grid sm={2} md={2} lg={2} className="marginAuto">
											<label>Lokalisation</label>
											<input type="text" name="input49" value={this.props.content.input49} readOnly />
										</Grid>
										<Grid sm={2} md={2} lg={2} className="marginAuto">
											<label>aktuelle Große</label>
											<input type="text" name="input50" value={this.props.content.input50} readOnly />
										</Grid>
										<Grid sm={2} md={2} lg={2} className="marginAuto">
											<label>aktueller Grad</label>
											<input type="text" name="input51" value={this.props.content.input51} readOnly />
										</Grid>

									</Grid>
									<Grid className="justify-around">
										<Grid sm={2} md={2} lg={2} className="marginAuto">
											<label className="checkboxContainer">
												<input type="checkbox" name="input52" checked={this.props.content.input52} readOnly />
												<span className="checkmark"></span>
										andere Wundverbande
									</label>
										</Grid>
										<Grid sm={2} md={2} lg={2}>
											<input type="text" name="input53" value={this.props.content.input53} readOnly />
										</Grid>
										<Grid sm={2} md={2} lg={2}>
											<input type="text" name="input54" value={this.props.content.input54} readOnly />
										</Grid>
										<Grid sm={2} md={2} lg={2}>

										</Grid>

									</Grid>
									<Grid>
										<h6>Sonstige Mapnahmen der Behandlungspflege</h6>
										<input type="text" name="input55" value={this.props.content.input55} readOnly />
										<input type="text" name="input56" value={this.props.content.input56} readOnly />

									</Grid>
									<Grid>
										<h6>Anleitung zur Behandlungspflege Fur patient.Angehorige</h6>
										<input type="text" name="input57" value={this.props.content.input57} readOnly />

									</Grid>
									<Grid>
										<h5>Grundpflege und hauswirtschaftliche Versorgung</h5>
										<Grid className="justify-around">
											<Grid sm={6} md={6} lg={6} >
												<Box className="flex-column">
													<label className="checkboxContainer">Unterstutzungspflege nach $ 37(1) SGB V
									<input type="checkbox" name="input58" checked={this.props.content.input58} readOnly />
														<span className="checkmark"></span>
													</label>
													<label className="checkboxContainer"> Krankenhausvermeidungspflege nach 37 (1) SGB V
								<input type="checkbox" name="input59" checked={this.props.content.input59} readOnly />
														<span className="checkmark"></span>
													</label>
													<label className="checkboxContainer"> Grundpflege
									<input type="checkbox" name="input60" checked={this.props.content.input60} readOnly />
														<span className="checkmark"></span>
													</label>
													<label className="checkboxContainer">Hauswirtschaftlich Versorgung
										<input type="checkbox" name="input61" checked={this.props.content.input61} readOnly />
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
															<td><Typography >{this.props.content.input62} </Typography ></td>
															<td><Typography >{this.props.content.input63} </Typography ></td>
															<td><Typography >{this.props.content.input64} </Typography ></td>
															<td><Typography >{this.props.content.input65} </Typography ></td>
															<td><Typography >{this.props.content.input66} </Typography ></td>
														</tr>
														<tr>
															<td><Typography >{this.props.content.input67} </Typography ></td>
															<td><Typography >{this.props.content.input68} </Typography ></td>
															<td><Typography >{this.props.content.input69} </Typography ></td>
															<td><Typography >{this.props.content.input70} </Typography ></td>
															<td><Typography >{this.props.content.input71} </Typography ></td>
														</tr>
													</tbody>
													<tfoot></tfoot>
												</table>
											</Grid>
										</Grid>
										<Grid>
											<h6>Weitere  Hinweise</h6>
											<input type="text" name="input72" value={this.props.content.input72} readOnly />
											<input type="text" name="input73" value={this.props.content.input73} readOnly />
											<input type="text" name="input74" value={this.props.content.input74} readOnly />
											<input type="text" name="input75" value={this.props.content.input75} readOnly />
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
												<td><Typography >{this.props.content.input118} </Typography ></td>
												<td><Typography >{this.props.content.input119} </Typography ></td>
												<td><Typography >{this.props.content.input120} </Typography ></td>
												<td><Typography >{this.props.content.input121} </Typography ></td>
												<td><Typography >{this.props.content.input122} </Typography ></td>
											</tr>
											<tr>
												<td><Typography >{this.props.content.input123} </Typography ></td>
												<td><Typography >{this.props.content.input124} </Typography ></td>
												<td><Typography >{this.props.content.input125} </Typography ></td>
												<td><Typography >{this.props.content.input126} </Typography ></td>
												<td><Typography >{this.props.content.input127} </Typography ></td>
											</tr>
											<tr>
												<td><Typography >{this.props.content.input128} </Typography ></td>
												<td><Typography >{this.props.content.input129} </Typography ></td>
												<td><Typography >{this.props.content.input130} </Typography ></td>
												<td><Typography >{this.props.content.input131} </Typography ></td>
												<td><Typography >{this.props.content.input132} </Typography ></td>
											</tr>

										</tbody>
										<tfoot></tfoot>
									</table>
								</Grid>
								<Grid mt={10}>
									<table>
										<tbody>
											<tr>
												<td><Typography >{this.props.content.input76} </Typography ></td>
												<td><Typography >{this.props.content.input77} </Typography ></td>
												<td><Typography >{this.props.content.input78} </Typography ></td>
												<td><Typography >{this.props.content.input79} </Typography ></td>
												<td><Typography >{this.props.content.input80} </Typography ></td>
											</tr>
										</tbody>
									</table>
								</Grid>
								<Grid mt={10}>
									<table>
										<tbody>
											<tr>
												<td><Typography >{this.props.content.input81} </Typography ></td>
												<td><Typography >{this.props.content.input82} </Typography ></td>
												<td><Typography >{this.props.content.input83} </Typography ></td>
												<td><Typography >{this.props.content.input84} </Typography ></td>
												<td><Typography >{this.props.content.input85} </Typography ></td>
											</tr>
											<tr>
												<td><Typography >{this.props.content.input86} </Typography ></td>
												<td><Typography >{this.props.content.input87} </Typography ></td>
												<td><Typography >{this.props.content.input88} </Typography ></td>
												<td><Typography >{this.props.content.input89} </Typography ></td>
												<td><Typography >{this.props.content.input90} </Typography ></td>
											</tr>
										</tbody>
									</table>
								</Grid>
								<Grid mt={10}>
									<table>
										<tbody>
											<tr>
												<td><Typography >{this.props.content.input91} </Typography ></td>
												<td><Typography >{this.props.content.input92} </Typography ></td>
												<td><Typography >{this.props.content.input93} </Typography ></td>
												<td><Typography >{this.props.content.input94} </Typography ></td>
												<td><Typography >{this.props.content.input95} </Typography ></td>
											</tr>
										</tbody>

									</table>
								</Grid>
								<Grid mt={10}>
									<table>
										<tbody>
											<tr>
												<td><Typography >{this.props.content.input96} </Typography ></td>
												<td><Typography >{this.props.content.input97} </Typography ></td>
												<td><Typography >{this.props.content.input98} </Typography ></td>
												<td><Typography >{this.props.content.input99} </Typography ></td>
												<td><Typography >{this.props.content.input100} </Typography ></td>
											</tr>
											<tr>
												<td><Typography >{this.props.content.input101} </Typography ></td>
												<td><Typography >{this.props.content.input102} </Typography ></td>
												<td><Typography >{this.props.content.input103} </Typography ></td>
												<td><Typography >{this.props.content.input104} </Typography ></td>
												<td><Typography >{this.props.content.input105} </Typography ></td>
											</tr>
										</tbody>
									</table>
								</Grid>
								<Grid mt={10}>
									<table>
										<tbody>
											<tr>
												<td><Typography >{this.props.content.input106} </Typography ></td>
												<td><Typography >{this.props.content.input107} </Typography ></td>
												<td><Typography >{this.props.content.input108} </Typography ></td>
												<td><Typography >{this.props.content.input109} </Typography ></td>
												<td><Typography >{this.props.content.input110} </Typography ></td>
											</tr>
											<tr>
												<td><Typography >{this.props.content.input111} </Typography ></td>
												<td><Typography >{this.props.content.input112} </Typography ></td>
												<td><Typography >{this.props.content.input113} </Typography ></td>
												<td><Typography >{this.props.content.input114} </Typography ></td>
												<td><Typography >{this.props.content.input115} </Typography ></td>
											</tr>
										</tbody>
									</table>
								</Grid>
								<Grid>
									<input type="text" name="input116" value={this.props.content.input116} readOnly />
									<Box mt={2} className="emptyBox">
										<label><strong>{this.props.content.doctorName}</strong></label>
										<label>{this.props.content.doctorstreetNr}</label>
										<label>{this.props.content.doctorzipCity}</label>
										<label>{this.props.content.doctorphone}</label>
										<label><strong>{this.props.content.doctorfax}</strong></label>
									</Box>
								</Grid>

							</Grid>

						</Grid>
					</Grid>
				</Box>

			</div>


		);
	}
}

export default ViewDialog;