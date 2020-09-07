/**
 * Functional componnet to add cart functionality in our application
 */
import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { ListItemSecondaryAction, Badge, ListItemText, ListItemAvatar, Button, Divider, IconButton, Box, List, ListItem, ListSubheader, Popover, Tooltip, Typography } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { ConfirmationDialog } from 'components/GlobalComponents';

import { deleteItemFromCart } from 'actions';

const styles = theme => ({
	badgeItem: {
		[theme.breakpoints.down('xs')]: {
			'& .MuiBadge-badge': {
				height: 15,
				padding: '0 4px',
				fontSize: '0.8rem',
				minWidth: 15,
			},
		},
	},
	root: {
		width: '100%',
		minWidth: 330,
		padding: 0,
	},
	emptyBlock: {
		width: '100%',
		minWidth: 330,
	},
	content: {
		paddingLeft: 5
	},
	avatar: {
		lineHeight: 0.9,
	}
});

class Cart extends React.Component {

	constructor(props) {
		super(props)
		this.confirmationDialog = React.createRef();
		this.state = {
			anchorEl: null,
		};
	}

	//Define function for open dropdown
	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
	};

	//Define function for close dropdown
	handleClose = () => {
		this.setState({
			anchorEl: null,
		});
	};

	//Function to delete product from cart
	onDeleteCartItem(item) {
		this.item = item;
		this.confirmationDialog.current.openDialog();
	}

	//Function for delete cart product
	deleteCartItem(popupResponse) {
		if (popupResponse) {
			this.props.deleteItemFromCart(this.item);
			this.item = ""
		}
		this.setState(
			{
				anchorEl: null,
			}
		)
	}

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const { classes } = this.props;
      const { cart } = this.props;
		return (
			<div>
				<Tooltip title="Shopping Cart" placement="bottom">
					<IconButton aria-describedby={open ? 'simple-user' : null} variant="contained" color="primary"
						style={{ padding: '6px' }}
						onClick={this.handleClick}>
						{cart && cart.length > 0 ?
							(
								<Badge className={classes.badgeItem} badgeContent={cart.length} color="secondary">
									<Box component="span" className={`material-icons-outlined ${this.props.iconColor}`}>shopping_cart</Box>
								</Badge>
							)
							:
							(
								<Box component="span" className={`material-icons-outlined ${this.props.iconColor}`}>shopping_cart</Box>
							)
						}
					</IconButton>
				</Tooltip>
				<Popover
					id="simple-user"
					open={open}
					anchorEl={anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<div className="cart-list-wrap">
						{(cart && cart.length > 0) ?
							<Fragment>
								<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280} autoHide>
									<List className={classes.root}
										component="nav"
										aria-labelledby="nested-list-subheader"
										subheader={
											<ListSubheader component="div" id="nested-list-subheader">
												<div className="dropdown-header text-center">
													<Typography variant="body2">Cart Items</Typography>
												</div>
											</ListSubheader>
										}
									>
										{cart && cart.map((item, index) => (
											<ListItem key={index} component="li" className="list-item">
												<ListItemAvatar className={classes.avatar}>
													<img alt="product-thumb" width="50" height="60" src={require(`assets/Images/${item.image}`)} />
												</ListItemAvatar>
												<ListItemText className={classes.content}>
													<Typography variant="body2">{item.name}</Typography>
													<Typography variant="body1" color="textSecondary">$ {item.price}</Typography>
												</ListItemText>
												<ListItemSecondaryAction>
													<IconButton size="small" edge="end" aria-label="delete" onClick={() => this.onDeleteCartItem(item)}>
														<i className="material-icons-outlined">
															close
														</i>
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										))}
									</List>
								</Scrollbars>
								<Divider />
								<Box textAlign="center" px={2} py={1}>
									<Button variant="outlined"  href="/app/ecommerce/checkout">
										Checkout
									</Button>
								</Box>
							</Fragment>
							:
							<Fragment>
								<Box className={classes.emptyBlock} p={3} textAlign="center">
									<Box component="span" color="primary.main" className="material-icons">shopping_cart</Box>
									<Box color="text.primary">
										No Items Found
									</Box>
								</Box>
							</Fragment>
						}
					</div>
					<ConfirmationDialog
						ref={this.confirmationDialog}
						onConfirm={(res) => this.deleteCartItem(res)}
					/>
				</Popover>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ ecommerce }) => {
   const { cart } = ecommerce
	return { cart };
}

export default withRouter(connect(mapStateToProps, {
	deleteItemFromCart
})(withStyles(styles)(Cart)));