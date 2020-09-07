import { authHeader } from '../_helpers';

export const userService = {
   signup,
   login,
   getAll,
   refreshToken,
   addFamilyDirectors,
   showFamilyDirectors
};
const serverUrl = 'http://localhost:8000/api/';
function signup(data) {
    console.log('data',data);
   const requestOptions = {    
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   };

   return fetch(serverUrl + 'addUser', requestOptions)
      .then(handleResponse)
      .then(user => {
         console.log('user' , user);
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user_id', JSON.stringify(user));

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
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user_id', JSON.stringify(user.name));

         return user;
      });
}
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
   return [];
   // return fetch(serverUrl + 'addFamilyDirectors', requestOptions)
   //    .then(res => res.json())
   //    .then(res => {  
   //       return res;
   //    });
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
         if (!localStorage.getItem('user_id') === null) {
            console.log("show this inside if", localStorage.getItem('user_id'))

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