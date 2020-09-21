import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_EMAIL_CHANGED,
	LOGIN_USERNAME_CHANGED,
	LOGIN_PASSWORD_CHANGED,
	SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
	LOGOUT_USER,
	JWT_LOGIN_REQUEST,
	JWT_LOGIN_SUCCESS,
	JWT_LOGIN_FAILURE
} from 'actions/Types'

/**
 * Initial auth user
 */

// console.log('init' , INIT_STATE);
let INIT_STATE = {
	user: null,
	instance_id: 0,
	loading: false,
	email: 'hulktestuser@hulk.com',
	password: '12345678',
	instance_id: 1,
	isOwner: 1,
	name: "test",
	permissions: '["directors_access","patients_access","medication_access"]',
	remember_token: null,
	role: "admin",
	status: 1,
	error: '',
	userAvatar : ''
}
if (localStorage.getItem('user') != "undefined") {
	let User = JSON.parse(localStorage.getItem('user'));
	if (User) {
		console.log('USer', User)
		INIT_STATE = User;
		INIT_STATE.user = User.name;
		INIT_STATE.loading = false;
		INIT_STATE.error = '';
	}
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loading: true };

		case LOGIN_USER_SUCCESS:
			return { ...state, loading: false, user: action.payload };

		case LOGIN_USER_FAILURE:
			return { ...state, loading: false, password: '', error: action.payload };

		case LOGIN_EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case LOGIN_USERNAME_CHANGED:
			return { ...state, username: action.payload };
		case LOGIN_PASSWORD_CHANGED:
			return { ...state, password: action.payload };

		case SIGNUP_USER:
			return { ...state, loading: true };

		case SIGNUP_USER_SUCCESS:
			return { ...state, loading: false, user: action.payload };

		case SIGNUP_USER_FAILURE:
			return { ...state, loading: false, error: action.payload };

		case JWT_LOGIN_REQUEST:
			return { ...state, loading: true, loggingIn: true, user: action.payload };

		case JWT_LOGIN_SUCCESS:
			return { ...state, loading: false, loggingIn: true, ...action.payload };

		case JWT_LOGIN_FAILURE:
			return { ...state, loading: false, loggingIn: true, user: action.payload };

		case LOGOUT_USER:
			return { ...state, user: null }

		default: return { ...state };
	}
}