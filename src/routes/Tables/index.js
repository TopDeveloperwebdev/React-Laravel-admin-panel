/**
 * Blog Routing File
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
   AsyncAgGridComponent,
   AsyncBasicTableComponent,
   AsyncSearchTableComponent,
   AsyncPharmaciesComponent,
   AsyncPatientsTableComponent,
   AsyncFullPageUrlsComponent,
   AsyncFamilyDoctorsComponent,
   AsyncMedicationComponent,
   AsyncResourcesComponent,
   AsyncInsurancesComponent,
   AsyncServicesComponent
} from 'components/AsyncComponent/AsyncComponent';

const Tables = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/ag-grid`}></Redirect>
      <Route path={`${match.url}/ag-grid`} component={AsyncAgGridComponent}></Route>
      <Route path={`${match.url}/basic-table`} component={AsyncBasicTableComponent}></Route>
      <Route path={`${match.url}/search-table`} component={AsyncSearchTableComponent}></Route>
      <Route path={`${match.url}/pharmacies`} component={AsyncPharmaciesComponent}></Route>
      <Route path={`${match.url}/medication`} component={AsyncMedicationComponent}></Route>
      <Route path={`${match.url}/patients`} component={AsyncPatientsTableComponent}></Route>
      <Route path={`${match.url}/familiy-directors`} component={AsyncFamilyDoctorsComponent}></Route>
      <Route path={`${match.url}/resources`} component={AsyncResourcesComponent}></Route>
      <Route path={`${match.url}/insurances`} component={AsyncInsurancesComponent}></Route>
       <Route path={`${match.url}/services`} component={AsyncServicesComponent}></Route>
      <Route path={`${match.url}/`} component={AsyncFullPageUrlsComponent}></Route>
   </Switch>
)
export default Tables;