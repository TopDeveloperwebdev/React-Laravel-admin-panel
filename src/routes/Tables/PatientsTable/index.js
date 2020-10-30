/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import * as ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Select, MenuItem, Container, Box, Switch, Typography, FormControl, InputLabel, TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { NotificationManager } from 'react-notifications';
import PreViewDialog from '../Carefolders/Components/PreViewDialog';
import PageTemplate from './Components/PageTemplates';
import { MultiSelect } from '@progress/kendo-react-dropdowns';


let salutationList = { Herr: 'Herr', Frau: 'Frau' };
let degreeList = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
let statusList = { Aufnahme: 'Aufnahme', Aktiv: 'Aktiv', Inakktiv: 'Inakktiv' };

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
               title: 'Bild', field: 'picture', render: rowData => <img src={rowData.picture ? rowData.picture : require(`assets/Images/patient.png`)} className="logo-td bdr-rad-50" />,
               editComponent: props => {
                  return (
                     <input
                        type='file'
                        onChange={e => props.onChange(e.target.files[0])}
                     />
                  )

               }, filtering: false
            },
            { title: 'Anrede', field: 'salutation', lookup: salutationList, filtering: false },
            { title: '*Vorname', field: 'firstName', filtering: false },
            { title: '*Nachname', field: 'lastName', filtering: false },
            { title: 'Straße', field: 'streetNr', filtering: false },
            { title: 'PLZ', field: 'zipCode', filtering: false },
            { title: 'Ort', field: 'city', filtering: false },

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
               }, filtering: false
            },
            { title: 'Telefon 1', field: 'phone1', filtering: false },
            { title: 'Telefon 2', field: 'phone2', filtering: false },
            { title: 'E-Mail', field: 'email', filtering: false },

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
                  let resourcesDatas = [];
                  if (rowData.rowData.id) {
                     let selected = JSON.parse(rowData.rowData.resources);
                     if (!selected) {
                        selected = [];
                     }
                     if (this.state.isEditResources) {
                        this.setState({ selected: selected, isEditResources: false })
                     }


                  }
                  resourcesDatas = this.state.selected.map(selectedElement => {
                     console.log('resource', selectedElement);
                     return resourcesList.find(element => element.resources == selectedElement);
                  })
                  return (

                     <Autocomplete
                        multiple
                        id="tags-standard"
                        options={resourcesList}
                        getOptionLabel={(option) => option.resources}
                        value={resourcesDatas}
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

               }, filtering: false

            },

            {
               title: '*Versicherung', field: 'insurance', editComponent: rowData => {
                  console.log('rowData-------', this.state.insuranceData);
                  if (rowData.rowData.id) {
                     let insurance = rowData.rowData.insurance;
                     if (this.state.isEditInsurance) {
                        let insuranceData = this.state.insuranceList.find(element => element.insurances == insurance);
                        this.setState({ isEditInsurance: false, insurance: insurance, insuranceData })
                     }
                  }

                  return (<Autocomplete
                     options={this.state.insuranceList}
                     getOptionLabel={(option) => option.insurances}
                     id="auto-complete"
                     autoComplete
                     value={this.state.insuranceData}
                     includeInputInList
                     onChange={this.onChangeInsurance}
                     renderInput={(params) => <TextField
                        placeholder="Versicherung"
                        id="input-with-icon-textfield"
                        {...params}
                        margin="normal"

                     />}
                  />)
               }, filtering: false
            },
            {
               title: 'Versicherten-Nr.', field: 'insuranceNr', filtering: false
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
                  let servicesDatas = [];
                  if (rowData.rowData.id) {
                     let currentService = JSON.parse(rowData.rowData.services);

                     if (!currentService) {
                        currentService = [];
                     }
                     if (this.state.isEditServices) {
                        this.setState({ selectedservice: currentService, isEditServices: false })
                     }


                  }
                  servicesDatas = this.state.selectedservice.map(selectedElement => {
                     console.log('resource', selectedElement);
                     return servicesList.find(element => element.services == selectedElement);
                  })
                  return (

                     <Autocomplete
                        multiple
                        id="tags-standard"
                        options={servicesList}
                        getOptionLabel={(option) => option.services}
                        onChange={this.onChangeServices}
                        value={servicesDatas}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              variant="standard"
                              placeholder="Leistungen"
                           />
                        )}
                     />
                  )

               }, filtering: false
            },
            {
               title: '*Familiendoktor', field: 'familyDoctor', editComponent: rowData => {
                  if (rowData.rowData.id) {
                     let familyDoctor = rowData.rowData.familyDoctor;
                     if (this.state.isEditfamilyDoctor) {
                        let familyDoctorData = this.state.family_doctorsList.find(element => element.doctorName == familyDoctor);
                        this.setState({ isEditfamilyDoctor: false, familyDoctor: familyDoctor, familyDoctorData })
                     }
                  }

                  return (<Autocomplete
                     options={this.state.family_doctorsList}
                     getOptionLabel={(option) => option.doctorName}
                     value={this.state.familyDoctorData}
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
               }, filtering: false
            },
            {
               title: '*Zuweiser', field: 'caremanager', render: rowData => {
                  let caremanager = rowData.caremanager;
                  let caremanagerData = {};

                  if (this.state.isEditCaremanager) {
                     caremanagerData = this.state.caremanagersList.find(element => element.id == caremanager);
                     if (caremanagerData) return (<div>{caremanagerData.firstName + ' ' + caremanagerData.lastName}</div>)

                  }


               },
               editComponent: rowData => {
                  if (rowData.rowData.id) {
                     let caremanager = rowData.rowData.caremanager;                   
                     if (this.state.isEditCaremanager) {
                        let caremanagerData = this.state.caremanagersList.find(element => element.id == caremanager);
                        this.setState({ isEditCaremanager: false, caremanager: caremanager, caremanagerData });
                        console.log('caremanage', caremanagerData, caremanager);
                     }

                  }

                  return (<Autocomplete
                     options={this.state.caremanagersList}
                     getOptionLabel={(option) => (option.firstName + ' ' + option.lastName)}
                     value={this.state.caremanagerData}
                     id="auto-complete"
                     autoComplete
                     includeInputInList
                     onChange={this.onChangeCareManager}
                     renderInput={(params) => <TextField
                        id="input-with-icon-textfield"
                        {...params}
                        margin="normal"
                        placeholder="Zuweiser"

                     />}
                  />)
               }, filtering: false
            },
            { title: 'Schlüssel-Nr.', field: 'keyNumber', type: 'numeric', filtering: false },
            { title: 'Etage', field: 'floor', type: 'numeric', filtering: false },
            {
               title: 'Pflegegrad', field: 'degreeCare', lookup: degreeList, filtering: false
            },
            {
               title: '*Apotheke', field: 'pharmacy', editComponent: rowData => {
                  if (rowData.rowData.id) {
                     let pharmacy = rowData.rowData.pharmacy;
                     if (this.state.isEditPharmacy) {
                        let pharmacyData = this.state.pharmaciesList.find(element => element.pharmacyName == pharmacy);
                        this.setState({ isEditPharmacy: false, pharmacy: pharmacy, pharmacyData })
                     }
                  }

                  return (<Autocomplete
                     options={this.state.pharmaciesList}
                     getOptionLabel={(option) => option.pharmacyName}
                     id="auto-complete"
                     autoComplete
                     includeInputInList
                     onChange={this.onChangePharmacies}
                     value={this.state.pharmacyData}

                     renderInput={(params) => <TextField
                        id="input-with-icon-textfield"
                        {...params}
                        margin="normal"
                        placeholder="Apotheke"

                     />}
                  />)
               }
               , filtering: false
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
               filtering: false

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
               , filtering: false
            },
            {
               title: 'Status', field: 'status', render: rowdata => {

                  return (<Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={this.state.statusArray[rowdata.id]}
                     onChange={(event) => this.handleChange(event.target.value, rowdata)}
                  >
                     <MenuItem value='Aufnahme'>Aufnahme</MenuItem>
                     <MenuItem value='Aktiv'>Aktiv</MenuItem>
                     <MenuItem value='Inakktiv'>Inakktiv</MenuItem>
                  </Select>)

               },
               lookup: statusList,


            },
            {
               title: 'Notiz', field: 'note', render: rowData => {

                  return (<div className="td-note">{rowData.note}</div>)
               },
               editComponent: rowData => {

                  if (rowData.rowData.id && rowData.rowData.note) {
                     if (this.state.isEditNote) {
                        console.log('rowData.rowData.note', rowData.rowData.note);
                        this.setState({ note: rowData.rowData.note, isEditNote: false })
                     }
                  }
                  return (
                     <TextField
                        className="full-width"
                        id="outlined-multiline-static"
                        label="Add Note"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        value={this.state.note}
                        onChange={this.handleChangeNote}
                     />)
               },
               filtering: false
            },
            {
               title: 'Benachrichtigungen', field: 'serviceplan', render: rowData => {
                  return (<Switch
                     size="small"
                     color="primary"
                     checked={rowData.serviceplan ? true : false}
                  />)

               },
               editComponent: rowData => {

                  if (this.state.isEditServiceplan && rowData.rowData.id) {
                     this.setState({ serviceplan: rowData.rowData.serviceplan ? true : false, isEditServiceplan: false });
                  }
                  return (<Switch
                     size="small"
                     color="primary"
                     checked={this.state.serviceplan}
                     onChange={e => this.setState({ serviceplan: e.target.checked })}
                  />)

               }, filtering: false
            },
         ],
         note: '',
         data: [],
         selected: [],
         selectedservice: [],
         selectedUsers: [],
         isEditServices: true,
         isEditResources: true,
         isEditUsers: true,
         isEditServiceplan: true,
         isEditInsurance: true,
         isEditfamilyDoctor: true,
         isEditPharmacy: true,
         serviceplan: true,
         insurance: '',
         pharmacy: '',
         birthday: '',
         documentsList: [],
         folders: [],
         downloadDocs: [],
         family_doctorsList: [],
         caremanagersList: [],
         insuranceList: [],
         familyDoctorData: null,
         insuranceData: null,
         pharmaciesList: [],
         pharmacyData: null,
         caremanager: '',
         caremanagerData: null,
         statusArray: [],
         completed: false,
         isEditNote: true,
         isEditCaremanager: true

      };

      this.preViewDialog = React.createRef();

   }

   handleChange(value, data) {
      console.log('thishandle', value)
      userService.editStatus({ id: data.id, status: value }).then(res => {
         if (res) {
            this.setState(prevState => {
               const statusArray = [...prevState.statusArray];
               statusArray[data.id] = value;

               return { ...prevState, statusArray };
            });
         }
         NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
      }).catch(error => {
         NotificationManager.error('Es wurden keine Daten gespeichert');
      });

   }
   handleChangeNote = (event) => {
      console.log('event', event.target.value);
      this.setState({ note: event.target.value });
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
         margin: { top: 100, left: 50, right: 20, bottom: 70 }
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
   onChangeDoctor = (event, familyDoctorData) => {
      if (familyDoctorData) {
         this.setState({ familyDoctor: familyDoctorData.doctorName, familyDoctorData })
      }

   }
   onChangeCareManager = (event, caremanagerData) => {
      console.log('caremanagersList', this.state.caremanagersList);
      if (caremanagerData) {
         this.setState({ caremanager: caremanagerData.id, caremanagerData })
      }

   }

   onChangePharmacies = (event, pharmacyData) => {
      if (pharmacyData) {
         this.setState({ pharmacy: pharmacyData.pharmacyName, pharmacyData })
      }
   }
   onChangeInsurance = (event, insuranceData) => {
      if (insuranceData) {
         this.setState({ insurance: insuranceData.insurances, insuranceData })
      }
   }
   onChangeResources = (event, Resources) => {
      let resources = Resources.map(element => element.resources);
      this.setState({
         selected: [...resources]
      });
   }
   onChangeUsers = (event) => {
      let selectedUsers = [...event.target.value];
      if (selectedUsers.length == usersList.length - 1 || selectedUsers.indexOf('Alle') > -1) selectedUsers = ['Alle'];
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

      let user = JSON.parse(localStorage.getItem('user'));
      this.instance_id = user.instance_id;

      userService.showPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {

         this.setState(state => {
            let columns = state.columns;
            state.columns[21].hidden = (this.instance_id ? true : false);
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
         usersList.push("Alle");

         let family_doctorsList = res.family_doctors;
         let caremanagersList = res.caremanagers;

         let insuranceList = res.insurances;
         let pharmaciesList = res.pharmacies;

         if (res.instances.length) {
            instances = res.instances[0];

         }
         instanceNames = [];
         res.instanceNames.map(ele => {

            instanceNames[ele.id] = ele.instanceName;
         })
         console.log('resinstanceName', instanceNames)

         let statusArray = [];
         res.patients.forEach(element => {

            statusArray[element.id] = element.status;
         });


         this.setState(prevState => {
            const data = res.patients;
            const documentsList = res.documents;
            const folders = res.folders;
            return { ...prevState, data, documentsList, folders, family_doctorsList, insuranceList, pharmaciesList, caremanagersList, statusArray };
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
                  newData.caremanager = this.state.caremanager;
                  newData.serviceplan = this.state.serviceplan;
                  newData.note = this.state.note;
                  console.log('this.state.pharmacy && this.state.familyDoctor && newData.firstName && newData.lastName', this.state.pharmacy);
                  if (newData.pharmacy && newData.familyDoctor && newData.firstName && newData.lastName) {
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

                        this.setState({
                           selected: selected,
                           selectedservice: selectedservice,
                           isEditServices: true,
                           isEditResources: true,
                           isEditServiceplan: true,
                           isEditPharmacy: true,
                           isEditUsers: true,
                           isEditfamilyDoctor: true,
                           isEditInsurance: true,
                           isEditCaremanager: true,
                           isEditNote: true,
                           insurance: "",
                           familyDoctor: "",
                           pharmacy: '',
                           birthday: '',
                           caremanager: '',
                           selectedUsers: []
                        });
                        NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
                     }).catch(error => {
                        NotificationManager.error(error.message);
                     });
                  }
                  else {

                     NotificationManager.warning("Bitte füllen Sie die erforderlichen Felder aus.")
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
                  newData.resources = JSON.stringify(this.state.selected);
                  newData.services = JSON.stringify(this.state.selectedservice);
                  newData.userGroup = JSON.stringify(this.state.selectedUsers);
                  if (this.state.insurance) newData.insurance = this.state.insurance;
                  if (this.state.familyDoctor) newData.familyDoctor = this.state.familyDoctor;
                  if (this.state.pharmacy) newData.pharmacy = this.state.pharmacy;
                  if (this.state.birthday) newData.birthday = this.state.birthday;
                  if (this.state.serviceplan) newData.serviceplan = this.state.serviceplan;
                  if (this.state.caremanager) newData.caremanager = this.state.caremanager;
                  newData.note = this.state.note;
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
                           this.setState({
                              selected: selected,
                              selectedservice: selectedservice,
                              isEditServices: true,
                              isEditResources: true,
                              isEditServiceplan: true,
                              isEditPharmacy: true,
                              isEditUsers: true,
                              isEditfamilyDoctor: true,
                              isEditInsurance: true,
                              isEditCaremanager: true,
                              isEditNote: true,
                              caremanager: '',
                              insurance: "",
                              familyDoctor: "",
                              pharmacy: '',
                              birthday: '',
                              selectedUsers: [],
                              serviceplan: true
                           });
                        }
                        NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
                     }).catch(error => {
                        NotificationManager.error(error.message);
                     });
                  }
                  else {

                     NotificationManager.warning("Bitte füllen Sie die erforderlichen Felder aus.")
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
                     NotificationManager.success("Die Daten werden erfolgreich gelöscht.")
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

                           NotificationManager.success("Die Daten werden erfolgreich gespeichert.")
                        }).catch(error => {
                           NotificationManager.error(error.message);
                        });
                     }
                     else {
                        NotificationManager.warning("Bitte füllen Sie die erforderlichen Felder aus.")
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
                        NotificationManager.success("Die Daten werden erfolgreich gelöscht.")
                     })
                  }, 600);
               }),
         };
      return (
         <div className="tables-wrapper search-table-wrap patients">
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
                        actionRowIndex: -1,
                        filtering: true
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


