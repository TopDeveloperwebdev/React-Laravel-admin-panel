import { authHeader } from '../_helpers';

export const userService = {
   signup,
   login,
   getAll,
   refreshToken,
   addFamilyDirectors,
   showFamilyDirectors,
   editFamilyDirectors,
   deleteFamilyDirectors,
   addPharmacies,
   showPharmacies,
   editPharmacies,
   deletePharmacies,
   addPatients,
   showPatients,
   editPatients,
   deletePatients,

   addMedications,
   showMedications,
   editMedications,
   deleteMedications,
   relationPatients,
   addResources,
   showResources,
   editResources,
   deleteResources,

   addInsurances,
   showInsurances,
   editInsurances,
   deleteInsurances,

   addServices,
   showServices,
   editServices,
   deleteServices,

   addIngredients,
   showIngredients,
   editIngredients,
   deleteIngredients,

   addDocuments,
   showDocuments,
   editDocuments,
   deleteDocuments,
   getDocuments,
   addFolders,
   showFolders,  
   editFolders,
   deleteFolders,
   addInstances,
   showInstances,
   editInstances,
   deleteInstances,
   addUsers,
   showUsers,
   editUsers,
   deleteUsers,
   addPermissions,
   showPermissions,
   editPermissions,
   deletePermissions,

   addRoles,
   showRoles,
   editRoles,
   deleteRoles,

   
   addOrders,
   showOrders,
   editOrders,
   deleteOrders,
   getOrderDetail,
   submitComment
};
const serverUrl = 'http://localhost/adminserver/server/api/';
function signup(data) {
   console.log('data', data);
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addUser', requestOptions)
      .then(user => user.json())
      .then(user => {
         console.log('user', user);
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user', JSON.stringify(user.user));

         return user;
      });
}

function login(username, password) {
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password })
   };

   return fetch(serverUrl + 'login', requestOptions)
      .then(user => user.json())
      .then(user => {
         console.log('user' , user.user);
         
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user', JSON.stringify(user.user));   
         return user;
      });
}
// familydoctors CRUD
function addFamilyDirectors(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addFamilyDirectors', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showFamilyDirectors(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showFamilyDirectors', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editFamilyDirectors(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editFamilyDirectors', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteFamilyDirectors(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteFamilyDirectors', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Medications CRUD
function addMedications(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addMedications', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}

function relationPatients(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'relationPatients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}

function showMedications(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showMedications', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editMedications(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editMedications', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteMedications(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteMedications', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
// Resources CRUD
function addResources(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addResources', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showResources(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showResources', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editResources(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editResources', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteResources(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteResources', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Permissions CRUD
function addPermissions(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addPermissions', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showPermissions(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showPermissions', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editPermissions(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editPermissions', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deletePermissions(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deletePermissions', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Roles CRUD
function addRoles(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addRoles', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showRoles(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showRoles', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editRoles(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editRoles', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteRoles(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteRoles', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
// Orders CRUD
function addOrders(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addOrders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showOrders(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showOrders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function getOrderDetail(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'getOrderDetail', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function submitComment(info) {
   console.log('info' , info);
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'submitComment', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editOrders(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editOrders', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteOrders(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteOrders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Insurances CRUD
function addInsurances(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addInsurances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showInsurances(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showInsurances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editInsurances(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editInsurances', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteInsurances(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteInsurances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Services CRUD
function addServices(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addServices', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showServices(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showServices', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editServices(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editServices', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteServices(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteServices', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Documents CRUD
function addDocuments(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addDocuments', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}


// getByIdDocument CRUD
function getDocuments(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'getDocuments', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}

function showDocuments(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showDocuments', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editDocuments(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editDocuments', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteDocuments(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteDocuments', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}


// Folders CRUD
function addFolders(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addFolders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showFolders(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showFolders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editFolders(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editFolders', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteFolders(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteFolders', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Ingredients CRUD
function addIngredients(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addIngredients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showIngredients(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showIngredients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editIngredients(data) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'editIngredients', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteIngredients(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteIngredients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
// pharmaciespharmacies CRUD
function addPharmacies(formData) {

   const requestOptions = {
      method: 'POST',
      body: formData
   };

   return fetch(serverUrl + 'addPharmacies', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showPharmacies(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showPharmacies', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editPharmacies(data) {

   const requestOptions = {
      method: 'POST',
      body: data
   };
   return fetch(serverUrl + 'editPharmacies', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deletePharmacies(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deletePharmacies', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}



// Users CRUD
function addUsers(data) {

   const requestOptions = {
      method: 'POST',
      body: data
   };

   return fetch(serverUrl + 'addUsers', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showUsers(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showUsers', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editUsers(data) {

   const requestOptions = {
      method: 'POST',    
      body: data
   };

   return fetch(serverUrl + 'editUsers', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteUsers(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteUsers', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
// Instances CRUD
function addInstances(formData) {

   const requestOptions = {
      method: 'POST',
      body: formData
   };

   return fetch(serverUrl + 'addInstances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showInstances(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };

   return fetch(serverUrl + 'showInstances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editInstances(data) {

   const requestOptions = {
      method: 'POST',
      body: data
   };

   return fetch(serverUrl + 'editInstances', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deleteInstances(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deleteInstances', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}

// Patients CRUD
function addPatients(formData) {

   const requestOptions = {
      method: 'POST',
      body: formData
   };

   return fetch(serverUrl + 'addPatients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res;
      });
}
function showPatients(info) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
   };
   console.log('info', info);
   return fetch(serverUrl + 'showPatients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}
function editPatients(data) {

   const requestOptions = {
      method: 'POST',
      body: data
   };
   return fetch(serverUrl + 'editPatients', requestOptions)
      .then(res => res.json())
      .then(res => {
         console.log('res', res);
         return res
      });
}
function deletePatients(id) {

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
   };

   return fetch(serverUrl + 'deletePatients', requestOptions)
      .then(res => res.json())
      .then(res => {
         return res
      });
}


function refreshToken() {
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username, password })
   };
   return fetch(`http://localhost:4000/users/refreshToken`, requestOptions)
      .then(handleResponse)
      .then(user => {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         console.log('adsfasfasfa', user)
         if (!localStorage.getItem('user') === null) {
            console.log("show this inside if", localStorage.getItem('user'))

            localStorage.setItem('user_id', JSON.stringify(user));
         }
         return user;
      });
}

function getAll() {
   const requestOptions = {
      method: 'GET',
      headers: authHeader()
   };

   return fetch(`http://localhost:4000/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
   return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
         if (response.status === 401) {
            // auto logout if 401 response returned from api
            // logout();
            localStorage.removeItem('user_id');
            // location.reload(true);
         }

         const error = (data && data.message) || response.statusText;
         return Promise.reject(error);
      }
      return data;
   });
}