import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import {
	Grid, Typography, Box, TextField, Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow, Paper, Divider, Container, Tooltip, Button
} from '@material-ui/core';
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import { userService } from '../../_services';
import ReactToPrint from 'react-to-print';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Loadable from 'react-loadable';
import { HulkPageLoader } from '../../components/GlobalComponents';
let orderDetail = {};

class sharedDocument extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Medikamentenbestellung',
			instance: {},
			patient: {},
			doctor: {},
			pharmacy: {},
			orderMedications: [],
			user: {},
			order: {},
			lastOrder: {},
			lastUser: {},
			comment: "",
			orderId: '',
			commentList: [],
			loading: false

		}
		this.submitComment = this.submitComment.bind(this);

	}
	componentWillMount() {

		this.documentId = this.props.match.params.id;

		userService.getVerordnung({ id: this.documentId }).then(res => {
			if (res.verordnung.length) {
				let content = JSON.parse(res.verordnung[0].content);
				this.setState({ ...content })
			}
			this.setState({ ['loading']: true, ['commentList']: res.commentList });

		})
	}

	formate_date(dateString) {
		let data = '';
		if (dateString) {
			let str = dateString.split(" ");
			let date = str[0].split('-');
			let time = str[1].split(':');
			data = date[2] + '.' + date[1] + '.' + date[0] + "  um " + time[0] + ':' + time[1];
		}

		return data;
	}

	handleChangeComment = (event) => {
		this.setState({ comment: event.target.value });
	}
	submitComment() {
		console.log('{ orderId: this.state.orderId  , user_id : this.user_id , comment : this.state.comment}', this.state.orderId, this.user_id, this.state.comment)
		userService.submitComment({ orderId: this.documentId, user_id: this.user_id, comment: this.state.comment }).then(res => {
			console.log('res', res);
			let list = [...this.state.commentList];
			list.push(res);
			this.setState({ commentList: list });

		})
	}
	render() {

		const componentRef = React.createRef();
		return (
			<div>

				{this.state.loading === true ?
					<div className="order-detail vh-100 ">
						<Box className="white-btn-color">
							<div className="page-space orderdetail">
								<Container ref={componentRef} className="sharedDocument">
									<Box px={{ xs: "12px", lg: 0 }}>

										<CustomCard>
											<Box className="text-editor" id="editArea">
												<Grid className="justify-around">
													<Grid xs={12} sm={12} md={5} lg={5} className="insurance">
														<table>
															<tbody>
																<tr>
																	<td colSpan="3">
																		<label>Krankenkasse bzw. kostenträger</label>
																		<input type="text" name="textarea1" value={this.state.insurance} readOnly />
																	</td>
																</tr>
																<tr>
																	<td colSpan="3">
																		<label>Name, Vorname des Versicherten</label>
																		<Box className="justify-between">
																			<input type="text" value={this.state.patient} placeholder="Select Patient" readOnly />
																			<label className="date-label">geb . am</label>
																		</Box>

																		<Grid className="justify-between">
																			<Grid sm={5} md={5} lg={5}>
																				<input type="text" name="streetNr" value={this.state.streetNr} readOnly />
																				<input type="text" name="zipCity" value={this.state.zipCity} readOnly />
																			</Grid>
																			<Grid sm={5} md={5} lg={5}>
																				<input type="text" name="date" value={this.state.birthday} readOnly />
																				<Typography>(birthday)</Typography>
																			</Grid>
																		</Grid>
																	</td>
																</tr>
																<tr>
																	<td>
																		<label>Kostenträgerkennung </label>
																		<input type="text" name="input1" value={this.state.input1} readOnly /></td>
																	<td>
																		<label>Versicherten-Nr</label>
																		<input type="text" name="input2" value={this.state.insuranceNr} readOnly /></td>
																	<td>
																		<label>Status</label>
																		<input type="text" name="input3" value={this.state.status} readOnly /></td>
																</tr>
																<tr>
																	<td>
																		<label>Betriebsstatten-Nr</label>
																		<input type="text" name="input4" value={this.state.pharmacy} readOnly /></td>
																	<td>
																		<label>Arzt-Nr</label>
																		<input type="text" name="input5" value={this.state.familyDoctor} readOnly />
																	</td>
																	<td>
																		<label>Datum</label>
																		<input type="text" name="input6" value={this.state.input6} readOnly />
																	</td>
																</tr>

															</tbody>
														</table>
														<Box mt={5} className="justify-around">
															<label className="checkboxContainer"> Erst-verordnung
									<input type="radio" name="input7" value="Erst-verordnung" readOnly />
																<span className="checkmark"></span>
															</label>
															<label className="checkboxContainer"> Folge-verordnung
									<input type="radio" name="input7" value="Folge-verordnung" readOnly />
																<span className="checkmark"></span>
															</label>

														</Box>
													</Grid>
													<Grid sm={12} md={6} lg={6} className="diagnostics">
														<h3>Verordnung häuslicher krankenpflege</h3>
														<label>Verordnungsrelevante diagnose(n) (ICD-10-Code)</label>
														<div>
															<input type="text" name="input9" value={this.state.input9} readOnly />
															<input type="text" name="input10" value={this.state.input10} readOnly />
															<input type="text" name="input11" value={this.state.input11} readOnly />
															<input type="text" name="input12" value={this.state.input12} readOnly />
														</div>

														<label className="label-1">Einschränkungen, die häusliche krankenpflege erforderlich machen</label>
														<label className="label-2">(Vgl. auch Leistungsverzeichnis HKP-Richtlinie)</label>
														<div className="flex-column">
															<input type="text" name="input13" value={this.state.input13} readOnly />
															<input type="text" name="input14" value={this.state.input14} readOnly />
															<input type="text" name="input15" value={this.state.input15} readOnly />
														</div>
														<Box mt={10} className="dateContainer">
															<Box>
																<Box mr={1}>vom</Box>
																<Box>
																	<input type="number" placeholder="T" name="input16" value={this.state.input16} readOnly />
																	<input type="number" placeholder="T" name="input17" value={this.state.input17} readOnly />
																	<input type="number" placeholder="M" name="input18" value={this.state.input18} readOnly />
																	<input type="number" placeholder="M" name="input19" value={this.state.input19} readOnly />
																	<input type="number" placeholder="J" name="input20" value={this.state.input20} readOnly />
																	<input type="number" placeholder="J" name="input21" value={this.state.input21} readOnly />
																</Box>
															</Box>
															<Box>
																<Box mr={1}>bis</Box>
																<Box>
																	<input type="number" placeholder="T" name="input22" value={this.state.input22} readOnly />
																	<input type="number" placeholder="T" name="input23" value={this.state.input23} readOnly />
																	<input type="number" placeholder="M" name="input24" value={this.state.input24} readOnly />
																	<input type="number" placeholder="M" name="input25" value={this.state.input25} readOnly />
																	<input type="number" placeholder="J" name="input26" value={this.state.input26} readOnly />
																	<input type="number" placeholder="J" name="input27" value={this.state.input27} readOnly />
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
																<input type="text" name="input28" value={this.state.input28} readOnly />
																<input type="text" name="input29" value={this.state.input29} readOnly />
																<input type="text" name="input30" value={this.state.input30} readOnly />
															</Box>
															<Box>
																<label className="checkboxContainer"> Herrichten der Medikamentenbox
									<input type="checkbox" name="input31" checked={this.state.input31} readOnly />
																	<span className="checkmark"></span>
																</label>
															</Box>
															<Box>
																<label className="checkboxContainer"> Medikamentengabe
									<input type="checkbox" name="input32" checked={this.state.input32} readOnly />
																	<span className="checkmark"></span>
																</label>
															</Box>
															<Box className="justify-around">
																<label className="checkboxContainer"> Injektionen
									<input type="checkbox" name="input32" checked={this.state.input32} readOnly />
																	<span className="checkmark"></span>
																</label>
																<label className="checkboxContainer">herrichten
									<input type="checkbox" name="input33" checked={this.state.input33} readOnly />
																	<span className="checkmark"></span>
																</label>
																<label className="checkboxContainer"> Intramuskular
									<input type="checkbox" name="input34" checked={this.state.input34} readOnly />
																	<span className="checkmark"></span>
																</label>
																<label className="checkboxContainer"> Subkutan
									<input type="checkbox" name="input35" checked={this.state.input35} readOnly />
																	<span className="checkmark"></span>
																</label>
															</Box>
															<Box>
																<h6>Blutzuckermessung</h6>
																<Box className="justify-around">
																	<label className="checkboxContainer"> Erst- order Meueinstellung<br></br>
(max. 4 Wochen und max. 3x taglisch)
									<input type="checkbox" name="input36" checked={this.state.input36} readOnly />
																		<span className="checkmark"></span>
																	</label>
																	<label className="checkboxContainer"> Bei intensivierter Insulintherapie
									<input type="checkbox" name="input37" checked={this.state.input37} readOnly />
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
									<input type="checkbox" name="input38" checked={this.state.input38} readOnly />
																				<span className="checkmark"></span>
																			</label>
																		</Grid>
																		<Grid sm={4} >
																			<label className="checkboxContainer"> links
									<input type="checkbox" name="input39" checked={this.state.input39} readOnly />
																				<span className="checkmark"></span>
																			</label>
																		</Grid>
																		<Grid sm={4} ><label className="checkboxContainer">  beidseits
									<input type="checkbox" name="input40" checked={this.state.input40} readOnly />
																			<span className="checkmark"></span>
																		</label>
																		</Grid>
																	</Grid>
																</Grid>

																<Grid className="justify-around">
																	<Grid sm={6} md={6} lg={6}>
																		<label className="checkboxContainer">Kompressionsstrümpfe anziehen
									<input type="checkbox" name="input41" checked={this.state.input41} readOnly />
																			<span className="checkmark"></span>
																		</label>
																	</Grid>
																	<Grid sm={6} md={6} lg={6}>
																		<label className="checkboxContainer">Kompressionsverbände anlegen
									<input type="checkbox" name="input42" checked={this.state.input42} readOnly />
																			<span className="checkmark"></span>
																		</label>
																	</Grid>
																</Grid>
																<Grid className="justify-around">
																	<Grid sm={6} md={6} lg={6}>
																		<label className="checkboxContainer">
																			Kompressionsstrümpfe ausziehen
									<input type="checkbox" name="input43" checked={this.state.input43} readOnly />
																			<span className="checkmark"></span>
																		</label>
																	</Grid>
																	<Grid sm={6} md={6} lg={6}>
																		<label className="checkboxContainer">Kompressionsverbände abnehmen
									<input type="checkbox" name="input44" checked={this.state.input44} readOnly />
																			<span className="checkmark"></span>
																		</label>
																	</Grid>
																</Grid>

																<Grid className="justify-around">
																	<Grid sm={7} md={7} lg={7}>
																		Stutzende und sratabilisierende VerBande, Art
										</Grid>
																	<Grid sm={4} md={4} lg={4}>
																		<input type="text" name="input45" value={this.state.input45} readOnly />
																	</Grid>
																</Grid>
																<Grid className="justify-around">
																	<Grid sm={4} md={4} lg={4}>
																		<h6>Wundversorgung</h6><span>,prepate</span>
																	</Grid>
																	<Grid sm={7} md={7} lg={7}>
																		<input type="text" name="input46" value={this.state.input46} readOnly />
																	</Grid>
																</Grid>
																<Grid >

																	<input type="text" name="input47" value={this.state.input47} readOnly />
																</Grid>
																<Grid className="justify-around" >
																	<Grid sm={3} md={3} lg={3} className="marginAuto">
																		<label className="checkboxContainer">
																			<input type="checkbox" name="input48" checked={this.state.input48} readOnly />
																			<span className="checkmark"></span>
													DeKubitusbehandlung
												</label>
																	</Grid>
																	<Grid sm={3} md={3} lg={3} className="marginAuto">
																		<label>Lokalisation</label>
																		<input type="text" name="input49" value={this.state.input49} readOnly />
																	</Grid>
																	<Grid sm={2} md={2} lg={2} className="marginAuto">
																		<label>aktuelle Große</label>
																		<input type="text" name="input50" value={this.state.input50} readOnly />
																	</Grid>
																	<Grid sm={2} md={2} lg={2} className="marginAuto">
																		<label>aktueller Grad</label>
																		<input type="text" name="input51" value={this.state.input51} readOnly />
																	</Grid>

																</Grid>
																<Grid className="justify-around">
																	<Grid sm={3} md={3} lg={3} className="marginAuto">
																		<label className="checkboxContainer">
																			<input type="checkbox" name="input52" checked={this.state.input52} readOnly />
																			<span className="checkmark"></span>
													andere Wundverbande
												</label>
																	</Grid>
																	<Grid sm={3} md={3} lg={3}>
																		<input type="text" name="input53" value={this.state.input53} readOnly />
																	</Grid>
																	<Grid sm={2} md={2} lg={2}>
																		<input type="text" name="input54" value={this.state.input54} readOnly />
																	</Grid>
																	<Grid sm={2} md={2} lg={2}>

																	</Grid>

																</Grid>
																<Grid>
																	<h6>Sonstige Mapnahmen der Behandlungspflege</h6>
																	<input type="text" name="input55" value={this.state.input55} readOnly />
																	<input type="text" name="input56" value={this.state.input56} readOnly />

																</Grid>
																<Grid>
																	<h6>Anleitung zur Behandlungspflege Fur patient.Angehorige</h6>
																	<input type="text" name="input57" value={this.state.input57} readOnly />

																</Grid>
																<Grid>
																	<h5>Grundpflege und hauswirtschaftliche Versorgung</h5>
																	<Grid className="justify-around">
																		<Grid sm={6} md={6} lg={6} >
																			<Box className="flex-column">
																				<label className="checkboxContainer">Unterstutzungspflege nach $ 37(1) SGB V
												<input type="checkbox" name="input58" checked={this.state.input58} readOnly />
																					<span className="checkmark"></span>
																				</label>
																				<label className="checkboxContainer"> Krankenhausvermeidungspflege nach 37 (1) SGB V
											<input type="checkbox" name="input59" checked={this.state.input59} readOnly />
																					<span className="checkmark"></span>
																				</label>
																				<label className="checkboxContainer"> Grundpflege
												<input type="checkbox" name="input60" checked={this.state.input60} readOnly />
																					<span className="checkmark"></span>
																				</label>
																				<label className="checkboxContainer">Hauswirtschaftlich Versorgung
													<input type="checkbox" name="input61" checked={this.state.input61} readOnly />
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
																						<td><input type="text" name="input62" value={this.state.input62} readOnly /></td>
																						<td><input type="text" name="input63" value={this.state.input63} readOnly /></td>
																						<td><input type="text" name="input64" value={this.state.input64} readOnly /></td>
																						<td><input type="text" name="input65" value={this.state.input65} readOnly /></td>
																						<td><input type="text" name="input66" value={this.state.input66} readOnly /></td>
																					</tr>
																					<tr>
																						<td><input type="text" name="input67" value={this.state.input67} readOnly /></td>
																						<td><input type="text" name="input68" value={this.state.input68} readOnly /></td>
																						<td><input type="text" name="input69" value={this.state.input69} readOnly /></td>
																						<td><input type="text" name="input70" value={this.state.input70} readOnly /></td>
																						<td><input type="text" name="input71" value={this.state.input71} readOnly /></td>
																					</tr>
																				</tbody>
																				<tfoot></tfoot>
																			</table>
																		</Grid>
																	</Grid>
																	<Grid>
																		<h6>Weitere  Hinweise</h6>
																		<input type="text" name="input72" value={this.state.input72} readOnly />
																		<input type="text" name="input73" value={this.state.input73} readOnly />
																		<input type="text" name="input74" value={this.state.input74} readOnly />
																		<input type="text" name="input75" value={this.state.input75} readOnly />
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
																			<td>	<input type="text" name="input118" value={this.state.input118} readOnly /></td>
																			<td>	<input type="text" name="input119" value={this.state.input119} readOnly /></td>
																			<td>	<input type="text" name="input120" value={this.state.input120} readOnly /></td>
																			<td>	<input type="text" name="input121" value={this.state.input121} readOnly /></td>
																			<td>	<input type="text" name="input122" value={this.state.input122} readOnly /></td>
																		</tr>
																		<tr>
																			<td><input type="text" name="input123" value={this.state.input123} readOnly /></td>
																			<td><input type="text" name="input124" value={this.state.input124} readOnly /></td>
																			<td><input type="text" name="input125" value={this.state.input125} readOnly /></td>
																			<td><input type="text" name="input126" value={this.state.input126} readOnly /></td>
																			<td><input type="text" name="input127" value={this.state.input127} readOnly /></td>
																		</tr>
																		<tr>
																			<td><input type="text" name="input128" value={this.state.input128} readOnly /></td>
																			<td><input type="text" name="input129" value={this.state.input129} readOnly /></td>
																			<td><input type="text" name="input130" value={this.state.input130} readOnly /></td>
																			<td><input type="text" name="input131" value={this.state.input131} readOnly /></td>
																			<td><input type="text" name="input132" value={this.state.input132} readOnly /></td>
																		</tr>

																	</tbody>
																	<tfoot></tfoot>
																</table>
															</Grid>
															<Grid mt={10}>
																<table>
																	<tbody>
																		<tr>
																			<td>	<input type="text" name="input76" value={this.state.input76} readOnly /></td>
																			<td>	<input type="text" name="input77" value={this.state.input77} readOnly /></td>
																			<td>	<input type="text" name="input78" value={this.state.input78} readOnly /></td>
																			<td>	<input type="text" name="input79" value={this.state.input79} readOnly /></td>
																			<td>	<input type="text" name="input80" value={this.state.input80} readOnly /></td>
																		</tr>
																	</tbody>
																</table>
															</Grid>
															<Grid mt={10}>
																<table>
																	<tbody>
																		<tr>
																			<td>	<input type="text" name="input81" value={this.state.input81} readOnly /></td>
																			<td>	<input type="text" name="input82" value={this.state.input82} readOnly /></td>
																			<td>	<input type="text" name="input83" value={this.state.input83} readOnly /></td>
																			<td>	<input type="text" name="input84" value={this.state.input84} readOnly /></td>
																			<td>	<input type="text" name="input85" value={this.state.input85} readOnly /></td>
																		</tr>
																		<tr>
																			<td>	<input type="text" name="input86" value={this.state.input86} readOnly /></td>
																			<td>	<input type="text" name="input87" value={this.state.input87} readOnly /></td>
																			<td>	<input type="text" name="input88" value={this.state.input88} readOnly /></td>
																			<td>	<input type="text" name="input89" value={this.state.input89} readOnly /></td>
																			<td>	<input type="text" name="input90" value={this.state.input90} readOnly /></td>
																		</tr>
																	</tbody>
																</table>
															</Grid>
															<Grid mt={10}>
																<table>
																	<tbody>
																		<tr>
																			<td>	<input type="text" name="input91" value={this.state.input91} readOnly /></td>
																			<td>	<input type="text" name="input92" value={this.state.input92} readOnly /></td>
																			<td>	<input type="text" name="input93" value={this.state.input93} readOnly /></td>
																			<td>	<input type="text" name="input94" value={this.state.input94} readOnly /></td>
																			<td>	<input type="text" name="input95" value={this.state.input95} readOnly /></td>
																		</tr>
																	</tbody>

																</table>
															</Grid>
															<Grid mt={10}>
																<table>
																	<tbody>
																		<tr>
																			<td>	<input type="text" name="input96" value={this.state.input96} readOnly /></td>
																			<td>	<input type="text" name="input97" value={this.state.input97} readOnly /></td>
																			<td>	<input type="text" name="input98" value={this.state.input98} readOnly /></td>
																			<td>	<input type="text" name="input99" value={this.state.input99} readOnly /></td>
																			<td>	<input type="text" name="input100" value={this.state.input100} readOnly /></td>
																		</tr>
																		<tr>
																			<td>	<input type="text" name="input101" value={this.state.input101} readOnly /></td>
																			<td>	<input type="text" name="input102" value={this.state.input102} readOnly /></td>
																			<td>	<input type="text" name="input103" value={this.state.input103} readOnly /></td>
																			<td>	<input type="text" name="input104" value={this.state.input104} readOnly /></td>
																			<td>	<input type="text" name="input105" value={this.state.input105} readOnly /></td>
																		</tr>
																	</tbody>
																</table>
															</Grid>
															<Grid mt={10}>
																<table>
																	<tbody>
																		<tr>
																			<td>	<input type="text" name="input106" value={this.state.input106} readOnly /></td>
																			<td>	<input type="text" name="input107" value={this.state.input107} readOnly /></td>
																			<td>	<input type="text" name="input108" value={this.state.input108} readOnly /></td>
																			<td>	<input type="text" name="input109" value={this.state.input109} readOnly /></td>
																			<td>	<input type="text" name="input110" value={this.state.input110} readOnly /></td>
																		</tr>
																		<tr>
																			<td>	<input type="text" name="input111" value={this.state.input111} readOnly /></td>
																			<td>	<input type="text" name="input112" value={this.state.input112} readOnly /></td>
																			<td>	<input type="text" name="input113" value={this.state.input113} readOnly /></td>
																			<td>	<input type="text" name="input114" value={this.state.input114} readOnly /></td>
																			<td>	<input type="text" name="input115" value={this.state.input115} readOnly /></td>
																		</tr>
																	</tbody>
																</table>
															</Grid>
															<Grid>
																<input type="text" name="input116" value={this.state.input116} readOnly />
															</Grid>
															<Grid>
																{/* <textarea rows={5} type="text" name="input117" value={this.state.input117} readOnly /> */}

																<Box>
																	<TextField
																		className="full-width textArea"
																		id="outlined-multiline-static"
																		label="Add Note"
																		multiline
																		rows={4}
																		defaultValue="Default Value"
																		variant="outlined"
																		value={this.state.comment}
																		onChange={this.handleChangeComment}
																	/>
																	<Box className="buttonContainer">
																		<Button variant="outlined" className="primary-bg-btn" color="primary" autoFocus
																			onClick={this.submitComment} >
																			<Box component="span" fontSize="18px" mr={1} className="material-icons">send</Box>
															   Send
														   </Button>
																	</Box>
																</Box>

																<Box className="commentContainer">
																	{
																		this.state.commentList && this.state.commentList.map((res, index) => {
																			return (
																				<Box key={index} className="comment">
																					<Box className="font-2">
																						{this.formate_date(res.created_at)}
																					</Box>
																					<Typography>{res.comment}</Typography>

																				</Box>
																			)
																		})
																	}	<Box >

																	</Box>

																</Box>
															</Grid>
														</Grid>

													</Grid>
												</Grid>

											</Box>
										</CustomCard></Box></Container></div>
						</Box></div>

					: <HulkPageLoader />
				}
			</div>

		);
	}

}
export default sharedDocument;