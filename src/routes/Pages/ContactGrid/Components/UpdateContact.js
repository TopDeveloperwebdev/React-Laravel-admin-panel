/**
 * Form Dialog
 */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import { onUpdateContact } from "actions";

class Updatecontact extends React.Component {

	state = {
		open: false,
		name: '',
		designation: '',
		address: '',
		isValidname: false,
		isValiddesignation: false,
		isValidaddress: false
	};
	//Define function for close confirmation dialog box 
	closeDialog = () => {
		this.setState({ open: false });
		this.props.onCloseDialog(false);
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.onCloseDialog(true);
	};

	componentDidMount() {
		this.setState({ open: true });
		this.getcontactData();
	}

	// get contact data
	getcontactData() {
		const { data } = this.props;
		this.setState({
			name: data.name,
			designation: data.designation,
			address: data.address,
		})
	}
   /**
   * Method to check update validation
   */
	onPressUpdate() {
		const { name, designation, address } = this.state;
		this.setState({
			isValidname: false,
			isValiddesignation: false,
			isValidaddress: false
		})
		if (name !== '' && designation !== '' && address !== '') {
			this.updatecontact();
		}
		else {
			if (name === '') {
				this.setState({
					isValidname: true,
				})
			}
			if (designation === '') {
				this.setState({
					isValiddesignation: true,
				})
			}
			if (address === '') {
				this.setState({
					isValidaddress: true,
				})
			}
			if (name === '' && designation === '' && address === '') {
				this.setState({
					isValidname: true,
					isValiddesignation: true,
					isValidaddress: true
				})
			}
		}
	}
	//update contact info
	updatecontact() {
		let ID = this.props.data.id;
		let contactObject = {
			name: this.state.name,
			designation: this.state.designation,
			address: this.state.address
		}
		this.props.onUpdateContact((contactObject), ID);
		this.props.onCloseDialog(true);
		this.setState({ open: false });
	}

	render() {
		const { name, designation, address, isValidname, isValiddesignation, isValidaddress } = this.state;
		return (
			<div>
				<Dialog
					className="contact-dialog"
					open={this.state.open}
					onClose={this.closeDialog}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
					<DialogContent>
						<div>
							<form autoComplete="off">
								<div className="row" style={{ "marginBottom": "20px" }}>
									<Box mb={2}>
										<FormControl
											fullWidth
											required
											error={isValidname}
											aria-describedby="firstsname-text"
											className="d-block"
											style={{ "marginBottom": "10px" }}
										>
											<InputLabel htmlFor="name">Name</InputLabel>
											<Input
												fullWidth
												id="name"
												type="text"
												value={name ? name : ''}
												onChange={(event) => { this.setState({ name: event.target.value }) }}
											/>
											{isValidname &&
												<FormHelperText id="firstsname-text">
													<i className="zmdi zmdi-alert-circle mr-1"></i>
													This field should not be empty.
                                    </FormHelperText>
											}
										</FormControl>
									</Box>
									<Box mb={2}>
										<FormControl
											fullWidth
											required
											error={isValiddesignation}
											aria-describedby="designation-text"
											className="d-block"
											style={{ "marginBottom": "10px" }}
										>
											<InputLabel htmlFor="designation">Contact</InputLabel>
											<Input
												fullWidth
												id="designation"
												type="text"
												value={designation ? designation : ''}
												onChange={(event) => { this.setState({ designation: event.target.value }) }}
											/>
											{isValiddesignation &&
												<FormHelperText id="designation-text">
													<i className="zmdi zmdi-alert-circle mr-1"></i>
													This field should not be empty.
                                    </FormHelperText>
											}
										</FormControl>
									</Box>
									<Box mb={2}>
										<FormControl
											fullWidth
											required
											error={isValidaddress}
											aria-describedby="address-text"
											className="d-block"
											style={{ "marginBottom": "10px" }}
										>
											<InputLabel htmlFor="address">Address</InputLabel>
											<Input
												fullWidth
												id="address"
												type="text"
												value={address ? address : ''}
												onChange={(event) => { this.setState({ address: event.target.value }) }}
											/>
											{isValidaddress &&
												<FormHelperText id="address-text">
													<i className="zmdi zmdi-alert-circle mr-1"></i>
													This field should not be empty.
                                    </FormHelperText>
											}
										</FormControl>
									</Box>
								</div>
								<div className="pt-25 text-right">
									<Box mb={2} width="100%" display="flex" justifyContent="flex-end" textAlign="center">
										<Box mx={2}>
											<Button variant="contained" color="secondary" onClick={this.handleClose} >
												Cancel
											</Button>
										</Box>
										<Button variant="contained" color="primary" onClick={() => this.onPressUpdate()}>
											Submit
										</Button>
									</Box>
								</div>
							</form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ ContactReducer }) => {
	const { contactsData } = ContactReducer;
	return { contactsData };
}

export default connect(mapStateToProps, {
	onUpdateContact
})(Updatecontact);