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
			user: {},
			order: {},
			lastOrder: {},
			lastUser: {},
			comment: "",
			orderId: '',
			commentList: []

		}
		this.submitComment = this.submitComment.bind(this);

	}

	componentWillMount() {

		let orderId = this.props.match.params.id;
		this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		// this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		// let user = JSON.parse(localStorage.getItem('user'));
		// this.instance_id = user.instance_id;
		// this.user_id = user.id;
		this.setState({ orderId });
		userService.getOrderDetail({ orderId: orderId }).then(res => {
			let user = localStorage.getItem('user');
			this.user_id = null;
			if (user) {
				user = JSON.parse(user);
				this.user_id = user.id;
			}


			orderDetail = res;
			let title = 'Medikamentenbestellung ' + res.order.orderId;
			this.setState({ title });
			console.log('res.order.orderId', res);
			if (res.instance.length) this.setState({ instance: res.instance[0] });
			if (res.patient.length) this.setState({ patient: res.patient[0] });
			if (res.doctor.length) this.setState({ doctor: res.doctor[0] });
			if (res.pharmacy.length) this.setState({ pharmacy: res.pharmacy[0] });
			if (res.orderMedications.length) this.setState({ orderMedications: res.orderMedications });
			if (res.commentList.length) this.setState({ commentList: res.commentList });
			if (res.user.length) this.setState({ user: res.user[0] });
			if (res.lastUser.length) this.setState({ lastUser: res.lastUser[0] });
			let order = res.order;

			if (order.created_at) {
				let data = this.formate_date(order.created_at);
				order.date = data.date;
				order.time = data.time;
			}
			console.log('this.comment', this.user_id == this.state.user.id)
			let lastOrder = res.lastOrder;

			if (lastOrder.created_at) {
				let data = this.formate_date(lastOrder.created_at);
				lastOrder.date = data.date;
				lastOrder.time = data.time;
			}

			this.setState({ order: order, lastOrder: lastOrder });

		})

	}
	formate_date(dateString) {
		let str = dateString.split(" ");
		let date = str[0].split('-');
		let time = str[1].split(':');
		date = "am " + date[2] + '.' + date[1] + '.' + date[0];
		time = "um " + time[0] + ':' + time[1];
		let data = { date: date, time: time };
		return data;
	}
	handleChangeComment = (event) => {
		this.setState({ comment: event.target.value });
	}
	submitComment() {
		console.log('{ orderId: this.state.orderId  , user_id : this.user_id , comment : this.state.comment}', this.state.orderId, this.user_id, this.state.comment)
		userService.submitComment({ orderId: this.state.orderId, user_id: this.user_id, comment: this.state.comment }).then(res => {
			console.log('res', res);
			let list = [...this.state.commentList];
			list.push(res);
			this.setState({ commentList: list });

		})
	}
	render() {

		const componentRef = React.createRef();
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
									<Grid item xs={12}  className="text-right">
										<ReactToPrint
											trigger={() => <Button variant="outlined" className="primary-bg-btn" color="primary">Print</Button>}
											content={() => componentRef.current}
										/>
									</Grid>
									<div className="main-invoice" ref={componentRef}>
										<Grid container spacing={3} direction="row"  >
											<Grid item xs={12} sm={9} md={9} lg={10} className="gridItem">
												<Box mb={1}>
													<Box mb="1" className="site-logo user-logo">
														<Link to="/" className="logo-mini mb-1 d-block">
															<img src={this.state.instance.instanceLogo ? this.state.instance.instanceLogo : this.defaultUrl} alt="site logo " width="35" />
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
											<Grid item xs={12} sm={3} md={3} lg={2} className="text-left" className="gridItem">
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
														<Box className="font-2 warp-row">
															{this.state.user.name} <span>
																{this.state.order.date} {this.state.order.time}
															</span>
														</Box>
													</div>
												</Box>

												<Box>
													<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Letzte Bestellung</Box>
													<div className="rowContainer" pt={5} >
														<Box mb="3" className="site-logo user-logo">
															<img src={require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" />
														</Box>
														<Box className="font-2 warp-row">
															{this.state.lastUser.name} <span>
																{this.state.lastOrder.date} {this.state.lastOrder.time}
															</span>
														</Box>
													</div>
												</Box>


												<Box>
													{
														this.user_id == this.state.user.id && <Box>
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
													}

													<Box className="commentContainer">
														{
															this.state.commentList && this.state.commentList.map(res => {
																return (
																	<Box className="comment">
																		<Box className="font-2 warp-row">
																			{res.created_at}
																		</Box>
																		<Typography>{res.comment}</Typography>

																	</Box>
																)
															})
														}	<Box >

														</Box>

													</Box>

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