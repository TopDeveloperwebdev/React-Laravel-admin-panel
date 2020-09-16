/**
 * App Redux Action Types
 */

// Auth Actions
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGING_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_EMAIL_CHANGED = 'SIGNIN_EMAIL_CHANGED'
export const LOGIN_USERNAME_CHANGED = 'LOGIN_USERNAME_CHANGED'
export const LOGIN_PASSWORD_CHANGED = 'SIGNIN_PASSWORD_CHANGED'

// Chat App Actions
export const CHAT_CONVERSATIONS_TYPE = 'CHAT_CONVERSATIONS_TYPE';
export const CHAT_WITH_SELECTED_USER = 'CHAT_WITH_SELECTED_USER';
export const SEND_MESSAGE_TO_USER = 'SEND_MESSAGE_TO_USER';
export const UPDATE_USERS_SEARCH = 'UPDATE_USERS_SEARCH';
export const SEARCH_USERS = 'SEARCH_USERS';
export const GET_RECENT_CHAT_USERS = 'GET_RECENT_CHAT_USERS';
export const GET_DEFAULT_SELECTED_USER = 'GET_DEFAULT_SELECTED_USER';

// App Settings
export const COLLAPSED_SIDEBAR = 'COLLAPSED_SIDEBAR';
export const MINI_SIDEBAR = 'MINI_SIDEBAR';
export const DARK_MODE = 'DARK_MODE';
export const RTL = 'RTL';
export const HORIZONTAL_MENU = 'HORIZONTAL_MENU';
export const CHOOSE_THEME = 'CHOOSE_THEME';
export const NOTIFICATION_SIDEBAR = 'NOTIFICATION_SIDEBAR';

// Ecommerce
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
export const ON_QUANTITY_CHANGE = 'ON_QUANTITY_CHANGE'
export const ADD_ITEM_TO_WISHLIST = 'ADD_ITEM_TO_WISHLIST'
export const DELETE_ITEM_FROM_WISHLIST = 'DELETE_ITEM_FROM_WISHLIST'

// Contact Grid
export const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const INITIAL_CONTACTS = 'INITIAL_CONTACTS'

// Mail App
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS';
export const GET_EMAIL_FAILURE = 'GET_EMAIL_FAILURE';
export const SET_EMAIL_AS_STAR = 'SET_EMAIL_AS_STAR';
export const READ_EMAIL = 'READ_EMAIL';
export const HIDE_LOADING_INDICATOR = 'HIDE_LOADING_INDICATOR';
export const FETCH_EMAILS = 'FETCH_EMAILS';
export const ON_SELECT_EMAIL = 'ON_SELECT_EMAIL';
export const UPDATE_EMAIL_SEARCH = 'UPDATE_EMAIL_SEARCH';
export const SEARCH_EMAIL = 'SEARCH_EMAIL';
export const ON_DELETE_MAIL = 'ON_DELETE_MAIL';
export const ON_BACK_PRESS_NAVIGATE_TO_EMAIL_LISTING = 'ON_BACK_PRESS_NAVIGATE_TO_EMAIL_LISTING';
export const GET_SENT_EMAILS = 'GET_SENT_EMAILS';
export const GET_INBOX = 'GET_INBOX';
export const GET_DRAFTS_EMAILS = 'GET_DRAFTS_EMAILS';
export const GET_SPAM_EMAILS = 'GET_SPAM_EMAILS';
export const GET_TRASH_EMAILS = 'GET_TRASH_EMAILS';
export const ON_EMAIL_MOVE_TO_FOLDER = 'ON_EMAIL_MOVE_TO_FOLDER';
export const SELECT_ALL_EMAILS = 'SELECT_ALL_EMAILS';
export const UNSELECT_ALL_EMAILS = 'UNSELECT_ALL_EMAILS';
export const ON_SEND_EMAIL = 'ON_SEND_EMAIL';
export const EMAIL_SENT_SUCCESSFULLY = 'EMAIL_SENT_SUCCESSFULLY';
export const FILTER_EMAILS_WITH_LABELS = 'FILTER_EMAILS_WITH_LABELS';
export const ON_SPAM_MAIL = 'ON_SPAM_MAIL';
export const ON_DRAFT_MAIL = 'ON_DRAFT_MAIL';
export const ON_DELETE_EMAIL_FROM_TRASH_FOLDER = 'ON_DELETE_EMAIL_FROM_TRASH_FOLDER';

// User Settings
export const EMAIL_ON_SWITCH_CHANGE = 'EMAIL_ON_SWITCH_CHANGE';
export const SET_LANGUAGE = 'SET_LANGUAGE'

// Menu List 
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_THIRD_MENU = 'TOGGLE_THIRD_MENU';
export const TOGGLE_FOURTH_MENU = 'TOGGLE_FOURTH_MENU';
export const ONLOAD_TOGGLE_MENU = 'ONLOAD_TOGGLE_MENU';
export const ONLOAD_INITIAL_STATE = 'ONLOAD_INITIAL_STATE';
//JWT
export const JWT_LOGIN_REQUEST = 'JWT_USERS_LOGIN_REQUEST';
export const JWT_LOGIN_SUCCESS = 'JWT_USERS_LOGIN_SUCCESS';
export const JWT_LOGIN_FAILURE = 'JWT_USERS_LOGIN_FAILURE';