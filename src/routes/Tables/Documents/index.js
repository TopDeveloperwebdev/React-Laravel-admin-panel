/**
 * Basic Table
*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box } from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import MaterialTable from 'material-table';
// Components
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import { userService } from '../../../_services';
import EditorDialog from './Components/EditorDialog';
import ViewDialog from './Components/ViewDialog';
import DeleteDialog from './Components/DeleteDialog';

class Documents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			instances: [],
			documents: [],
			selectedDocument: {},
			oldData: {},
			patients : [],
			columns: [
				{
					title: 'Files', field: 'action', render: row => <div>
						<InsertDriveFileOutlinedIcon className="pointerIcon" onClick={() => this.viewDocument(row.content, row.email, row.instanceLogo, row.instanceName, row.title)} />
					</div>
				},
				{ title: 'Title', field: 'title' },
				{ title: 'Created_At', field: 'created_at',render: rowdata => {
					return (<div>
						{this.formate_date(rowdata.created_at)}

					</div>)
				}}, 
				{
					title: 'Actions', field: 'actions', render: row => <div>
						<EditOutlinedIcon className="pointerIcon" onClick={() => this.editDocument(row)} />
						<DeleteOutlineOutlinedIcon className="pointerIcon" onClick={() => this.ondeleteContact(row)} />

					</div>
				},
			],

		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.deleteDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
	formate_date(dateString) {
		let data = '';
		
		if (dateString) {
			let str = dateString.split(" ");
			let date = str[0].split('-');
			let time = str[1].split(':');
			data = "am " + date[2] + '.' + date[1] + '.' + date[0] + " um " + time[0] + ':' + time[1];
			
		}
	
		return data;
	}
	addDocument() {
		this.editorDialog.current.setState({ userInstance_id: this.instance_id });
		this.editorDialog.current.openDialog();
		setTimeout(() => {
			const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
			placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
			document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
				= 'Insert placeholder' + document.querySelector('.ql-placeholder .ql-picker-label').innerHTML;
		}, 10);
	}
	viewDocument(content, email, instanceLogo, instanceName, title) {	
		let patientList = [];
		this.state.patients.map(element => {
			patientList.push(element.firstName);
		});

		this.setState({ selectedDocument: { content: content, instanceLogo: instanceLogo, email: email, instanceName: instanceName, title: title } });
		this.viewDialog.current.setState({patients : patientList});

		this.viewDialog.current.openDialog();

	}
	editDocument(oldData) {

		this.editorDialog.current.setState({ id: oldData.id, instance: oldData.instance_id, title: oldData.title, content: oldData.content, isEdit: true });
		this.setState({ oldData });
		this.editorDialog.current.openDialog();
		setTimeout(() => {
			const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-placeholder .ql-picker-item'));
			placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
			document.querySelector('.ql-placeholder .ql-picker-label').innerHTML
				= 'Insert placeholder' + document.querySelector('.ql-placeholder .ql-picker-label').innerHTML;
		}, 10);
	}
	onSubmit(popupResponse) {
		if (popupResponse) {
			userService.addDocuments(popupResponse).then(res => {
				if (res.length) {
					// this.setState(prevState => {
					// 	const documents = [...prevState.documents];
					// 	documents.push(res[0]);
					// 	return { ...prevState, documents };
					// });
					// this.editorDialog.current.setState({ title: '', content: '' ,isEdit: false });
					window.location.reload();
				}
			})
		}
	}

	onUpdate(popupResponse) {
		if (popupResponse) {

			userService.editDocuments(popupResponse).then(res => {
				if (res.length) {

					// this.setState(prevState => {
					// 	const documents = [...prevState.documents];
					// 	documents[documents.indexOf(this.state.oldData)] = res[0];
					// 	let oldData = {};						
					// 	return { ...prevState, documents, oldData };
					// });
					// this.editorDialog.current.setState({ title: '', content: '' ,isEdit: false });
					window.location.reload();
				}


			})
		}
	}
	ondeleteContact(oldData) {
		console.log(';', oldData);
		this.setState({ oldData })
		this.deleteDialog.current.openDialog();
	}

	deleteContactPermanent(popupResponse) {
		if (popupResponse) {
			userService.deleteDocuments({ id: this.state.oldData.id }).then(res => {
				if (res) {
					this.setState(prevState => {
						const documents = [...prevState.documents];
						documents.splice(documents.indexOf(this.state.oldData), 1);
						return { ...prevState, documents };
					});
				}
			})
		}
	}



	onCloseDialog = (popupResponse) => {
		this.setState({
			oldData: null,
		})
	}

	componentWillMount() {

		let user = JSON.parse(localStorage.getItem('user'));
		this.instance_id = user.instance_id;
		console.log('this.instance_id-----------', this.instance_id);
		this.documents = this.props.match.params.id;
		userService.showDocuments({ instance_id: this.instance_id, pagination: 1, folder_id: this.folder_id }).then(res => {
			if (this.documents != '*') {
				let docs = JSON.parse(this.documents);
				res.documents = res.documents.filter((a) => {
					return docs.indexOf(a.id) > -1;
				})
			}
             console.log('patients',res.patients);

			this.setState({ documents: res.documents, instances: res.instances , patients : res.patients });
		})
	}

	render() {
		return (
			<div className="tables-wrapper">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.documents" />}
					center
				/>
				<Container maxWidth="lg" className="documentContainer">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">

						<MaterialTable
							title={<IntlMessages id="sidebar.documents" />}
							columns={this.state.columns}
							data={this.state.documents}
							actions={[
								{
									icon: "note_add_outlined",
									tooltip: "my tooltip",
									position: "toolbar",
									onClick: () => {
										this.addDocument()
									}
								}
							]}
						/>
					</Box>
				</Container>

				<EditorDialog
					ref={this.editorDialog}
					instances={this.state.instances}
					onConfirm={(res) => this.onSubmit(res)}
					onUpdate={(res) => this.onUpdate(res)}
				/>

				<ViewDialog
					ref={this.viewDialog}
					document={this.state.selectedDocument}
					patientList = {this.state.patients}

				/>
				<DeleteDialog
					ref={this.deleteDialog}
					onConfirm={(res) => this.deleteContactPermanent(res)}
				/>
			</div>
		);
	}
}
export default Documents;