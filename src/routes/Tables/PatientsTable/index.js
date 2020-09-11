/**
 * Search Table
*/
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Container, Box, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { userService } from '../../../_services';
//Components
import { SmallTitleBar } from 'components/GlobalComponents';
import IntlMessages from 'util/IntlMessages';

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
               title: 'Resources', field: 'resources',
               editComponent: props => (
                  <FormControl >
                     <Select
                        native
                        inputProps={{
                           name: 'resources1',
                           id: 'resources1-native-simple',
                        }}
                        onChange={e => props.onChange(e.target.value)}
                     >
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                     </Select>
                  </FormControl>),

            },

            {
               title: 'Insurance', field: 'insurance', editComponent: props => (
                  <FormControl >
                     <Select
                        native
                        inputProps={{
                           name: 'insurance1',
                           id: 'insurance1-native-simple',
                        }}
                        onChange={e => props.onChange(e.target.value)}
                     >
                        <option value={10}>insurance1</option>
                        <option value={20}>insurance2</option>
                        <option value={30}>insurance3</option>
                     </Select>
                  </FormControl>),
            },
            {
               title: 'Services', field: 'services', editComponent: props => (
                  <FormControl >
                     <Select
                        native
                        inputProps={{
                           name: 'services',
                           id: 'services-native-simple',
                        }}
                        onChange={e => props.onChange(e.target.value)}
                     >
                        <option value={10}>services1</option>
                        <option value={20}>services2</option>
                        <option value={30}>services3</option>
                     </Select>
                  </FormControl>),
            },
            { title: 'Family Doctor', field: 'familyDoctor', },
            { title: 'Key number', field: 'keyNumber' },
            { title: 'Floor', field: 'floor' },
            { title: 'Degree of care', field: 'degreeCare' },
            { title: 'Pharmacy', field: 'pharmacy' },
            { title: 'User group', field: 'userGroup' },
            { title: 'Status', field: 'status' },
         ],
         data: []

      };

   }

   componentDidMount() {
      this.defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTbZrzTIuXAe01k5wgrhWGzPRPRliQygmBCA&usqp=CAU";
      let user = JSON.parse(localStorage.getItem('user_id'));
      this.instance_id = user.instance_id;
      console.log('res', this.instance_id);
      userService.showPatients({ instance_id: this.instance_id, pagination: 1 }).then(res => {

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

                                 newData.instance_id = this.instance_id;
                                 const formData = new FormData()
                                 formData.append('file', newData.picture);
                                 newData.picture = '';
                                 formData.append('data', JSON.stringify(newData));
                                 userService.addPatients(formData).then(res => {
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
                                 const formData = new FormData()
                                 if (typeof newData.picture == 'object') {                                   
                                    formData.append('file', newData.picture);
                                    newData.picture = '';
                                 }

                                 formData.append('data', JSON.stringify(newData));
                                 console.log('newData', newData);
                                 userService.editPatients(formData).then(res => {
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

