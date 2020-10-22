/**
 * Basic Table
*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Box } from '@material-ui/core';
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
			viewState: {
				document: {
					instanceInfo: instanceData,
					doctorInfo: { doctorName: '' },
					patientInfo: {},
					selectedServices: []
				},
				type: {
					type1: false,
					type2: false,
					type3: false
				},
				from: '',
				to: '',
			},
			completed: false,
			checked: [],
			columns: [
				{
					title: 'Versenden per Fax', field: 'Documents', render: row => <div>
						{this.formate_dateTime(row.send_date)}
					</div>
					, filtering: false
				},
				{
					title: 'patient', field: 'patient', filtering: false
				},
				{
					title: 'Typ', field: 'type', render: row => {

						let type = {};
						if (row.type) type = JSON.parse(row.type);
						return (<div>
							{type.type1 ? <p>Erstverordnung</p> : ''}
							{type.type2 ? <p>Folgeverordnung</p> : ''}
							{type.type3 ? <p>Medikamentenplan</p> : ''}
						</div>)

					}, filtering: false


				},
				{
					title: 'von - bis', field: 'from - to', render: row => <div>
						{this.formate_date(row.from)} - {this.formate_date(row.to)}
					</div>, filtering: false
				},

				{
					title: 'Funktionen', field: 'actions', render: row => <div>
						<CloudDownloadOutlinedIcon className="pointerIcon" onClick={() => this.downloadPdf(row)} />
						<img alt="site logo" width="20" src={require(`assets/Images/fax-icon.png`)} className="pointerIcon" onClick={() => this.sendEmail(row)} />
						{/* <EmailOutlinedIcon className="pointerIcon" onClick={() => this.sendEmail(row)} /> */}
						<EditOutlinedIcon className="pointerIcon" onClick={() => this.editDocument(row)} />
						<DeleteOutlineOutlinedIcon className="pointerIcon" onClick={() => this.ondeleteContact(row)} />

					</div>, filtering: false
				},
				{


					title: 'Genehmigt', field: 'status', render: rowdata => {

						return (<Checkbox
							checked={this.state.checked[rowdata.id]}
							color="primary"
							onChange={(event) => this.handleChange(event.target.checked, rowdata)}
						/>)
					},
					editComponent: rowdata => {
						return (<Checkbox
							checked={this.state.completed}
							color="primary"
							onChange={(event) => this.handleChangeCheckbox(event.target.checked, rowdata)}
						/>)
					},
					lookup: { 1: 'JA', 0: 'NEIN' },
				}
			],

		}
		this.editorDialog = React.createRef();
		this.viewDialog = React.createRef();
		this.deleteDialog = React.createRef();
		this.addDocument = this.addDocument.bind(this);
	}
	handleChangeCheckbox(value, data) {
		this.setState({ completed: value })
	}
	handleChange(value, data) {
		console.log('v alue', value);
		userService.editVerordnung({ id: data.id, status: value }).then(res => {
			if (res) {
				this.setState(prevState => {
					const checked = [...prevState.checked];
					checked[data.id] = value;
					return { ...prevState, checked };
				});
			}
		})

	}
	formate_dateTime(dateString) {
		let data = '';
		console.log('this.formate_date', dateString)
		if (dateString) {
			let str = dateString.split(" ");
			let date = str[0].split('-');
			let time = str[1].split(':');
			data = "am " + date[2] + '.' + date[1] + '.' + date[0] + " um " + time[0] + ':' + time[1];

		}

		return data;
	}
	formate_date(dateString) {
		let data = '00.00.0000';
		console.log('dateString', dateString);
		if (dateString) {
			let date = dateString.split('T');
			if (date.length > 1) {
				data = date[0].split('-');
				data = data[2] + '.' + data[1] + '.' + data[0];
			}

		}

		return data;
	}
	addDocument() {
		this.editorDialog.current.setState({
			document: {
				instanceInfo: instanceData,
				doctorInfo: { doctorName: '' },
				patientInfo: {},
				selectedServices: [],
			},
			type: {
				type1: false,
				type2: false,
				type3: false
			},
			from: new Date(),
			to: new Date(),
			selectedPatient : null

		})
		this.editorDialog.current.openDialog();

	}

	downloadPdf(oldData) {
		this.setState({ oldData });
		let content = JSON.parse(oldData.content);
		this.setState({
			viewState: {
				document: { ...content }, type: JSON.parse(oldData.type),
				from: new Date(oldData.from),
				to: new Date(oldData.to), isEdit: true, id: oldData.id
			}
		});
		setTimeout(() => {
			savePDF(ReactDOM.findDOMNode(document.getElementById('editArea')), {
				paperSize: "A4",
				margin: { left: 60, right: 60, top: 50, bottom: 60 }
			})
		}, 10);

	}
	sendEmail(oldData) {
		this.setState({ oldData });
		let content = JSON.parse(oldData.content);
		this.setState({
			viewState: {
				document: { ...content }, type: JSON.parse(oldData.type),
				from: new Date(oldData.from),
				to: new Date(oldData.to), isEdit: true, id: oldData.id
			}
		});

		setTimeout(() => {

			let gridElement = document.getElementById('editArea')
			drawDOM(gridElement, {
				paperSize: "A4",
				margin: { left: 60, right: 60, top: 50, bottom: 60 }
			}).then((group) => {
				return exportPDF(group);
			}).then((dataUri) => {
				const base64 = dataUri.replace('data:application/pdf;base64,', '');

				let email = {
					id: oldData.id,
					attachments: base64,	//attachments: "base64:data.pdf//" + base64,								
					doctor: this.state.viewState.document.doctorInfo.doctorName
				}
				userService.sendMail(email).then(res => {
					NotificationManager.success("Der Faxversand war erfolgreich");
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
		
		this.editorDialog.current.setState({
			document: { ...content }, type: { ...JSON.parse(oldData.type) },
			from: new Date(oldData.from),
			to: new Date(oldData.to), isEdit: true, id: oldData.id ,
			selectedPatient : content.patientInfo,
			
		});
	
		this.editorDialog.current.openDialog();
	}
	onSubmit(popupResponse) {
		if (popupResponse) {
			userService.addVerordnung({ ...popupResponse, instance_id: this.instance_id }).then(res => {
				this.setState(prevState => {
					const documents = [...prevState.documents];
					documents.push(res);
					return { ...prevState, documents };
				});

				this.editorDialog.current.setState({
					document: {
						instanceInfo: instanceData,
						doctorInfo: { doctorName: '' },
						patientInfo: {},
						selectedServices: [],
					},
					type: {
						type1: false,
						type2: false,
						type3: false
					},
					from: new Date(),
					to: new Date(),
					selectedPatient : {}

				})

				NotificationManager.success("Sie haben erfolgreich Verordnung erstellt.");

			}, error => {
				NotificationManager.error("Die Verordnung konnte nicht erstellt werden.");
			})
		}
	}

	onUpdate(popupResponse) {
		if (popupResponse) {

			userService.editVerordnung({ ...popupResponse, instance_id: this.instance_id }).then(res => {

				this.setState(prevState => {
					const documents = [...prevState.documents];
					documents[documents.indexOf(this.state.oldData)] = popupResponse;
					let oldData = {};
					return { ...prevState, documents, oldData };
				});
				this.editorDialog.current.setState({
					document: {
						instanceInfo: instanceData,
						doctorInfo: { doctorName: '' },
						patientInfo: {},
						selectedServices: [],
					},
					type: {
						type1: false,
						type2: false,
						type3: false
					},
					from: new Date(),
					to: new Date(),
					selectedPatient : {}

				})
				NotificationManager.success("Sie haben erfolgreich Verordnung erstellt.");
			}, error => {
				NotificationManager.error("Die Verordnung konnte nicht erstellt werden.");
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
		console.log('user', user);
		this.instance_id = user.instance_id;

		userService.showVerordnung({ instance_id: this.instance_id }).then(res => {


			if (res.instance.length) instanceData = res.instance[0];
			let document = { patientInfo: {}, doctorInfo: {}, instanceInfo: { ...instanceData }, selectedServices: [] };

			this.editorDialog.current.setState({ patientsList: res.patients, services: res.services, doctorList: res.doctors, document: { ...document } });
			let checked = [];
			res.verordnungs.forEach(element => {
				checked[element.id] = element.status;
			});
			this.setState({ documents: res.verordnungs, checked: checked });
		})
	}

	render() {
		console.log('documents', this.state.documents);
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
							options={{
								search: true,
								filtering: true
							}}
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