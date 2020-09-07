/**
 * Cart Page
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, TextField, Box, Container } from '@material-ui/core';
import { PageTitleBarWithImage, ConfirmationDialog } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

//Actions
import { deleteItemFromCart, onChangeProductQuantity } from "actions/EcommerceActions";

class Cart extends Component {

	constructor(props) {
		super(props)
		this.confirmationDialog = React.createRef();
		this.state = {
			anchorEl: null,
		};
	}

	onChangeQuantity(quantity, cartItem) {
		if (quantity > 0) {
			this.props.onChangeProductQuantity(quantity, cartItem);
		}
	}

	//Get Total Price
	getTotalPrice() {
		const { cart } = this.props;
		let totalPrice = 0;
		for (const item of cart) {
			totalPrice += item.totalPrice
		}
		return totalPrice.toFixed(2);
	}

	isCartEmpty() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return true;
		}
	}

	onCheckoutPage(e) {
		this.props.history.push('/app/ecommerce/signin');
	}

	onDeleteCartItem(item) {
		this.item = item;
		this.confirmationDialog.current.openDialog();
	}

	deleteCartItem(popupResponse) {
		if (popupResponse) {
			this.props.deleteItemFromCart(this.item);
			this.item = ""
		}
		this.setState({
				anchorEl: null,
			}
		)
   }
   
	render() {
		const { cart } = this.props;
		return (
			<div className="cart-page white-btn-color">
				<PageTitleBarWithImage
               title={<IntlMessages id="component.yourProductCart" />}
					desc="Manage your shopped products and proceed for payment"
					image="title-cart.png"
               buttonText={<IntlMessages id="component.continueShopping" />}
					buttonLink="/app/ecommerce/shop"
				/>
				<div className="page-space">
					<Container maxWidth="lg">
						{cart.length > 0 ?
							<Fragment>
								<Box py="12px" px={{ xs: 3, lg: 0 }}>
									<Grid container spacing={3} direction="row" className="cart-wrapper">
										<Grid item xs={12} sm={12} md={8}>
											<Box className="cart-main">
												<Box mb={5}>
													<Typography variant="h5">
                                          <IntlMessages id="component.myShoppingBag" />
													</Typography>
													<Typography variant="subtitle2" className="text-dark">({cart.length} Items)</Typography>
												</Box>
												<div className="cart-list-wrap">
													{!this.isCartEmpty() ? cart.map((cart, index) => (
														<div className="cart-list-item" key={index}>
															<Box className="cart-item-thumb" mb={{ xs:2, sm:0 }}>
																<img alt="cart-thumb" className="img-fluid" src={require(`assets/Images/${cart.image}`)}></img>
															</Box>
															<Box className="cart-item-content" pl={{ xs:0, sm:2 }} mb={{ xs:2, sm:0 }}>
																<div className="cart-detail text-dark">
																	<Typography variant="h6">{cart.name}</Typography>
																	<Typography variant="body2">Article No : LO45687</Typography>
																	<Typography variant="body2">Color : Red</Typography>
																	<Typography variant="body2">Material : Cotton</Typography>
																	<Typography variant="body2">Size : L</Typography>
																</div>
															</Box>
															<Box className="cart-item-action">
																<Box display="flex" justifyContent="flex-end">
																	<TextField className="cart-counter"
																		id="outlined-number"
																		type="number"
																		value={cart.productQuantity}
																		onChange={(e) => this.onChangeQuantity(e.target.value, cart)}
																		InputLabelProps={{
																			shrink: true,
																		}}
																		variant="outlined"
																	/>
																	<Typography className="cart-item-price">
																		${cart.price}
																	</Typography>
																</Box>
																<Box display="flex" justifyContent="flex-end">
																	<Button
																		className="cart-delete"
																		onClick={() => this.onDeleteCartItem(cart)}
																	>
																		<Box component="span" className="material-icons-outlined">delete</Box>
																	</Button>
																</Box>
															</Box>
														</div>
													)) :
														<div className="cart-list-item">
															<Grid container spacing={3} direction="row">
																<div className="text-center h-25">
																	<span className="d-block font-5x mb-30 text-danger">
																		<i className="zmdi zmdi-shopping-cart"></i>
																	</span>
																	<span className="mb-20 font-3x"></span>
																</div>
															</Grid>
														</div>
													}
												</div>
												<Box className="subtotal" p={4}>
													<Box display="flex" className="text-dark font-lg" justifyContent="space-between">
                                          <p><IntlMessages id="component.subtotal" />:</p>
														<p>${this.getTotalPrice()}</p>
													</Box>
													<Box display="flex" className="text-dark font-lg" justifyContent="space-between">
                                          <p><IntlMessages id="component.tax" />: <span className="font-sm">(14% sales tax all across the country)</span>	 </p>
														<p>$0.00</p>
													</Box>
													<Box display="flex" className="text-dark font-lg" justifyContent="space-between">
                                          <p><strong> <IntlMessages id="component.total" />:</strong></p>
														<p><strong>${this.getTotalPrice()}</strong></p>
													</Box>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} md={4} className="cart-action-panel">
											<Box display="flex" justifyContent="space-between" mb={3}>
                                    <p className="font-lg text-dark"><IntlMessages id="component.yourBill" />:</p>
												<p className="font-lg text-dark">${this.getTotalPrice()}</p>
											</Box>
											<Button variant="outlined" className="blockBtn" color="primary">
                                    <IntlMessages id="component.saveShoppingBag" />
											</Button>
											<Box my={4}>
												<Typography variant="subtitle2">
													Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.
												</Typography>
											</Box>
											<Button variant="outlined" onClick={(e) => this.onCheckoutPage()} className="blockBtn primary-bg-btn" color="primary">
                                    <IntlMessages id="component.proceedToCheckout" />
											</Button>
										</Grid>
									</Grid>
									<ConfirmationDialog
										ref={this.confirmationDialog}
										onConfirm={(res) => this.deleteCartItem(res)}
									/>
								</Box>
							</Fragment>
							:
							<Box py={10} textAlign="center">
								<Box mb={2}>
									<img alt="cart-icon" src={require('assets/Images/cart-icon.png')}/>
								</Box>
								<Box  fontSize="h2.fontSize">Your Shopping Cart Is Empty!</Box>
							</Box>
						}
					</Container>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ ecommerce }) => {
	const { cart } = ecommerce;
	return { cart };
}

export default connect(mapStateToProps, {
	deleteItemFromCart,
	onChangeProductQuantity
})(Cart);