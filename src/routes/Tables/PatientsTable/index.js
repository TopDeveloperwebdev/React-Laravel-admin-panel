/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, TextField } from '@material-ui/core';
import { AutoComplete, MultiSelect } from '@progress/kendo-react-dropdowns';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

let insuranceList = [];
let pharmaciesList = [];
let salutationList = { Herr: 'Herr', Frau: 'Frau' };
let degreeList = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
let statusList = { Aktiv: 'Aktiv', Inaktiv: 'Inaktiv', Unvollständig: 'Unvollständig' };
let family_doctorsList = {};
let resourcesList = [];
let servicesList = [];
let usersList = [];

class PatientsTable extends Component {
   constructor(props) {
      super(props)
      this.state = {
         columns: [
            {
               title: 'Picture', field: 'picture', render: rowData => <img src={rowData.picture ? rowData.picture : this.defaultUrl} className="logo-td bdr-rad-50" />,
               editComponent: props => {
                  return (
                     <input
                        type='file'
                        onChange={e => props.onChange(e.target.files[0])}
                     />
                  )

               }
            },
            { title: 'Salutation', field: 'salutation', lookup: salutationList },
            { title: '*First Name', field: 'firstName' },
            { title: '*Last Name', field: 'lastName' },
            { title: 'Street nr', field: 'streetNr' },
            { title: 'zip code', field: 'zipCode' },
            { title: 'City', field: 'city' },

            {
               title: 'Birthday', field: 'birthday', render: rowData => {
                  return (<div>
                     {rowData.birthday}
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
            { title: '*Phone 1', field: 'phone1' },
            { title: '*Phone 2', field: 'phone2' },
            { title: 'E-Mail', field: 'email' },

            {
               title: 'Resources', field: 'resources', render: props => {
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
                     <MultiSelect
                        data={resourcesList}
                        value={this.state.selected}
                        onChange={this.onChangeResources}
                     />
                  )

               }

            },

            {
               title: '*Insurance', field: 'insurance', editComponent: rowData => {
                  return (<AutoComplete data={insuranceList} placeholder="Select Insurance" onChange={this.onChangeInsurance} />)
               }
            },

            {
               title: 'Services', field: 'services', render: props => {
                  let selectedServices = JSON.parse(props.services);
                  if (!selectedServices) {
                     selectedServices = [];
                  }
                  return (
                     <div>
                        {
                           servicesList.map((value, index) => {
                              return (<div key={index}>{value}</div>)
                           })
                        }
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
                     <MultiSelect
                        data={servicesList}
                        value={this.state.selectedservice}
                        onChange={this.onChangeServices}
                     />
                  )

               }
            },
            {
               title: '*Family Doctor', field: 'familyDoctor', editComponent: rowData => {
                  return (<AutoComplete data={family_doctorsList} placeholder="Select Family doctor" onChange={this.onChangeDoctor} />)
               }
            },
            { title: 'Key number', field: 'keyNumber', type: 'numeric' },
            { title: 'Floor', field: 'floor', type: 'numeric' },
            {
               title: 'Degree of care', field: 'degreeCare', lookup: degreeList
            },
            {
               title: '*Pharmacy', field: 'pharmacy', editComponent: rowData => {
                  return (<AutoComplete data={pharmaciesList} placeholder="Select Pharmacy" onChange={this.onChangePharmacies} />)
               }
            },
            {
               title: 'User group', field: 'userGroup', render: props => {
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
               title: 'Serviceplan', field: 'serviceplan', render: rowData => {
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
         birthday: ''
      };


   }
   handleChangeDate = (event) => {
      this.setState({ birthday: event.target.value });
   }
   onChangeDoctor = (event) => {
      this.setState({ familyDoctor: event.target.value })
   }
   onChangePharmacies = (event) => {
      this.setState({ pharmacy: event.target.value })
   }

   onChangeInsurance = (event) => {
      this.setState({ insurance: event.target.value });
   }
   onChangeResources = (event) => {
      this.setState({
         selected: [...event.target.value]
      });
   }
   onChangeUsers = (event) => {
      this.setState({
         selectedUsers: [...event.target.value]
      });
   }
   onChangeServices = (event) => {
      this.setState({
         selectedservice: [...event.target.value]
      });
   }
   componentWillMount() {
      this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
      let user = JSON.parse(localStorage.getItem('user'));
      this.instance_id = user.instance_id;
      console.log('res', this.instance_id);
      userService.showPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {
         resourcesList = [];
         servicesList = [];
         servicesList = res.services.map(ele => {
            return ele.services
         });

         resourcesList = res.resources.map(ele => {
            return ele.resources;
         })
         usersList = res.users.map(ele => {
            return ele.name;
         })
         family_doctorsList = res.family_doctors.map(ele => {
            return ele.doctorName;
         })


         insuranceList = res.insurances.map(ele => {
            return ele.insurances;
         })
         pharmaciesList = res.pharmacies.map(ele => {
            return ele.pharmacyName;
         })


         // res.insurances.map(ele => {
         //    insuranceList[ele.insurances] = ele.insurances;
         // })


         // res.pharmacies.map(ele => {
         //    pharmaciesList[ele.pharmacyName] = ele.pharmacyName;
         // })
         // console.log('this.insta' , this.insurances);  


         this.setState(prevState => {
            const data = res.patients;
            return { ...prevState, data };
         });

      })

   }

   render() {

      return (
         <div className="tables-wrapper search-table-wrap">
            <SmallTitleBar
               title={<IntlMessages id="sidebar.patients" />}
               center
            />
            <Container maxWidth="lg">
               <Box px={{ xs: '12px', lg: 0 }} className="page-space">
                  <MaterialTable
                     title={<IntlMessages id="sidebar.patients" />}
                     columns={this.state.columns}
                     data={this.state.data}

                     editable={{
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
                                 if (this.state.pharmacy && this.state.familyDoctor && newData.firstName && newData.lastName && newData.phone1 && newData.phone2) {
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
                                 newData.resources = JSON.stringify(this.state.selected);
                                 newData.services = JSON.stringify(this.state.selectedservice);
                                 newData.userGroup = JSON.stringify(this.state.selectedUsers);
                                 newData.insurance = this.state.insurance;
                                 newData.familyDoctor = this.state.familyDoctor;
                                 newData.pharmacy = this.state.pharmacy;
                                 newData.birthday = this.state.birthday;
                                 formData.append('data', JSON.stringify(newData));
                                 if (this.state.pharmacy && this.state.familyDoctor && newData.firstName && newData.lastName && newData.phone1 && newData.phone2) {
                                    userService.editPatients(formData).then(res => {
                                       if (oldData) {
                                          this.setState(prevState => {
                                             const data = [...prevState.data];
                                             data[data.indexOf(oldData)] = res;
                                             return { ...prevState, data };
                                          });
                                          const selected = [];
                                          const selectedservice = [];
                                          this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true, isEditServiceplan: true, isEditUsers: true, insurance: "", familyDoctor: "", pharmacy: '', birthday: '', selectedUsers: [] });
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
                     }}
                  />
               </Box>
            </Container>
         </div>
      );
   }
}
export default PatientsTable;


