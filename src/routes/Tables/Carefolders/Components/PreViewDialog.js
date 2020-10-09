/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import { Button, Box, Typography, Dialog, Container, DialogActions, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SmallTitleBar } from '../../../../components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class PreviewDialgo extends React.Component {
	constructor(props) {
		super(props);
		this.pdfExportComponent = React.createRef();
	}
	state = {
		open: false,
		instance: null,
		title: '',
		content: '',
		name: '',
		street: '',
		zip: '',
		city: '',
		insurance: '',
		insuranceNr: '',
		birthday: '',
		phone: ''

	};

	//Define function for open confirmation dialog box
	openDialog() {
		this.setState({ open: true }, () => {
			let { name, street, zip, city, insurance, insuranceNr, birthday, phone } = this.state;
			setTimeout(() => {
				var names = document.getElementsByClassName("name");
				for (let i = 0; i < names.length; i++) {
					document.getElementsByClassName("name")[i].innerText = name;
				}

				var streets = document.getElementsByClassName("street");
				for (let i = 0; i < streets.length; i++) {
					document.getElementsByClassName("street")[i].innerText = street;
				}
				var zips = document.getElementsByClassName("zip");
				for (let i = 0; i < zips.length; i++) {
					document.getElementsByClassName("zip")[i].innerText = zip;
				}
				var citys = document.getElementsByClassName("city");
				for (let i = 0; i < citys.length; i++) {
					document.getElementsByClassName("city")[i].innerText = city;
				}
				var insurances = document.getElementsByClassName("insurance");
				for (let i = 0; i < insurances.length; i++) {
					document.getElementsByClassName("insurance")[i].innerText = insurance;
				}
				var insuranceNrs = document.getElementsByClassName("insuranceNr");
				for (let i = 0; i < insuranceNrs.length; i++) {
					document.getElementsByClassName("insuranceNr")[i].innerText = insuranceNr;
				}

				var birthdays = document.getElementsByClassName("birthday");
				for (let i = 0; i < birthdays.length; i++) {
					document.getElementsByClassName("birthday")[i].innerText = this.formate_date(birthday);
				}

				var phones = document.getElementsByClassName("phone");
				for (let i = 0; i < phones.length; i++) {
					document.getElementsByClassName("phone")[i].innerText = phone;
				}

			}, 10);
		});
	};

	formate_date(dateString) {
		let date = '';
		if (dateString) {
			let str = dateString.split(" ");
			date = str[0].split('-');
			date = date[2] + '.' + date[1] + '.' + date[0];
		}

		return date;
	}
	//Define function for close confirmation dialog box 
	closeDialog() {
		this.setState({ open: false });
	};

	//Define function for close confirmation dialog box and callback for delete item 
	onCloseDialog(isTrue) {
		this.setState({ open: false });
	};
	getUrl(logo) {
		let url = '/backend_latest/file_storage/' + logo.split('/')[5];
		//let defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
		return url
	}
	render() {
		return (

			<Dialog
				open={this.state.open}
				onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"

			>
				<DialogContent className="p-10 downloadPaper">
					<Box>
						<CloseIcon className="closeBtn" onClick={() => this.onCloseDialog(false)}></CloseIcon>
					</Box>
					<div id="downloadArea">
						{this.props.selectedDocumentList.map((element, index) => {
							return (
								<Box key={index} className="pageContainer" id={`page-${index}`}>
									{/* <Box textAlign="center" className="headerBar">
										<Box pt={1} fontSize="body2.fontSize">
											<img src={this.getUrl(element.instanceLogo)} />
										</Box>
										<Typography variant="h4">
											{element.instanceName}
										</Typography>

									</Box> */}
									<div className="p-10" >
										<div variant="h5" className="title" textAlign="left">
											{element.title}
										</div>
									</div>
									<div className="p-10 contentHtml">

										<div dangerouslySetInnerHTML={{
											__html: element.content
										}}>

										</div>

									</div>
									{/* <Box bgcolor="background.paper"  >
										<Box className="footerBar" >
											<div textAlign="left">
												<Box pt={1} fontSize="body2.fontSize">
													instance Name : {element.instanceName}
												</Box>
												<Box pt={1} fontSize="body2.fontSize">
													Contact Email : {element.email}
												</Box>
											</div>
											<Box>
												Seilte 3 von 3
											</Box>
										</Box>

									</Box> */}
								</Box>
							)
						})

						}
					</div>

				</DialogContent>

			</Dialog>
		);
	}
}

export default PreviewDialgo;