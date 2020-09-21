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
import ViewDialog from './Components/ViewDialog';

class Documents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			instances: [],
			documents: [],
			selectedDocument: {}
		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
	addDocument() {
		this.editorDialog.current.openDialog();
	}
	viewDocument(documentId) {
		userService.getByIdDocument({ id: documentId }).then(res => {
			if(res.length){
				this.setState({ selectedDocument: res[0].content });
				console.log('res' , res);
				this.viewDialog.current.openDialog();
			}
			
		})

	}
	onSubmit(popupResponse) {
		if (popupResponse) {

			userService.addDocuments(popupResponse).then(res => {
				let documents = this.state.documents;
				documents.push(res);
				this.setState({ documents: documents });

			})
		}
	}


	componentWillMount() {

		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		userService.showDocuments({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({ documents: res });
		})
		userService.showInstances({ instance_id: this.instance_id, pagination: 1 }).then(res => {
			this.setState({ instances: res.instances });

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
												<TableCell></TableCell>
												<TableCell align="left">Title</TableCell>
												<TableCell align="left">Created_At</TableCell>
												<TableCell align="left">Actions</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{this.state.documents.map(row => (
												<TableRow className="talbeRow" key={row.title} onClick={() => this.viewDocument(row.id)}>
													<TableCell align="left"><InsertDriveFileOutlinedIcon /></TableCell>
													<TableCell component="th" scope="row">
														{row.title}
													</TableCell>

													<TableCell align="left">{row.created_at}</TableCell>
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
					instances={this.state.instances}
					onConfirm={(res) => this.onSubmit(res)}
				/>

				<ViewDialog
					ref={this.viewDialog}
					document={this.state.selectedDocument}

				/>
			</div>
		);
	}
}
export default Documents;