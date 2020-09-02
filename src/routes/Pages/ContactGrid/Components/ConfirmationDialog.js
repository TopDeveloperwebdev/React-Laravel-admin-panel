/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import {Button, Box,Typography, Dialog, DialogActions, DialogContent } from '@material-ui/core';

class ConfirmationDialog extends React.Component {

	state = {
		open: false,
	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true });
	};

	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false });
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false });
		this.props.onConfirm(isTrue)
	};

	render() {
		return (
			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
			>
				<DialogContent>
					<Box textAlign="center" pt={2}>
						<Typography variant="h5">
							Are you sure you want to delete this contact permanently?
					</Typography>
					</Box>
				</DialogContent>
				<DialogActions className="px-20 pb-20 justify-content-center">
					<Box mb={2} width="100%" display="flex" justifyContent="center" p={1} textAlign="center">
						<Box mx={2}>
							<Button variant="contained" color="primary" onClick={() => this.onCloseDialog(true)}>
								Yes
               		</Button>
						</Box>
						<Button variant="contained" color="secondary" onClick={() => this.onCloseDialog(false)} >
							No
               </Button>
					</Box>
				</DialogActions>
			</Dialog>
		);
	}
}

export default ConfirmationDialog;