/**
 * Blog Routing File
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
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
   AsyncServicesComponent,
   AsyncIngredientsComponent,
   AsyncInstancesComponent,
   AsyncPermissionsComponent,
   AsyncRolesComponent,
   AsyncOrderComponent,
   AsyncUsersComponent,
   AsyncManageOrdersComponent,
   AsyncDocumentsComponent
} from 'components/AsyncComponent/AsyncComponent';

const Tables = ({ match }) => {
   // if (match.url === "/") {
   //    if (user === null) {
   //       return (<Redirect to="/signin" />);
   //    } else {
   //       return (<Redirect to="app/fullpagemenu" />);
   //    }
   // }
   const state = useSelector(({ authUser }) => authUser);
   console.log('state', state);
   const RouteWithRole = ({ component: Component, permission, ...rest }) =>
      <Route
         {...rest}
         render={props => {


            if (state.instance_id) {
               if (state.permissions) {
                  let permissions = JSON.parse(state.permissions);
                  if (permissions.indexOf(permission) > -1) {
                     return (<Component {...props} />)
                  }
                  else {
                     return (<Redirect
                        to={{
                           pathname: '/error/404'
                        }}
                     />)
                  }
               }
               else {
                  return (<Redirect
                     to={{
                        pathname: '/error/404'
                     }}
                  />)
               }

            }
            else {
               return (<Component {...props} />)
            }
         }
         }
      />;

   return (
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/ag-grid`}></Redirect>
         <Route path={`${match.url}/ag-grid`} component={AsyncAgGridComponent}></Route>
         <Route path={`${match.url}/basic-table`} component={AsyncBasicTableComponent}></Route>
         <Route path={`${match.url}/search-table`} component={AsyncSearchTableComponent}></Route>

         <RouteWithRole
            path={`${match.url}/users`}
            permission="users_access"
            component={AsyncUsersComponent}
         />
         <RouteWithRole
            path={`${match.url}/pharmacies`}
            permission="pharmacies_access"
            component={AsyncPharmaciesComponent}
         />
         <RouteWithRole
            path={`${match.url}/medication`}
            permission="medication_access"
            component={AsyncMedicationComponent}
         />
         <RouteWithRole
            path={`${match.url}/patients`}
            permission="patients_access"
            component={AsyncPatientsTableComponent}
         />
         <RouteWithRole
            path={`${match.url}/doctors`}
            permission="doctors_access"
            component={AsyncFamilyDoctorsComponent}
         />
         <RouteWithRole
            path={`${match.url}/resources`}
            permission="resources_access"
            component={AsyncResourcesComponent}
         />
         <RouteWithRole
            path={`${match.url}/permissions`}
            permission="permissions_access"
            component={AsyncPermissionsComponent}
         />
         <RouteWithRole
            path={`${match.url}/roles`}
            permission="roles_access"
            component={AsyncRolesComponent}
         />
           <RouteWithRole
            path={`${match.url}/insurances`}
            permission="insurances_access"
            component={AsyncInsurancesComponent}
         />
           <RouteWithRole
            path={`${match.url}/services`}
            permission="services_access"
            component={AsyncServicesComponent}
         />
           <RouteWithRole
            path={`${match.url}/Ingredients`}
            permission="ingredients_access"
            component={AsyncIngredientsComponent}
         />
         <RouteWithRole
            path={`${match.url}/instances`}
            permission="instances_access"
            component={AsyncInstancesComponent}
         />
         <RouteWithRole
            path={`${match.url}/order`}
            permission="order_access"
            component={AsyncOrderComponent}
         />
          <RouteWithRole
            path={`${match.url}/manage-orders`}
            permission="manageOrders_access"
            component={AsyncManageOrdersComponent}
         />
         <RouteWithRole
            path={`${match.url}/documents`}
            permission="documents_access"
            component={AsyncDocumentsComponent}
         />
         {/* <Route path={`${match.url}/pharmacies`} component={AsyncPharmaciesComponent}></Route> */}
         {/* <Route path={`${match.url}/medication`} component={AsyncMedicationComponent}></Route> */}
         {/* <Route path={`${match.url}/patients`} component={AsyncPatientsTableComponent}></Route> */}
         {/* <Route path={`${match.url}/doctors`} component={AsyncFamilyDoctorsComponent}></Route> */}
         {/* <Route path={`${match.url}/resources`} component={AsyncResourcesComponent}></Route> */}
         {/* <Route path={`${match.url}/permissions`} component={AsyncPermissionsComponent}></Route> */}
         {/* <Route path={`${match.url}/roles`} component={AsyncRolesComponent}></Route> */}

         {/* <Route path={`${match.url}/insurances`} component={AsyncInsurancesComponent}></Route> */}
         {/* <Route path={`${match.url}/services`} component={AsyncServicesComponent}></Route> */}
         {/* <Route path={`${match.url}/Ingredients`} component={AsyncIngredientsComponent}></Route> */}
         {/* <Route path={`${match.url}/instances`} component={AsyncInstancesComponent}></Route> */}
         {/* <Route path={`${match.url}/users`} component={AsyncUsersComponent}></Route> */}
         {/* <Route path={`${match.url}/order`} component={AsyncOrderComponent}></Route> */}
         <Route path={`${match.url}/`} component={AsyncFullPageUrlsComponent}></Route>
      </Switch>
   )

}
export default Tables;