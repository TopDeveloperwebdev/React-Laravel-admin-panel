/**
 * Custom Table Widget
*/
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Avatar, Tooltip, IconButton } from '@material-ui/core';

//Data
import customTable from "assets/Data/CustomTable";

import IntlMessages from 'util/IntlMessages';

// Components
import { CustomCard, SocialIcons } from 'components/GlobalComponents';

const styles = theme => ({
	root: {
		'& .MuiTableCell-paddingNone': {
			padding: '0 16px',
		},
		'& .MuiTableCell-body': {
			lineHeight: 1,
		},
		'& .MuiToolbar-root': {
			paddingRight: 20,
			'& >div:first-child': {
				fontSize: '1.25rem',
				fontFamily: "'Roboto', sans-serif",
				fontWeight: 500,
			}
		}
	},
	content: {

	},
	menuButton: {

	}
});

class PatientsTableWidget extends Component {

	state = {
		columns: [
			{ title: 'Avatar', field: 'imageUrl', render: rowData => <img alt="user-thumb" src={require(`assets/Images/avatars/${rowData.imageUrl}`)} className="img-50 bdr-rad-50" /> },
			{ title: 'First Name', field: 'firstName' },
			{ title: 'Last Name', field: 'lastName' },
			{ title: 'Salutation', field: 'salutation' },
			{ title: 'Resources', field: 'familyDoctor' },
			{ title: 'Insurance', field: 'insurance' },
			{ title: 'Services', field: 'services' },
			{ title: 'Family Doctor', field: 'familyDoctor' },
			{ title: 'Key number', field: 'keyNumber' },
			{ title: 'Floor', field: 'floor' },			
			{ title: 'Degree of care', field: 'degreeCare' },
			{ title: 'Pharmacy', field: 'pharmacy' },
			{ title: 'User group', field: 'userGroup' },		
			{ title: 'Status', field: 'status' },
			
		],
		data: customTable.data,
		selectedRow: {
			"firstName": "Zachery",
			"lastName": "Terrell",
			"designation": "Web Developer",
			"city": "Chakwal",
			"postal": "352950",
			"address": "Ap #262-5976 Elementum Rd.",
			"country": "Virgin Islands",
			"imageUrl": "user-1.jpg",
			"contactNo": "9876543210",
			"lastModified": "17/3/2019",
			"tableData": {
				"id": 0
			}
		},
		selectedRowForStyle: null
	};

	handleRowClick = (event, rowData) => {
		let tableData = customTable.data

		for (let i = 0; i < tableData.length; i++) {
			if (tableData[i].icon === true) {
				if (i === rowData.tableData.id) {
					tableData[i].icon = true
				} else {
					tableData[i].icon = false;
				}
			} else {
				if (i === rowData.tableData.id) {
					tableData[i].icon = true
				}
			}
		}
		this.setState({
			selectedRow: rowData,
			selectedRowForStyle: rowData
		});
	}

	render() {
		const { classes } = this.props;
		const { selectedRow } = this.state;
		return (
			<Grid container spacing={0} className="res-custom-table">
				<Grid item xs={12} sm={12} md={8}>
					<Box className={`custom-table-wrap ${classes.root}`}>
						<MaterialTable
							title={<IntlMessages id="widgets.customTable" />}
							columns={this.state.columns}
							data={this.state.data}
							options={{
								rowStyle: rowData => ({
									backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#f3f7fa' : '#FFF'
								})
							}}
							onRowClick={this.handleRowClick}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<CustomCard cardClasses="preview-panel">
						{selectedRow ?
							<>
								<Box mb={2} textAlign="center">
									<Avatar alt="user-thumb" className="avatar-wrap" src={require(`assets/Images/avatars/${selectedRow.imageUrl}`)} />
									<Box pl={2}>
										<Box fontWeight={500}>{selectedRow.firstName} {selectedRow.lastName}</Box>
										<Typography variant="subtitle2">{selectedRow.designation}</Typography>
									</Box>
								</Box>
								<Box mb={2} textAlign="center">
									<Tooltip title="Print" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons-outlined">print</i>
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons">delete_outline</i>
										</IconButton>
									</Tooltip>
									<Tooltip title="Edit" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons">edit</i>
										</IconButton>
									</Tooltip>
									<Tooltip title="PageView" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons-outlined">pageview</i>
										</IconButton>
									</Tooltip>
								</Box>
								<Box mb={2} className="preview-content">
									<Typography variant="body2">
										<span>Street nr :</span>
										<span>{selectedRow.streetNr}</span>
									</Typography>
									<Typography variant="body2">
										<span>zip code : </span>
										<span>{selectedRow.zipCode}</span>
									</Typography>
									<Typography variant="body2">
										<span>country :</span>
										<span>{selectedRow.country}</span>
									</Typography>
									<Typography variant="body2">
										<span>Birthday :</span>
										<span>{selectedRow.birthday}</span>
									</Typography>
									<Typography variant="body2">
										<span>Phone 1 :</span>
										<span>{selectedRow.phone1}</span>
									</Typography>
									<Typography variant="body2">
										<span>Phone 2 :</span>
										<span>{selectedRow.phone2}</span>
									</Typography>
									<Typography variant="body2">
										<span>E-Mail :</span>
										<span>{selectedRow.email}</span>
									</Typography>
								</Box>
								<Box textAlign="center">
									<SocialIcons />
								</Box>
							</>
							:
							null
						}
					</CustomCard>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(PatientsTableWidget);