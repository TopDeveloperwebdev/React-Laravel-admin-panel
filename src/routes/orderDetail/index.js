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
		this.setState({ orderId });
		userService.getOrderDetail({ orderId: orderId }).then(res => {
			let user = localStorage.getItem('user');
			this.user_id = null;
			if (user) {
				user = JSON.parse(user);
				this.user_id = user.id;
			}
			orderDetail = res;
			let title = res.order.orderId;
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
			else {
				this.setState({ lastUser: null });
			}
			let order = res.order;

			if (order.created_at) {
				let data = this.formate_date(order.created_at);
				order.date = data;

			}

			let lastOrder = res.lastOrder;

			if (lastOrder.created_at) {
				lastOrder.date = this.formate_date(lastOrder.created_at);
			}

			this.setState({ order: order, lastOrder: lastOrder });

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
					{/* <SmallTitleBar
						title={<IntlMessages id={this.state.title} />}
						buttonText={<IntlMessages id="component.backToMedications" />}
						buttonLink="/app/manage-orders"

					/> */}
					<div className="page-space orderdetail">
						<Container ref={componentRef}>
							<Box px={{ xs: "12px", lg: 0 }}>

								<CustomCard>
									<Grid container spacing={3} direction="row"  >
										<Grid item xs={12} sm={8} md={8} lg={8} className="gridItem ">
											<Box className="header">
												<Box mb={1}>
													<Box mb="1" className="site-logo user-logo">
														<Link to="/" className="logo-mini mb-1 d-block">
															<img src={this.state.instance.instanceLogo ? this.state.instance.instanceLogo : this.defaultUrl} alt="site logo " width="35" />
														</Link>
													</Box>
												</Box>
												<Box fontSize="body2.fontSize">{this.state.title}</Box>
											</Box>

											<Box className="printBtn"><ReactToPrint
												trigger={() => <PrintOutlinedIcon size="30px" />}
												content={() => componentRef.current}
											/></Box>
											<Box className="patient">
												<Box className="title-fontSize" color="text.primary" fontWeight="500"><span className="titlecolor">Bestellung für</span> <span>{this.state.patient.firstName}  {this.state.patient.lastName}</span></Box>
												<Box className="content-fontSize">{this.state.patient.streetNr} {this.state.patient.zipCode} {this.state.patient.city} {this.state.patient.phone1} {this.state.patient.insurance} {this.state.patient.insuranceNr}</Box>

											</Box>

											<Box mb={4} className="medication">
												{this.state.orderMedications.map((row, index) => (
													<CustomCard key={index}><Box component="th" scope="row">
														{row.medicationName}
													</Box>
														<Box align="right">{row.ingredients}</Box>
														<Box align="right">{row.packaging}</Box>
													</CustomCard>

												))}

											</Box>
											<Box my={2}>
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
														this.state.commentList && this.state.commentList.map(res => {
															return (
																<Box className="comment">
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


											</Box>
										</Grid>
										<Grid item xs={12} sm={4} md={4} lg={4} className="text-left" className="gridItem-right">
											<Box >
												<Box className="title-fontSize" fontWeight="500">Hausarzt</Box>
												<Box className="content-fontSize"><Typography>{this.state.doctor.practiceName}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.doctor.streetNr}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.doctor.phone}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.doctor.fax}</Typography></Box>
											</Box>

											<Box >
												<Box className="title-fontSize" fontWeight="500">Apotheke</Box>
												<Box className="content-fontSize"><Typography>{this.state.pharmacy.pharmacyName}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.pharmacy.streetNr}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.pharmacy.phone}</Typography></Box>
												<Box className="content-fontSize"><Typography>{this.state.pharmacy.fax}</Typography></Box>
											</Box>

											<Box>

												<div className="rowContainer" pt={5} >
													<Box mb="3" className="site-logo user-logo">
														<img src={this.state.user.userAvatar ? this.state.user.userAvatar : require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" />
													</Box>
													<Box className="font-2 warp-row">
														<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Bestellung von   {this.state.user.name}</Box>
														<Box> am  {this.state.order.date}</Box>
													</Box>
												</div>
											</Box>
											<Box>
												{
													this.state.lastUser ?
														< div className="rowContainer" pt={5} >
															<Box mb="3" className="site-logo user-logo">
																<img src={this.state.lastUser.userAvatar ? this.state.lastUser.userAvatar : require('assets/Images/avatars/user-1.jpg')} alt="search" width="45" height="45" />
															</Box>
															<Box className="font-2 warp-row">
																<Box fontSize="body2.fontSize" color="text.primary" fontWeight="500">Letzte Bestellung  {this.state.lastUser.name}</Box>
																<Box>am  {this.state.lastOrder.date}</Box>
															</Box>
														</div> : < div className="rowContainer" pt={5} ><Box className="font-2 warp-row">
															<Box>keine vorherigen Bestellungen vorhanden</Box>

														</Box></div>
												}

											</Box>
										</Grid>
									</Grid>

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