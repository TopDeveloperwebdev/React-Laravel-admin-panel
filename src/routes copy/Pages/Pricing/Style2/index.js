/**
 * Pricing V2
 */
import React, { Component, Fragment } from 'react';
import Switch from 'react-toggle-switch';
import classNames from 'classnames';
import { Button, Grid, Box, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
// components
import { SmallTitleBar } from 'components/GlobalComponents';

// data
import PricingData from 'assets/Data/Pricingv2.json';

export default class Style2 extends Component {
	state = {
		monthlyPlan: true,
		isBasicActive: false,
		isStandardActive: false,
		isPremiumActive: true,
		selectedPlan: 'Premium',
		data: PricingData.data,
	};
	// on plan change
	onPlanChange(isMonthly) {
		this.setState({ monthlyPlan: !isMonthly });
	}
	onBasicPlanActive() {
		this.setState({ isBasicActive: true })
		this.setState({ isStandardActive: false })
		this.setState({ isPremiumActive: false })
		this.setState({ selectedPlan: 'Basic' })
	}
	onStandardPlanActive() {
		this.setState({ isBasicActive: false })
		this.setState({ isStandardActive: true })
		this.setState({ isPremiumActive: false })
		this.setState({ selectedPlan: 'Standard' })
	}
	onPremiumPlanActive() {
		this.setState({ isBasicActive: false })
		this.setState({ isStandardActive: false })
		this.setState({ isPremiumActive: true })
		this.setState({ selectedPlan: 'Premium' })
	}
	render() {
		return (
			<div className="pricing-wrapper">
				<SmallTitleBar
               title={<IntlMessages id="sidebar.pricingv2" />}
					desc="Downgrade and upgrade any time you want"
				/>
				<div className="page-space">
					<Container>
						<Box px={{ xs: '12px', lg: 0 }}>
							<Box mb={5} display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" alignItems="flex-end">
								<Box display="flex" className="change-switch" alignItems="center" mb={{ xs: 2, sm: 0 }}>
                           <Box component="span"><IntlMessages id="component.monthly" /></Box>
									<Box px={2} lineHeight={1}>
										<Switch onClick={() => this.onPlanChange(this.state.monthlyPlan)} on={this.state.monthlyPlan} />
									</Box>
                           <Box component="span"><IntlMessages id="component.yearly" /></Box>
								</Box>
								<Box width={{ xs: '100%', sm: '60%' }} ml={{ sm: 'auto', md: 0 }} className="have-plan" display="flex" justifyContent="space-around" alignItems="center" >
									<Button onClick={() => this.onBasicPlanActive(this.state.isBasicActive)}
										className={`plan-label ${classNames(this.state.isBasicActive ? "active" : "")}`}>
                              <IntlMessages id="component.basic" />
									</Button>
									<Button onClick={() => this.onStandardPlanActive(this.state.isStandardActive)}
										className={`plan-label ${classNames(this.state.isStandardActive ? "active" : "")}`}>
                              <IntlMessages id="component.standard" />
									</Button>
									<Button onClick={() => this.onPremiumPlanActive(this.state.isPremiumActive)}
										className={`plan-label ${classNames(this.state.isPremiumActive ? "active" : "")}`}>
                              <IntlMessages id="component.premium" />
									</Button>
								</Box>
							</Box>
							<Box mb={7} className="price-list">
								<TableContainer>
									<Table aria-label="simple table">
										<TableBody>
											{this.state.data && this.state.data.map((item, i) => (
												<TableRow key={i}>
													<TableCell className="plan-list" component="th" scope="row">
														{item.name}
													</TableCell>
													<TableCell align="center" className={`feature-status ${classNames(this.state.isBasicActive ? "active" : "")}`}>
														<Fragment>
															{!item.icons && item.basic.constructor.name === 'Array'
																?
																<Fragment>
																	{this.state.monthlyPlan
																		?
																		<span> {item.basic[0]}</span>
																		:
																		<span> {item.basic[1]}</span>
																	}
																</Fragment>
																:
																<Fragment>
																	{
																		!item.icons
																			?
																			<span>{item.basic}</span>
																			:
																			<i className={item.basic}></i>
																	}
																</Fragment>
															}
														</Fragment>
													</TableCell>
													<TableCell align="center" className={`feature-status ${classNames(this.state.isStandardActive ? "active" : "")}`} >
														<Fragment>
															{!item.icons && item.standard.constructor.name === 'Array'
																?
																<Fragment>
																	{this.state.monthlyPlan
																		?
																		<span> {item.standard[0]}</span>
																		:
																		<span> {item.standard[1]}</span>
																	}
																</Fragment>
																:
																<Fragment>
																	{
																		!item.icons
																			?
																			<span>{item.standard}</span>
																			:
																			<i className={item.standard}></i>
																	}
																</Fragment>
															}
														</Fragment>
													</TableCell>
													<TableCell align="center" className={`feature-status ${classNames(this.state.isPremiumActive ? "active" : "")}`}>
														<Fragment>
															{!item.icons && item.premium.constructor.name === 'Array'
																?
																<Fragment>
																	{this.state.monthlyPlan
																		?
																		<span> {item.premium[0]}</span>
																		:
																		<span> {item.premium[1]}</span>
																	}
																</Fragment>
																:
																<Fragment>
																	{
																		!item.icons
																			?
																			<span>{item.premium}</span>
																			:
																			<i className={item.premium}></i>
																	}
																</Fragment>
															}
														</Fragment>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
							<Box textAlign="center" mb={5}>
								<Button size="large" variant="outlined" className="primary-bg-btn" color="primary">
                           <IntlMessages id="component.purchasePlan" />
								</Button>
								<Box display="block" component="span" fontSize="subtitle2.fontSize" color="success.main" pt={2}>			
                        {this.state.selectedPlan} Plan selected
								</Box>
							</Box>
							<div className="text-center bg-white custom-sec">
								<Grid container spacing={3} justify="center">
									<Grid item xs={12} sm={12} md={4}>
                              <Typography variant="h3">
                                 <IntlMessages id="component.stillHaveQueries" />
                              </Typography>
                              <Typography variant="body2" className="mt-1">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={3} justify="center">
									<Grid item xs={12} sm={12} md={3}>
										<div className="text-center">
											<div className="contact-us-item">
												<div className="contact-us--icon">
													<i className="fa fa-phone transform-icon font-xl" aria-hidden="true"></i>
												</div>
												<div className="contact-us--content mt-1">
                                       <Typography variant="h5"><IntlMessages id="component.callUsAnyTime" /></Typography>
													<Typography className="mt-1" variant="body2"><a className="text-disabled" href="# ">+0123 45678 90</a></Typography>
													<Typography variant="body2"><a className="text-disabled" href="# ">+0123 45678 90</a></Typography>
												</div>
											</div>
										</div>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<div className="text-center">
											<div className="contact-us-item">
												<div className="contact-us--icon">
													<i className="fa fa fa-envelope-o font-xl" aria-hidden="true"></i>
												</div>
												<div className="contact-us--content mt-1">
                                       <Typography variant="h5"><IntlMessages id="component.dropUsALine" /></Typography>
													<Typography className="mt-1 text-over" variant="body2"><a className="text-disabled" href="mailto:support@theironnetwork.org">support@theironnetwork.org</a></Typography>
													<Typography variant="body2" className="text-over"><a href="mailto:support@theironnetwork.org" className="text-disabled">support@theironnetwork.org</a></Typography>
												</div>
											</div>
										</div>
									</Grid>
								</Grid>
							</div>
						</Box>
					</Container>
				</div>
			</div>
		);
	}
}