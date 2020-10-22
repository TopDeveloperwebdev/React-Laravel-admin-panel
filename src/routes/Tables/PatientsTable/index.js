/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import * as ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Container, Box, Switch, FormControl, InputLabel, TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { NotificationManager } from 'react-notifications';
import PreViewDialog from '../Carefolders/Components/PreViewDialog';
import PageTemplate from './Components/PageTemplates';
import {  MultiSelect } from '@progress/kendo-react-dropdowns';
let insuranceList = [];
let pharmaciesList = [];
let salutationList = { Herr: 'Herr', Frau: 'Frau' };
let degreeList = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
let statusList = { Aktiv: 'Aktiv', Inaktiv: 'Inaktiv', Unvollständig: 'Unvollständig' };
let family_doctorsList = [];
let resourcesList = [];
let servicesList = [];
let usersList = [];
let instances = {};
let instanceNames = [];

class PatientsTable extends Component {
   constructor(props) {
      super(props)
      this.state = {
         columns: [
            {
               title: 'Bild', field: 'picture', render: rowData => <img src={rowData.picture ? rowData.picture : this.defaultUrl} className="logo-td bdr-rad-50" />,
               editComponent: props => {
                  return (
                     <input
                        type='file'
                        onChange={e => props.onChange(e.target.files[0])}
                     />
                  )

               }
            },
            { title: 'Anrede', field: 'salutation', lookup: salutationList },
            { title: '*Vorname', field: 'firstName' },
            { title: '*Nachname', field: 'lastName' },
            { title: 'Straße', field: 'streetNr' },
            { title: 'PLZ', field: 'zipCode' },
            { title: 'Ort', field: 'city' },

            {
               title: 'Geburtstag', field: 'birthday', render: rowData => {
                  return (<div>
                     {this.formate_date(rowData.birthday)}
                  </div>)
               },
               editComponent: rowData => {
                  return (
                     <TextField
                        className="full-width"
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                           shrink: true,
                        }}
                        value={this.state.birthday}
                        onChange={this.handleChangeDate}
                     />)
               }
            },
            { title: 'Telefon 1', field: 'phone1' },
            { title: 'Telefon 2', field: 'phone2' },
            { title: 'E-Mail', field: 'email' },

            {
               title: 'Bereich', field: 'resources', render: props => {
                  let selectedResources = [];
                  selectedResources = JSON.parse(props.resources);
                  if (!selectedResources) {
                     selectedResources = [];
                  }
                  return (
                     <div>
                        {
                           selectedResources.map((value, index) => {
                              return (<div key={index}>{value}</div>)
                           })
                        }
                     </div>

                  )


               },
               editComponent: rowData => {
                  if (rowData.rowData.id) {
                     let selected = JSON.parse(rowData.rowData.resources);
                     if (!selected) {
                        selected = [];
                     }
                     if (this.state.isEditResources) {
                        this.setState({ selected: selected, isEditResources: false })
                     }
                  }

                  return (

                     <Autocomplete
                        multiple
                        id="tags-standard"
                        options={resourcesList}
                        getOptionLabel={(option) => option.resources}                       
                        onChange={this.onChangeResources}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              variant="standard"                             
                              placeholder="Bereich"
                           />
                        )}
                     />
                  )

               }

            },

            {
               title: '*Versicherung', field: 'insurance', editComponent: rowData => {

                  return (<Autocomplete

                     options={insuranceList}
                     getOptionLabel={(option) => option.insurances}
                     id="auto-complete"
                     autoComplete
                     includeInputInList
                     onChange={this.onChangeInsurance}
                     renderInput={(params) => <TextField
                        placeholder="Versicherung"
                        id="input-with-icon-textfield"                       
                        {...params}
                        margin="normal"

                     />}
                  />)
               }
            },
            {
               title: 'Versicherten-Nr.', field: 'insuranceNr'
            },
            {
               title: 'Leistungen', field: 'services', render: props => {
                  let selectedServices = JSON.parse(props.services);

                  if (!selectedServices) {
                     selectedServices = [];
                  }
                  return (
                     <div className="serviceContainer">
                        <div>
                           {
                              selectedServices.map((value, index) => {
                                 return (<div key={index}>{value}</div>)
                              })
                           }
                        </div>
                        {/* <div>
                           <FolderOutlinedIcon onClick={() => this.previewDocument(servicesList, props)} />
                        </div> */}
                     </div>

                  )

               },
               editComponent: rowData => {
                  console.log('rowData.rowData.id', rowData.rowData.id);
                  if (rowData.rowData.id) {
                     let currentService = JSON.parse(rowData.rowData.services);
                     console.log('currentService', currentService);
                     if (!currentService) {
                        currentService = [];
                     }
                     if (this.state.isEditServices) {
                        this.setState({ selectedservice: currentService, isEditServices: false })
                     }
                  }
                  return (

                     <Autocomplete
                        multiple
                        id="tags-standard"
                        options={servicesList}
                        getOptionLabel={(option) => option.services}                      
                        onChange={this.onChangeServices}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              variant="standard"                              
                              placeholder="Leistungen"
                           />
                        )}
                     />
                  )

               }
            },
            {
               title: '*Familiendoktor', field: 'familyDoctor', editComponent: rowData => {
                  return (<Autocomplete
                     options={family_doctorsList}
                     getOptionLabel={(option) => option.doctorName}
                     id="auto-complete"
                     autoComplete
                     includeInputInList
                     onChange={this.onChangeDoctor}
                     renderInput={(params) => <TextField
                        id="input-with-icon-textfield"                      
                        {...params}
                        margin="normal"
                        placeholder="Familiendoktor"

                     />}
                  />)
               }
            },
            { title: 'Schlüssel-Nr.', field: 'keyNumber', type: 'numeric' },
            { title: 'Etage', field: 'floor', type: 'numeric' },
            {
               title: 'Pflegegrad', field: 'degreeCare', lookup: degreeList
            },
            {
               title: '*Apotheke', field: 'pharmacy', editComponent: rowData => {
                  return (<Autocomplete
                     options={pharmaciesList}
                     getOptionLabel={(option) => option.pharmacyName}
                     id="auto-complete"
                     autoComplete
                     includeInputInList
                     onChange={this.onChangePharmacies}
                     renderInput={(params) => <TextField
                        id="input-with-icon-textfield"                      
                        {...params}
                        margin="normal"
                        placeholder="Apotheke"

                     />}
                  />)
               }
            },
            {
               title: 'Instance', field: 'instance_id', hidden: false, render: rowData => {
                  let temp = null;
                  temp = instanceNames.find((x, i) => i == rowData.instance_id);
                  if (temp) {
                     return (<div>
                        {instanceNames[rowData.instance_id]}
                     </div>)
                  }
                  else return <div></div>;

               }, editComponent: rowData => {
                  let temp = null;
                  temp = instanceNames.find((x, i) => i == rowData.rowData.instance_id);
                  if (temp) {
                     return (<div>
                        {instanceNames[rowData.rowData.instance_id]}
                     </div>)
                  }
                  else {
                     return <div></div>;
                  }
               },

            },        
            {
               title: 'Nutzergruppe', field: 'userGroup', render: props => {
                  let selectedUsers = [];
                  selectedUsers = JSON.parse(props.userGroup);

                  if (!selectedUsers) {
                     selectedUsers = [];
                  }
                  return (
                     <div>
                        {
                           selectedUsers.map((value, index) => {
                              return (<div key={index}>{value}</div>)
                           })
                        }
                     </div>

                  )


               },
               editComponent: rowData => {
                  if (rowData.rowData.id) {
                     let selectedUsers = JSON.parse(rowData.rowData.userGroup);
                     if (!selectedUsers) {
                        selectedUsers = [];
                     }

                     if (this.state.isEditUsers) {
                        this.setState({ selectedUsers: selectedUsers, isEditUsers: false })
                     }
                  }

                  return (
                     <MultiSelect
                        data={usersList}
                        value={this.state.selectedUsers}
                        onChange={this.onChangeUsers}
                     />
                  )

               }
            },
            { title: 'Status', field: 'status', lookup: statusList },
            {
               title: 'Benachrichtigungen', field: 'serviceplan', render: rowData => {
                  return (<Switch
                     size="small"
                     color="primary"
                     checked={rowData.serviceplan ? true : false}
                  />)

               },
               editComponent: rowData => {
                  console.log('rowData', rowData);
                  if (this.state.isEditServiceplan && rowData.rowData.id) {
                     this.setState({ serviceplan: rowData.rowData.serviceplan ? true : false, isEditServiceplan: false });
                  }
                  return (<Switch
                     size="small"
                     color="primary"
                     checked={this.state.serviceplan}
                     onChange={e => this.setState({ serviceplan: e.target.checked })}
                  />)

               }
            },
         ],

         data: [],
         selected: [],
         selectedservice: [],
         selectedUsers: [],
         isEditServices: true,
         isEditResources: true,
         isEditUsers: true,
         isEditServiceplan: true,
         serviceplan: true,
         insurance: '',
         pharmacy: '',
         birthday: '',
         documentsList: [],
         folders: [],
         downloadDocs: [],

      };

      this.preViewDialog = React.createRef();

   }

   formate_date(dateString) {
      let date = '';
      if (dateString) {
         let str = dateString.split(" ");
         date = str[0].split('-');
         date = date[2] + '.' + date[1] + '.' + date[0];
      }

      return date;
   }
   previewDocument(services, patient) {
      console.log('previewDocument', services);



      let relationDocs = [];
      this.state.folders.forEach(folder => {
         if (services.indexOf(folder.service) > -1) {
            let folderDocs = JSON.parse(folder.documents);
            folderDocs.map(element => {
               relationDocs.push(element);
            })
         }
      });

      console.log('ssssssss1', relationDocs);
      relationDocs = [...new Set(relationDocs)];
      console.log('ssssssss2', relationDocs);
      if (relationDocs.length) {
         let downloadDocs = this.state.documentsList.filter((a) => {
            return relationDocs.indexOf(a.id) > -1;
         })
         let name = patient.firstName + ' ' + patient.lastName;
         let street = patient.streetNr;
         let zip = patient.zipCode;
         let city = patient.city;
         let insurance = patient.insurance;
         let insuranceNr = patient.insuranceNr;
         let birthday = patient.birthday;
         let phone = patient.phone1;
         this.preViewDialog.current.setState({ name: name, street: street, zip: zip, city: city, insurance: insurance, insuranceNr: insuranceNr, birthday: birthday, phone: phone })
         this.setState({ downloadDocs: [...downloadDocs] });

         this.preViewDialog.current.openDialog();
         setTimeout(() => {
            this.generatePdf(this.state.downloadDocs.length);

         }, 2000);
      }
      else {
         NotificationManager.warning("Es gibt keine Pflegeordner, die optionale Dienste anbieten.");
      }
   }
   generatePdf(len) {
      console.log('instances', instances);
      let InstanceInfo = { instanceName: instances.instanceName, instanceLogo: instances.instanceLogo, email: instances.email, name: instances.name };
      localStorage.setItem('instanceInfo', JSON.stringify(InstanceInfo));
      console.log('instanceInfo', InstanceInfo);
      savePDF(ReactDOM.findDOMNode(document.getElementById('downloadArea')), {
         pageTemplate: PageTemplate,
         paperSize: [794, 1123],
         margin: { top: 70, left: 50, right: 20, bottom: 70 }
      });
   }

   formate(documentsLen, pageHight) {

      let pages = [];
      console.log('formate');
      for (let i = 0; i < documentsLen; i++) {
         let ipageHight = document.getElementById("page-" + i).clientHeight;
         if (ipageHight > pageHight) {
            document.getElementById("page-" + i).style.paddingBottom = (pageHight - (ipageHight % pageHight)) + 'px';
         }
      }
      return pages;
   }
   handleChangeDate = (event) => {
      this.setState({ birthday: event.target.value });
   }
   onChangeDoctor = (event, doctor) => {
      if (!doctor) doctor = {};
      this.setState({ familyDoctor: doctor.doctorName });

   }

   onChangePharmacies = (event, pharmacy) => {
      if (!pharmacy) pharmacy = {};
      this.setState({ pharmacy: pharmacy.pharmacyName });
   }
   onChangeInsurance = (event, insurance) => {

      if (!insurance) insurance = {};
      this.setState({ insurance: insurance.insurances });
   }
   onChangeResources = (event, Resources) => {
      let resources = Resources.map(element => element.resources);
      this.setState({
         selected: [...resources]
      });
   }
   onChangeUsers = (event) => {
      let selectedUsers = [...event.target.value];
      if(selectedUsers.length == usersList.length - 1 || selectedUsers.indexOf('all') > -1)selectedUsers = ['all'];     
      this.setState({
         selectedUsers: selectedUsers
      });
   }
   onChangeServices = (event, Services) => {
      let services = Services.map(element => element.services);

      this.setState({
         selectedservice: [...services]
      });
   }
   componentWillMount() {
      this.defaultUrl = "http://base.mastermedi-1.vautronserver.de/backend_latest/file_storage/1602322608icon-patient-kl.png";
      let user = JSON.parse(localStorage.getItem('user'));
      this.instance_id = user.instance_id;

      userService.showPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {

         this.setState(state => {
            let columns = state.columns;
            state.columns[20].hidden = (this.instance_id ? true : false);
            return {
               columns
            };
         })


         servicesList = [];
         servicesList = res.services

         resourcesList = res.resources;
         usersList = res.users.map(ele => {
            return ele.name;
         })
         usersList.push("all");
         family_doctorsList = res.family_doctors;


         insuranceList = res.insurances;
         pharmaciesList = res.pharmacies;

         if (res.instances.length) {
            instances = res.instances[0];

         }
         instanceNames = [];
         res.instanceNames.map(ele => {

            instanceNames[ele.id] = ele.instanceName;
         })
         console.log('resinstanceName', instanceNames)




         this.setState(prevState => {
            const data = res.patients;
            const documentsList = res.documents;
            const folders = res.folders;
            return { ...prevState, data, documentsList, folders };
         });

      })

   }

   render() {


      let editableComponent = this.instance_id ? {
         onRowAdd: newData =>
            new Promise(resolve => {
               setTimeout(() => {
                  resolve();

                  newData.instance_id = this.instance_id;
                  newData.resources = JSON.stringify(this.state.selected);
                  newData.services = JSON.stringify(this.state.selectedservice);
                  newData.userGroup = JSON.stringify(this.state.selectedUsers);
                  newData.insurance = this.state.insurance;
                  newData.familyDoctor = this.state.familyDoctor;
                  newData.pharmacy = this.state.pharmacy;
                  newData.birthday = this.state.birthday;
                  newData.serviceplan = this.state.serviceplan;
                  if (this.state.pharmacy && this.state.familyDoctor && newData.firstName && newData.lastName) {
                     const formData = new FormData()
                     formData.append('file', newData.picture);
                     newData.picture = '';
                     formData.append('data', JSON.stringify(newData));
                     userService.addPatients(formData).then(res => {
                        const selected = [];
                        const selectedservice = [];
                        this.setState(prevState => {
                           let data = [...prevState.data];
                           data.push(res);
                           return { ...prevState, data: [...data] };
                        });

                        this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true, isEditServiceplan: true, isEditUsers: true, insurance: "", familyDoctor: "", pharmacy: '', birthday: '', selectedUsers: [] });
                     }).catch(error => {
                        console.log('erro', error);
                        alert(error.message);
                     });
                  }
                  else {
                     alert("Bitte füllen Sie die erforderlichen Felder aus.");
                  }

               }, 600);
            }),
         onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
               setTimeout(() => {
                  resolve();
                  const formData = new FormData()
                  if (typeof newData.picture == 'object') {
                     formData.append('file', newData.picture);
                     newData.picture = '';
                  }
                  console.log('dddddddddd---', this.state.selectedservice);
                  newData.resources = JSON.stringify(this.state.selected);
                  newData.services = JSON.stringify(this.state.selectedservice);
                  newData.userGroup = JSON.stringify(this.state.selectedUsers);
                  if (this.state.insurance) newData.insurance = this.state.insurance;
                  if (this.state.familyDoctor) newData.familyDoctor = this.state.familyDoctor;
                  if (this.state.pharmacy) newData.pharmacy = this.state.pharmacy;
                  if (this.state.birthday) newData.birthday = this.state.birthday;
                  if (this.state.serviceplan) newData.serviceplan = this.state.serviceplan;
                  formData.append('data', JSON.stringify(newData));
                  if (newData.pharmacy && newData.familyDoctor && newData.firstName && newData.lastName) {
                     userService.editPatients(formData).then(res => {
                        if (oldData) {
                           this.setState(prevState => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = res;
                              return { ...prevState, data };
                           });
                           const selected = [];
                           const selectedservice = [];
                           this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true, isEditServiceplan: true, isEditUsers: true, insurance: "", familyDoctor: "", pharmacy: '', birthday: '', selectedUsers: [], serviceplan: true });
                        }
                     })
                  } else {
                     alert("Bitte füllen Sie die erforderlichen Felder aus.");
                  }

               }, 600);
            }),
         onRowDelete: oldData =>
            new Promise(resolve => {
               setTimeout(() => {
                  resolve();
                  console.log(';oldData', oldData.id);
                  userService.deletePatients({ id: oldData.id }).then(res => {
                     console.log('res', res);
                     this.setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                     });
                  })
               }, 600);
            }),
      } : {
            onRowUpdate: (newData, oldData) =>
               new Promise(resolve => {
                  setTimeout(() => {
                     resolve();
                     const formData = new FormData()
                     if (typeof newData.picture == 'object') {
                        formData.append('file', newData.picture);
                        newData.picture = '';
                     }
                     if (this.state.selected.length) newData.resources = JSON.stringify(this.state.selected);
                     if (this.state.selectedservice.length) newData.services = JSON.stringify(this.state.selectedservice);
                     if (this.state.selectedUsers.length) newData.userGroup = JSON.stringify(this.state.selectedUsers);
                     if (this.state.insurance) newData.insurance = this.state.insurance;
                     if (this.state.familyDoctor) newData.familyDoctor = this.state.familyDoctor;
                     if (this.state.pharmacy) newData.pharmacy = this.state.pharmacy;
                     if (this.state.birthday) newData.birthday = this.state.birthday;
                     if (this.state.serviceplan) newData.serviceplan = this.state.serviceplan;
                     formData.append('data', JSON.stringify(newData));
                     if (newData.pharmacy && newData.familyDoctor && newData.firstName && newData.lastName) {
                        userService.editPatients(formData).then(res => {
                           if (oldData) {
                              this.setState(prevState => {
                                 const data = [...prevState.data];
                                 data[data.indexOf(oldData)] = res;
                                 return { ...prevState, data };
                              });
                              const selected = [];
                              const selectedservice = [];
                              this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true, isEditServiceplan: true, isEditUsers: true, insurance: "", familyDoctor: "", pharmacy: '', birthday: '', selectedUsers: [], serviceplan: true });
                           }
                        })
                     } else {
                        alert("Bitte füllen Sie die erforderlichen Felder aus.");
                     }

                  }, 600);
               }),
            onRowDelete: oldData =>
               new Promise(resolve => {
                  setTimeout(() => {
                     resolve();
                     console.log(';oldData', oldData.id);
                     userService.deletePatients({ id: oldData.id }).then(res => {
                        console.log('res', res);
                        this.setState(prevState => {
                           const data = [...prevState.data];
                           data.splice(data.indexOf(oldData), 1);
                           return { ...prevState, data };
                        });
                     })
                  }, 600);
               }),
         };
      return (
         <div className="tables-wrapper search-table-wrap">
            <SmallTitleBar
               title={<IntlMessages id="sidebar.patients" />}
               center
            />
            <Container maxWidth="lg">
               <Box px={{ xs: '12px', lg: 0 }} className="page-space patient-container">
                  <MaterialTable
                     title={<IntlMessages id="sidebar.patients" />}
                     columns={this.state.columns}
                     data={this.state.data}
                     localization={{								
								header: {
									actions: 'Funktionen'
								},								
							}}
                     options={{
                        actionRowIndex: -1
                     }}
                     editable={editableComponent}
                     actions={this.instance_id ? [
                        {
                           icon: 'folder_outlined_icon',
                           tooltip: 'Download Care Folder',
                           onClick: (event, rowData) => {
                              let currentService = JSON.parse(rowData.services);
                              this.previewDocument(currentService, rowData)
                           }
                        }
                     ] : []}
                  />
               </Box>
            </Container>
            <PreViewDialog
               ref={this.preViewDialog}
               selectedDocumentList={this.state.downloadDocs}
            />
         </div>
      );
   }
}
export default PatientsTable;


