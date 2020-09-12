/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import MultiSelect from "@khanacademy/react-multi-select";
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

let insuranceList = {};
let pharmaciesList = {};
let family_doctorsList = {};

let resourcesList = [];
let servicesList = [];

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
            { title: 'Salutation', field: 'salutation' },
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Street nr', field: 'streetNr' },
            { title: 'zip code', field: 'zipCode' },
            { title: 'City', field: 'city' },
            { title: 'Birthday', field: 'birthday' },
            { title: 'Phone 1', field: 'phone1' },
            { title: 'Phone 2', field: 'phone2' },
            { title: 'E-Mail', field: 'email' },

            {
               title: 'Resources', field: 'resources', render: props => {
                  let selectedResources = JSON.parse(props.resources);
                  if (!selectedResources) {
                     selectedResources = [];
                  }
                  return (
                     <MultiSelect
                        options={resourcesList}
                        selected={selectedResources}
                     />
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

                        options={resourcesList}
                        selected={this.state.selected}
                        onSelectedChanged={selected => this.setState({ selected })}

                     />
                  )

               }

            },

            {
               title: 'Insurance', field: 'insurance', lookup: insuranceList
            },
            {
               title: 'Services', field: 'services', render: props => {
                  let selectedServices = JSON.parse(props.services);
                  if (!selectedServices) {
                     selectedServices = [];
                  }
                  return (
                     <MultiSelect
                        name="services"
                        options={servicesList}
                        selected={selectedServices}
                     />
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
                        options={servicesList}
                        selected={this.state.selectedservice}
                        onSelectedChanged={selectedservice => { console.log("selectedservice", selectedservice); this.setState({ selectedservice }) }}
                     />
                  )

               }
            },
            {
               title: 'Family Doctor', field: 'familyDoctor', lookup: family_doctorsList
            },
            { title: 'Key number', field: 'keyNumber', type: 'numeric' },
            { title: 'Floor', field: 'floor', type: 'numeric' },
            {
               title: 'Degree of care', field: 'degreeCare'
            },
            {
               title: 'Pharmacy', field: 'pharmacy', lookup: pharmaciesList
            },
            { title: 'User group', field: 'userGroup' },
            { title: 'Status', field: 'status' },
         ],
         data: [],
         selected: [],
         selectedservice: [],
         isEditServices: true,
         isEditResources: true,

      };


   }


   componentDidMount() {
      this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
      let user = JSON.parse(localStorage.getItem('user_id'));
      this.instance_id = user.instance_id;
      console.log('res', this.instance_id);
      userService.showPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {
         resourcesList = [];
         servicesList = [];
         res.services.map(ele => {
            servicesList.push({ label: ele.services, value: ele.services });
         })
         res.resources.map(ele => {
            resourcesList.push({ label: ele.resources, value: ele.resources });
         })

         res.family_doctors.map(ele => {
            family_doctorsList[ele.family_doctors] = ele.family_doctors;
         })

         res.insurances.map(ele => {
            insuranceList[ele.insurances] = ele.insurances;
         })
         res.pharmacies.map(ele => {
            pharmaciesList[ele.pharmacies] = ele.pharmacies;
         })
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

                                 newData.instance_id = this.instance_id;
                                 newData.resources = JSON.stringify(this.state.selected);
                                 newData.services = JSON.stringify(this.state.selectedservice);
                                 const formData = new FormData()
                                 formData.append('file', newData.picture);
                                 newData.picture = '';
                                 formData.append('data', JSON.stringify(newData));
                                 userService.addPatients(formData).then(res => {
                                    const selected = [];
                                    const selectedservice = [];
                                    this.setState(prevState => {
                                       const data = [...prevState.data];
                                       data.push(res);
                                       return { ...prevState, data };
                                    });
                                    this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true });
                                 });

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
                                 formData.append('data', JSON.stringify(newData));

                                 userService.editPatients(formData).then(res => {
                                    if (oldData) {
                                       this.setState(prevState => {
                                          const data = [...prevState.data];
                                          data[data.indexOf(oldData)] = res;
                                          return { ...prevState, data };
                                       });
                                       const selected = [];
                                       const selectedservice = [];
                                       this.setState({ selected: selected, selectedservice: selectedservice, isEditServices: true, isEditResources: true });
                                    }
                                 })
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


