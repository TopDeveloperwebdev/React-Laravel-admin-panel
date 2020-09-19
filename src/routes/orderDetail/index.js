import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import {
	Grid, Typography, Box, Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow, Paper, Divider, Container
} from '@material-ui/core';
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import { userService } from '../../_services';

let orderDetail = {};

class OrderDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Medikamentenbestellung',
			instance: {},
			patient: {},
			doctor: {},
			pharmacy: {},
			orderMedications: [],
			user: {}

		}


	}

	componentWillMount() {

		let orderId = this.props.match.params.id;
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		// this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		// let user = JSON.parse(localStorage.getItem('user'));
		// this.instance_id = user.instance_id;
		// this.user_id = user.id;

		userService.getOrderDetail({ orderId: orderId }).then(res => {

			orderDetail = res;
			let title = 'Medikamentenbestellung ' + res.order.orderId;
			this.setState({ title });
			console.log('res.order.orderId', res);
			if (res.instance.length) this.setState({ instance: res.instance[0] });
			if (res.patient.length) this.setState({ patient: res.patient[0] });
			if (res.doctor.length) this.setState({ doctor: res.doctor[0] });
			if (res.pharmacy.length) this.setState({ pharmacy: res.pharmacy[0] });
			if (res.orderMedications.length) this.setState({ orderMedications: res.orderMedications });
			if (res.user.length) this.setState({ user: res.user[0] });
		})

	}

	render() {
		console.log('title', this.state.title);
		return (

			<div className="order-detail vh-100">
				
			

					<Box className="white-btn-color">
						<SmallTitleBar
							title={<IntlMessages id={this.state.title} />}
							buttonText={<IntlMessages id="component.backToMedications" />}
							buttonLink="/app/manage-orders"
						/>
						<div className="page-space">
							<Container>
								<Box px={{ xs: "12px", lg: 0 }}>
									<CustomCard>
										<div className="main-invoice">
											<Grid container spacing={3} direction="row" >
												<Grid item xs={12} sm={10} className="gridItem">
													<Box mb={1}>
														<Box mb="1" className="site-logo">
															<Link to="/" className="logo-mini mb-1 d-block">
																<img src={this.defaultUrl} alt="site logo" width="35" />
															</Link>
														</Box>
													</Box>

													<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Rezeptanfrage für</Box>
													<div className="rowContainer">
														<Box>
															<Typography>Peter Meier :  {this.state.patient.firstName} {this.state.patient.lastName}</Typography>
															<Typography>Hansastr :  - 29528</Typography>
														</Box>

														<Box>
															<Typography>Versicherung :  {this.state.patient.insurance}</Typography>
															<Typography>Versicherte Nr :   {this.state.patient.streetNr}</Typography>
														</Box>
														<Box>
															<Typography className="text-over">Telefon 1: {this.state.patient.phone1}</Typography>
															<Typography className="text-over">Telefon2 :  {this.state.patient.phone2}</Typography>
														</Box>

													</div>

													<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Liebe Kollegen</Box>
													<Box>
														<Typography>
															unser gemeinsame patient <span className="name">{this.state.patient.firstName} {this.state.patient.lastName} </span> benötigt folgende Medikamente/Hilfsmittel für die Durchfuhrung der Behandlungspflege</Typography>
													</Box>
													<Box mb={4}>
														<TableContainer >
															<Table aria-label="customized table">
																<TableHead>
																	<TableRow>
																		<TableCell>Medikament</TableCell>
																		<TableCell align="right">Inhaltsstoffe</TableCell>
																		<TableCell align="right">Packungsgröße</TableCell>
																	</TableRow>
																</TableHead>
																<TableBody>
																	{this.state.orderMedications.map((row, index) => (
																		<TableRow key={index}>
																			<TableCell component="th" scope="row">
																				{row.medicationName}
																			</TableCell>
																			<TableCell align="right">{row.ingredients}</TableCell>
																			<TableCell align="right">{row.packaging}</TableCell>

																		</TableRow>
																	))}
																</TableBody>
															</Table>
														</TableContainer>
													</Box>
													<Box my={2}>

														<Typography >	Wir Möchten sie bitten für die folgende Bestellung Rezepte auszustellen und diese per post au schicken an : <span className="name"> Apotheke . {this.state.pharmacy.pharmacyName} Tonstr . {this.state.pharmacy.streetNr}</span>.Senden Sie die Rezopte bitee zorabe per Fax an , sodass eine luckenlose Versorgung der patienten gewahrleistet werden kann. <span className="name">{this.state.pharmacy.phone}</span></Typography>

													</Box>
													<Box my={5} className="footerContainer">
														<Typography >Bei Ruckfragen stehen Wir Ihnen gerne zur Verfugung.</Typography>
														<Typography >Mit freundlichen GruBen.</Typography>
														<Typography >{this.state.instance.instaneName}</Typography>
													</Box>
												</Grid>
												<Grid item xs={12} sm={2} className="text-left" className="gridItem">
													<Box>
														<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Rezeptausstellung von</Box>
														<Typography>{this.state.doctor.practiceName}</Typography>
														<Typography>{this.state.doctor.streetNr}</Typography>
														<Typography>Tel . {this.state.doctor.phone}</Typography>
														<Typography>Fax . {this.state.doctor.fax}</Typography>

													</Box>
													<Box>
														<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Lieferung durch</Box>
														<Typography>Apotheke . {this.state.pharmacy.pharmacyName}</Typography>
														<Typography>Tonstr . {this.state.pharmacy.streetNr}</Typography>
														<Typography>Tel . {this.state.pharmacy.phone}</Typography>
														<Typography>Fax . {this.state.pharmacy.fax}</Typography>

													</Box>
													<Box>
														<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Bestellung von</Box>
														<div className="rowContainer" pt={5} >
															<Box mb="3" className="site-logo user-logo">
																<img src={require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" />
															</Box>
															<Box>
																<Typography>Name . {this.state.user.name}</Typography>
																<Typography>E-mail . {this.state.user.email}</Typography>
															</Box>
														</div>
													</Box>

												</Grid>
											</Grid>

										</div>
									</CustomCard>

								</Box>
							</Container>
						</div>
					</Box>
				


			</div >
		);
	}

}
export default OrderDetail;