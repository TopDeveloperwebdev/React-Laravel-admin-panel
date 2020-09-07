import React, { Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import { ListItemSecondaryAction, Badge, ListItemText, ListItemAvatar, Button, Divider, IconButton, Box, List, ListItem, ListSubheader, Popover, Tooltip, Typography } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { ConfirmationDialog } from 'components/GlobalComponents';

import { deleteItemFromWishlist } from 'actions'

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
		minWidth: 270,
		padding: 0,

		'& >li': {
			borderBottom: `1px solid ${theme.palette.divider}`,
		}
	},
	emptyBlock: {
		width: '100%',
		minWidth: 270,
	},
	content: {
		paddingLeft: 5
	},
	avatar: {
		lineHeight: 0.9,
	}
});

class Wishlist extends React.Component {

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
	onDeleteWishlistItem(item) {
		this.item = item;
		this.confirmationDialog.current.openDialog();
	}

	//Function for delete cart product
	deleteWishlistItem(popupResponse) {
		if (popupResponse) {
			this.props.deleteItemFromWishlist(this.item);
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
		const { wishlist } = this.props;
		const { classes } = this.props;
		return (
			<div>
				<Tooltip title="Wishlist" placement="bottom">
					<IconButton aria-describedby={open ? 'simple-popper' : null} variant="contained" color="primary"
						style={{ padding: '6px' }}
						onClick={this.handleClick}>
						{wishlist && wishlist.length > 0 ?
							(
								<Badge className={classes.badgeItem} badgeContent={wishlist.length} color="secondary">
									<Box component="span" className={`material-icons-outlined ${this.props.iconColor}`}>favorite_border</Box>
								</Badge>
							)
							:
							(
								<Box component="span" className={`material-icons-outlined ${this.props.iconColor}`}>favorite_border</Box>
							)
						}
					</IconButton>
				</Tooltip>
				<Popover
					id="simple-popper"
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
					<div>
						{(wishlist && wishlist.length > 0) ?
							<Fragment>
								<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280} autoHide>
									<List className={classes.root}
										component="nav"
										aria-labelledby="nested-list-subheader"
										subheader={
											<ListSubheader component="div" id="nested-list-subheader">
												<div className="dropdown-header text-center">
													
													<Typography variant="body2">Wishlist Items</Typography>
												</div>
											</ListSubheader>
										}
									>
										{wishlist.map((item, index) => (
											<ListItem key={index}>
												<ListItemAvatar className={classes.avatar}>
													<img alt="product-thumb" width="50" height="60" src={require(`assets/Images/${item.image}`)} />
												</ListItemAvatar>
												<ListItemText className={classes.content}>
													<Typography variant="body2">{item.name}</Typography>
													<Typography variant="body1" color="textSecondary">$ {item.price}</Typography>
												</ListItemText>
												<ListItemSecondaryAction>
													<IconButton size="small" edge="end" aria-label="delete" onClick={() => this.onDeleteWishlistItem(item)}>
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
									<Button variant="outlined" className="primary-bg-btn" color="primary">
										Add to cart
									</Button>
								</Box>
							</Fragment>
							:
							<Fragment>
								<Box className={classes.emptyBlock} p={3} textAlign="center">
									<Box component="span" color="primary.main" className="material-icons">favorite_border</Box>
									<Box color="text.primary">
										No Items Found
									</Box>
								</Box>
							</Fragment>
						}
					</div>
					<ConfirmationDialog
						ref={this.confirmationDialog}
						onConfirm={(res) => this.deleteWishlistItem(res)}
					/>
				</Popover>
			</div>
		);
	}
}
// map state to props
const mapStateToProps = ({ ecommerce }) => {
	const { wishlist } = ecommerce
	return { wishlist };
}

export default withRouter(connect(mapStateToProps, {
	deleteItemFromWishlist
})(withStyles(styles)(Wishlist)));