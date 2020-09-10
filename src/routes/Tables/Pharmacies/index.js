/**
 * Search Table
*/
import React ,{Component} from 'react';
import MaterialTable from 'material-table';
import { Container, Box } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

class Pharmacies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [
				{ title: 'Practice name', field: 'practiceName' },
				{ title: 'Doctor name', field: 'doctorName' },
				{ title: 'Street Nr', field: 'streetNr' },
				{ title: 'zip code', field: 'zipcode', type: 'numeric' },
				{ title: 'City', field: 'city' },
				{ title: 'Phone', field: 'phone', type: 'string' ,required : true},
				{ title: 'Fax', field: 'fax' },
				{ title: 'Email', field: 'email' },
				{ title: 'Password', field: 'password', type: 'string' },
				{ title: 'Notifications', field: 'notifications'   },
			],			
			data: [],
			
		};
   
	}
	
	componentDidMount()
	{
		let user = JSON.parse(localStorage.getItem('user_id'));
		 this.instance_id = user.instance_id;
		userService.showPharmacies({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			console.log('res', res);
			this.setState(prevState => {
				const data = res;				
				return { ...prevState, data };
			});

		})

	}

	render() {
		
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
							columns={this.state.columns}
							data={this.state.data}
							editable={{
								onRowAdd: newData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newData', newData);
											newData.instance_id = this.instance_id;
											userService.addPharmacies(newData).then(res => {
												console.log('res', res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.push(res);
													return { ...prevState, data };
												});
											});

										}, 600);
									}),
								onRowUpdate: (newData, oldData) =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log('newdata', newData.id);
											userService.editPharmacies(newData).then(res => {
												if (oldData) {
													this.setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = res;
														return { ...prevState, data };
													});
												}
											})
										}, 600);
									}),
								onRowDelete: oldData =>
									new Promise(resolve => {
										setTimeout(() => {
											resolve();
											console.log(';oldData',oldData.id);
											userService.deletePharmacies({id : oldData.id}).then(res => {
												console.log('res' , res);
												this.setState(prevState => {
													const data = [...prevState.data];
													data.splice(data.indexOf(oldData), 1);
													return { ...prevState, data };
												});
											})											
										}, 600);
									}),
							}}
						/>
					</Box>
				</Container>
			</div>
		);
	}
}
export default Pharmacies;
