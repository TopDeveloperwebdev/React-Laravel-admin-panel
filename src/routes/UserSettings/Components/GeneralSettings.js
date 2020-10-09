/**
 * General Settings
 */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, Button, Avatar, Box } from '@material-ui/core';
import { useDispatch, useSelector, connect } from 'react-redux';
// Component
import { ContentLayout } from 'components/Layouts';
import { userService } from '../../../_services';
import { NotificationManager } from 'react-notifications';
const useStyles = makeStyles(theme => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	profileThumb: {
		'& >div': {
			'& >div': {
				'& >div:first-child': {
					alignSelf: 'center'
				}
			}
		}
	},
	fileUpload: {
		'& input': {
			height: 'auto',
		}
	}
}));




export default function GeneralSettings() {
	const classes = useStyles();
	const state = useSelector(({ authUser }) => authUser);
	console.log('state',)
	const [username, setName] = React.useState(state.name);
	const [useremail, setEmail] = React.useState(state.email);
	const [file, setFile] = React.useState('');
	const [useravatar, setAvatar] = React.useState(state.userAvatar);
	const handleChangeName = (event) => {		
		setName(event.target.value);	
	};

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangeAvatarFile = (event) => {		
		setFile(event.target.files[0]);
	};
	const submitUser = () => {
		const formData = new FormData()
		formData.append('file', file);	
		formData.append('data', JSON.stringify({id : state.id, email : useremail , name : username}));
		console.log('foradat' , formData);
		userService.editUsers(formData).then(res => {
		    NotificationManager.success("Wurde erfolgreich gespeichert");
		}).catch(error => {
			NotificationManager.error("Diese E-Mail existiert bereits oder ist ein Netzwerkfehler.");
		});;
		
	}

	return (
		<div className="hk-general-settings">
			<form>
				<Box mb={3} className={classes.profileThumb}>
					<ContentLayout title="Your Profile Image">
						<Box width="100%" display="flex" alignItems="center">
							<Box pr={2} className="avatar-thumb">
								<Avatar src={useravatar ? useravatar : require('assets/Images/avatars/user-4.jpg')} alt="Remy Sharp" className={classes.large} />
							</Box>
							<Box width="100%">
								<TextField
									fullWidth
									type="file"
									id="profileImage"
									name="profileImage"
									accept="image/*"
									className={classes.fileUpload}
									onChange={handleChangeAvatarFile}
								/>
							</Box>
						</Box>
					</ContentLayout>
				</Box>
				<Box mb={3}>
					<ContentLayout title="User Name">
						<FormControl fullWidth>
							<TextField
								id="User Name"
								name="name"
								placeholder="User Name"
								className=""
								type="input"
								value={username}
								onChange={handleChangeName}
							/>
						</FormControl>
					</ContentLayout>
				</Box>
				<Box mb={2}>
					<ContentLayout title="E-mail">
						<FormControl fullWidth>
							<TextField
								id="email"
								placeholder="Email"
								className=""
								type="input"
								value={useremail}
								onChange={handleChangeEmail}
							/>
						</FormControl>
					</ContentLayout>
				</Box>
				<Box mb={3}>
					<ContentLayout>
						<Button variant="outlined" color="primary" className="primary-bg-btn" onClick={submitUser}>Save</Button>
					</ContentLayout>
				</Box>
			</form>
		</div>
	)
}