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
import * as ReactDOM from 'react-dom';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Link } from 'react-router-dom';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { NotificationManager } from 'react-notifications';
let instanceData = {};
class Documents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			instances: [],
			documents: [],
			selectedDocument: {},
			oldData: {},
			patients: [],
			content: '',
			viewState: {},
			columns: [
				{
					title: 'Versenden per Fax', field: 'Documents', render: row => <div>
						{this.formate_date(row.send_date)}
					</div>
				},
				{
					title: 'patient', field: 'patient'
				},
				{
					title: 'type', field: 'type'
				},
				{
					title: 'from - to', field: 'from - to', render: row => <div>
						{row.from} - {row.to}
					</div>
				},

				{
					title: 'Actions', field: 'actions', render: row => <div>
						<CloudDownloadOutlinedIcon className="pointerIcon" onClick={() => this.downloadPdf(row)} />
						<img alt="site logo" width="20" src={require(`assets/Images/fax-icon.png`)}  className="pointerIcon" onClick={() => this.sendEmail(row)}/>
						{/* <EmailOutlinedIcon className="pointerIcon" onClick={() => this.sendEmail(row)} /> */}
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

	}

	downloadPdf(oldData) {
		this.setState({ oldData });
		let content = JSON.parse(oldData.content);
		this.setState({ viewState: content });
		setTimeout(() => {
			savePDF(ReactDOM.findDOMNode(document.getElementById('editArea')), {
				paperSize: "A4",
				margin: 5
			})
		}, 10);

	}
	sendEmail(oldData) {
		this.setState({ oldData });
		let content = JSON.parse(oldData.content);
		this.setState({ viewState: content });

		setTimeout(() => {
         
			let gridElement = document.getElementById('editArea')
			drawDOM(gridElement, {
				paperSize: "A4",
				margin: 2
			}).then((group) => {
				return exportPDF(group);
			}).then((dataUri) => {
				const base64 = dataUri.replace('data:application/pdf;base64,', '');

				let email = {	
					id : oldData.id,			
					attachments: base64,	//attachments: "base64:data.pdf//" + base64,								
					doctor: this.state.viewState.familyDoctor
				}
				userService.sendMail(email).then(res => {
					NotificationManager.success("Es gibt keine Pflegeordner, die optionale Dienste anbieten.");
						this.setState(prevState => {
						const documents = [...prevState.documents];
						documents[documents.indexOf(oldData)].send_date = res;									
						return { ...prevState, documents };
					});
				}, error => {
					NotificationManager.error("Es gibt keine Pflegeordner, die optionale Dienste anbieten.");
				})
			});
		}, 1);
	}
	editDocument(oldData) {
		this.setState({ oldData });
		let content = JSON.parse(oldData.content);
		this.editorDialog.current.setState({ ...content, isEdit: true, id: oldData.id });
		this.editorDialog.current.openDialog();
	}
	onSubmit(popupResponse) {
		//	this.downloadPdf();
		if (popupResponse) {
			userService.addVerordnung({ ...popupResponse, instance_id: this.instance_id }).then(res => {
				if (res) {
					window.location.reload();
				}
			})
		}
	}

	onUpdate(popupResponse) {
		if (popupResponse) {

			userService.editVerordnung({ ...popupResponse, instance_id: this.instance_id }).then(res => {
				if (res) {
					// this.setState(prevState => {
					// 	const documents = [...prevState.documents];
					// 	documents[documents.indexOf(this.state.oldData)] =popupResponse;
					// 	let oldData = {};						
					// 	return { ...prevState, documents, oldData };
					// });
					// this.editorDialog.current.setState({ })	
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
			userService.deleteVerordnung({ id: this.state.oldData.id }).then(res => {
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

		userService.showVerordnung({ instance_id: this.instance_id }).then(res => {
			
			this.setState({ documents: res.verordnungs });  
			if(res.instance.length)instanceData =  res.instance[0];
			console.log('instanceData' , res.instance[0]);
			this.editorDialog.current.setState({ patientsList: res.patients ,doctorList : res.doctors,  instanceName :  instanceData.instanceName , phone : instanceData.phone , fax : instanceData.fax });
		})
	}

	render() {
		return (
			<div className="tables-wrapper">
				<SmallTitleBar
					title={<IntlMessages id="sidebar.verordnungs" />}
					center
				/>
				<Container maxWidth="lg" className="documentContainer">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">

						<MaterialTable
							title={<IntlMessages id="sidebar.verordnungs" />}
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
				<div className="editorDialog">
					<EditorDialog
						ref={this.editorDialog}
						instances={this.state.instances}
						onConfirm={(res) => this.onSubmit(res)}
						onUpdate={(res) => this.onUpdate(res)}
						document={this.state.content}

					/>
				</div>


				<ViewDialog
					content={this.state.viewState}
				
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