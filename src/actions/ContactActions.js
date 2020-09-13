/**
 * Contact Actions
 */

import {
   ADD_NEW_CONTACT,
   DELETE_CONTACT,
   UPDATE_CONTACT,
   INITIAL_CONTACTS
} from 'actions/Types';

export const addNewContact = (data) => ({
   type: ADD_NEW_CONTACT,
   payload: data
});

export const deleteContact = (data) => ({
   type: DELETE_CONTACT,
   payload: data
});

export const onUpdateContact = (data, ID) => ({
   type: UPDATE_CONTACT,
   payload: { data, ID }
})
export const onShowContacts = (data) => ({
   type: INITIAL_CONTACTS,
   payload: { data}
})