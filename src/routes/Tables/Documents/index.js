/**
 * Basic Table
*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box } from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
// Components
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../_services';
import EditorDialog from './Components/EditorDialog';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Doughnut', 305, 3.7, 67, 4.3),
	createData('KitKat', 356, 16.0, 49, 3.9),
];
class Documents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
		this.editorDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
   addDocument(){
	this.editorDialog.current.openDialog();
   }
   componentWillMount() {
	
	let user = JSON.parse(localStorage.getItem('user'));
	this.instance_id = user.instance_id;

	userService.showInstances({ instance_id: this.instance_id, pagination: 1 }).then(res => {
		console.log('res.instances', res.instances);
		
	})

}
	render() {
		return (
			<div className="tables-wrapper">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.documents" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
						<CustomCard title={<IntlMessages id="sidebar.documents" />}>
							<Box>	<NoteAddOutlinedIcon onClick={this.addDocument} /></Box>

							<Box pt={3}>
								<TableContainer>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Dessert (100g serving)</TableCell>
												<TableCell align="left">Calories</TableCell>
												<TableCell align="left">Fat&nbsp;(g)</TableCell>
												<TableCell align="left">Carbs&nbsp;(g)</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow key={row.name}>
													<TableCell align="left"><InsertDriveFileOutlinedIcon /></TableCell>
													<TableCell component="th" scope="row">
														{row.name}
													</TableCell>

													<TableCell align="left">{row.protein}</TableCell>
													<TableCell align="left">
														<EditOutlinedIcon />
														<DeleteOutlineOutlinedIcon />

													</TableCell>

												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
						</CustomCard>
					</Box>
				</Container>

				<EditorDialog
					ref={this.editorDialog}
					instances={this.instances}
				/>
			</div>
		);
	}
}
export default Documents;