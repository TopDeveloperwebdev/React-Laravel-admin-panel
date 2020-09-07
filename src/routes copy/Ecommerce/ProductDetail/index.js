
/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { Button, Grid, Typography, Box, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { SmallTitleBar } from 'components/GlobalComponents';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import products from 'assets/Data/Products';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductReview from './Reviews';
import OtherProducts from './OtherProducts';
import { onAddItemToCart, onAddItemToWishlist } from "actions/EcommerceActions";
import IntlMessages from 'util/IntlMessages';

class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProducts: products.data,
			selectedProduct: null,
			relatedProducts: null
		}
	}
	UNSAFE_componentWillMount() {
		const { match } = this.props;
		var product = this.state.allProducts.filter((product, i) => {
			return product.productID == match.params.id
		})
		this.state.selectedProduct = product[0];

		var otherProduct = this.state.allProducts.filter((product, i) => {
			return product.productID != match.params.id
		})
		this.state.relatedProducts = otherProduct;
	}

	onPressAddToWishlist(wishItem, e) {
		setTimeout(() => {
			this.props.onAddItemToWishlist(wishItem);
		}, 1000)
		e.preventDefault();
	}

	onPressAddToCart(cartItem, e) {
		setTimeout(() => {
			this.props.onAddItemToCart(cartItem);
		}, 1000)
		e.preventDefault();
	}

	isItemExistInCart(id) {
		const { cart } = this.props;
		let existence = false
		for (const item of cart) {
			if (item.productID === id) {
				existence = true
			}
		}
		return existence;
	}

	onCartPage(e) {
		this.props.history.push('/app/ecommerce/cart');
	}

	isItemExistInWishlist(id) {
		const { wishlist } = this.props;
		let existence = false
		for (const item of wishlist) {
			if (item.productID === id) {
				existence = true
			}
		}
		return existence;
	}

	render() {
		const { selectedProduct, allProducts, relatedProducts } = this.state;
		return (
			<div className="product-detail-page">
				<Box className="white-btn-color">
					<SmallTitleBar
						title={<IntlMessages id="component.productDetails" />}
						buttonText={<IntlMessages id="component.backToProducts" />}
						buttonLink="/app/ecommerce/shop"
					/>
				</Box>
				<div className="page-space-top">
					<Container maxWidth="lg">
						<Box px={{ xs: '12px', lg: 0 }}>
							<Grid container spacing={3} direction="row">
								<Grid item xs={12} sm={12} md={8}>
									<Grid container spacing={3} direction="row">
										{selectedProduct.image_gallery.map((image, i) => (
											<Grid item xs={12} sm={6} md={6} key={i}>
												<img className="img-fluid" src={require(`assets/Images/${image}`)}></img>
											</Grid>
										))}
									</Grid>
								</Grid>
								<Grid item xs={12} sm={12} md={4}>
									<Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
										<span>{selectedProduct.category}</span>
										<Box fontWeight="fontWeightMedium">
											<p className="product-price m-0">${selectedProduct.price}</p>
										</Box>
									</Box>
									<Box mb={3}>
										<Box mb={1}>
											<Typography variant="h5">
												{selectedProduct.name}
											</Typography>
										</Box>
									</Box>
									<div className="colorOptions">
										<Grid container spacing={1} direction="row" justify="center" alignItems="center">
											{selectedProduct.image_gallery.map((image, i) => (
												<Fragment key={i} >
													{i < 3 &&
														<Grid item xs={3} sm={4} md={4} className="test">
															<img className="img-fluid" width="100" src={require(`assets/Images/${image}`)}></img>
														</Grid>
													}
												</Fragment>
											))}
										</Grid>
									</div>
									<div>
										<Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
											<span>Select Size</span>
											<Box fontWeight="fontWeightMedium" color="primary.main">Size Guide</Box>
										</Box>
										<div className="sizeGuide">
											<Grid container spacing={2} direction="row" justify="center" alignItems="center">
												<Grid item xs={4} sm={4}>
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" borderRadius="5" justifyContent="center">
														38
													</Box>
												</Grid>
												<Grid item xs={4} sm={4}>
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" justifyContent="center">
														40
													</Box>
												</Grid>
												<Grid item xs={4} sm={4}>
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" justifyContent="center">
														42
													</Box>
												</Grid>
												<Grid item xs={4} sm={4}>
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" justifyContent="center">
														44
													</Box>
												</Grid>
												<Grid item xs={4} sm={4} justifycontent="center">
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" justifyContent="center">
														46
													</Box>
												</Grid>
												<Grid item xs={4} sm={4} justifycontent="center">
													<Box borderColor="grey.400" display="flex" border={1} py={1} className="bg-white" justifyContent="center">
														48
													</Box>
												</Grid>
											</Grid>
										</div>
									</div>
									<Box display="flex" alignItems="center" borderColor="grey.200" justifycontent="space-between">
										<Box>
											<Box mb={2}>
												{!this.isItemExistInCart(selectedProduct.productID) ?
													<Button variant="outlined" className="blockBtn primary-bg-btn" onClick={(e) => this.onPressAddToCart(selectedProduct, e)} color="primary">
														<IntlMessages id="component.addToCart" />
													</Button>
													:
													<Button variant="outlined" className="blockBtn primary-bg-btn" onClick={(e) => this.onCartPage()} color="primary">
														<IntlMessages id="component.viewCart" />
													</Button>
												}
											</Box>
											{!this.isItemExistInWishlist(selectedProduct.productID) ?
												<Button variant="outlined" onClick={(e) => this.onPressAddToWishlist(selectedProduct, e)} className="blockBtn" color="primary">
													<IntlMessages id="component.addtowishlist" />
												</Button>
												:
												<Button variant="outlined" disabled className="blockBtn">
													<IntlMessages id="component.addtowishlist" />
												</Button>
											}
											<Box mt={2} className="product-content">
												<p className="mt-0">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. voluptate velit esse cillum dolore eu fugiat nulla pariatur voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
												<p><strong>Color:</strong> <span>Orange/Brown/Yellow</span></p>
												<p><strong>Article No:</strong> <span>HU-909HI</span></p>
											</Box>
										</Box>
									</Box>
									<div>
										<ExpansionPanel className="product-accordion">
											<ExpansionPanelSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography variant="body2">Free Delivery and Return</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails>
												<div>
													<p>For free delivery total amount should be more than $350. Please add items worth $50 more to your cartfor free delivery.</p>
													<p>Product can be returned until 7 next days from the delivery date free of cost.</p>
													<p>Know more from our <a href="#">Terms and Conditions</a></p>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
										<ProductReview></ProductReview>
									</div>
								</Grid>
							</Grid>
							<OtherProducts
								relatedProducts={relatedProducts}
							></OtherProducts>
						</Box>
					</Container>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ ecommerce }) => {
	const { cart, wishlist } = ecommerce;
	return { cart, wishlist };
}

export default connect(mapStateToProps, { onAddItemToCart, onAddItemToWishlist })(ProductDetail);