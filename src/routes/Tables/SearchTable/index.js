/**
 * Search Table
*/
import React from 'react';
import MaterialTable from 'material-table';
import { Container, Box } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

export default function SearchTable() { 
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Practice name', field: 'practiceName' },
			{ title: 'Doctor name', field: 'doctorName' },
			{ title: 'Street Nr', field: 'streetNr' },
			{ title: 'zip code', field: 'zipcode', type: 'numeric' },
			{ title: 'City', field: 'city' },
			{ title: 'Phone', field: 'phone', type: 'string' },
			{ title: 'Fax', field: 'fax' },
			{ title: 'Email', field: 'email' },
			{ title: 'Password', field: 'password', type: 'string' },
			{ title: 'Notifications', field: 'notifications'},
		],
		// data: [
		// 	{ practiceName: 'Mehmet', doctorName: 'Baran', streetNr: 'streetNr', zipDode: 63 ,city: 'Mehmet', phone: 'Baran', fax: 'streetNr' ,email : 'test@admin.com' ,password : 'password' ,notifications  : true  },
		// 	{ practiceName: 'Mehmet', doctorName: 'Baran', streetNr: 'streetNr', zipDode: 63 ,city: 'Mehmet', phone: 'Baran', fax: 'streetNr' ,email : 'test@admin.com' ,password : 'password' ,notifications  : true  },
		// 	{ practiceName: 'Mehmet', doctorName: 'Baran', streetNr: 'streetNr', zipDode: 63 ,city: 'Mehmet', phone: 'Baran', fax: 'streetNr' ,email : 'test@admin.com' ,password : 'password' ,notifications  : true  },
		// 	{ practiceName: 'Mehmet', doctorName: 'Baran', streetNr: 'streetNr', zipDode: 63 ,city: 'Mehmet', phone: 'Baran', fax: 'streetNr' ,email : 'test@admin.com' ,password : 'password' ,notifications  : true  },
		// ],
		data : userService.showFamilyDirectors({instance_id : 1 , pagination : 1})
	});


	return (
		<div className="tables-wrapper search-table-wrap">
			<SmallTitleBar
				title={<IntlMessages id="sidebar.familiy-directors" />}
				center
			/>  
			<Container maxWidth="lg">
				<Box px={{ xs: '12px', lg: 0 }} className="page-space">
					<MaterialTable
						title={<IntlMessages id="sidebar.familiy-directors" />}
						columns={state.columns}
						data={state.data}
						editable={{
							onRowAdd: newData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										console.log('newData',newData);
										userService.addFamilyDirectors(newData).then(res => {
											console.log('res' ,res);
											setState(prevState => {											
												const data = [...prevState.data];
												data.push(newData);
												return { ...prevState, data };
											});
										});
									
									}, 600);
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										if (oldData) {
											setState(prevState => {
												const data = [...prevState.data];
												data[data.indexOf(oldData)] = newData;
												return { ...prevState, data };
											});
										}
									}, 600);
								}),
							onRowDelete: oldData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										setState(prevState => {
											const data = [...prevState.data];
											data.splice(data.indexOf(oldData), 1);
											return { ...prevState, data };
										});
									}, 600);
								}),
						}}
					/>
				</Box>
			</Container>
		</div>
	);
}
