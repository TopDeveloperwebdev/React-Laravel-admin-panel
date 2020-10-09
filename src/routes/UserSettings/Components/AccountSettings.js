/**
 * Accounts settings
 */
import React from 'react';
import { FormControl, TextField, Button, Box, Input, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
// layouts
import { ContentLayout } from 'components/Layouts';
import { userService } from '../../../_services';
import { useDispatch, useSelector, connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
export default function AccountSettings() {
	const state = useSelector(({ authUser }) => authUser);
	const [currentPassword, setCurrentPassword] = React.useState({
		password: '',
		showPassword: false,
	});
	const handleChange = prop => event => {
		setCurrentPassword({ ...currentPassword, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setCurrentPassword({ ...currentPassword, showPassword: !currentPassword.showPassword });
	};
	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const [newPassword, setNewPassword] = React.useState({
		password: '',
		showPassword: false,
	});
	const handleChangeNewPassword = prop => event => {
		setNewPassword({ ...newPassword, [prop]: event.target.value });
	};

	const handleClickShowNewPassword = () => {
		setNewPassword({ ...newPassword, showPassword: !newPassword.showPassword });
	};
	const handleMouseDownNewPassword = event => {
		event.preventDefault();
	};
	const [rePassword, setRePassword] = React.useState({
		password: '',
		showPassword: false,
	});
	const handleChangeRePassword = prop => event => {
		setRePassword({ ...rePassword, [prop]: event.target.value });
	};

	const handleClickShowRePassword = () => {
		setRePassword({ ...rePassword, showPassword: !rePassword.showPassword });
	};
	const handleMouseDownRePassword = event => {
		event.preventDefault();
	};
	const handleUpdate = event => {

		event.preventDefault();
		console.log(currentPassword.password, newPassword.password, rePassword.password)
		if (currentPassword.password && newPassword.password && rePassword.password) {
			if (newPassword.password != rePassword.password) {
				NotificationManager.error('ues Passwort und Bestätigungspasswort stimmen nicht überein');
			} else {
				console.log('state', state.id);
				userService.resetPassword({ id: state.id, password: currentPassword.password, newPassword: newPassword.password }).then(res => {
					console.log('res', res);
					if (res.result == "success")
						NotificationManager.success('Sie haben Ihr Passwort erfolgreich zurückgesetzt.');
					else {
						NotificationManager.error('Zurücksetzen des Passworts fehlgeschlagen.');
					}

				})
			}
		} else {
			NotificationManager.error('Bitte füllen Sie die erforderlichen Felder aus');

		}

	};

	return (
		<div className="hk-account-settings">

			<Box mb={3}>
				<ContentLayout title="Password">
					<form>
						<FormControl fullWidth className="mb-2">
							<Input
								id="standard-adornment-password"
								placeholder="password"
								type={currentPassword.showPassword ? 'text' : 'password'}
								value={currentPassword.password}
								onChange={handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{currentPassword.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Box>
							<FormControl fullWidth className="mb-2">
								<Input

									id="new-password"
									placeholder="New password"
									autoComplete="current-password"
									type={newPassword.showPassword ? 'text' : 'password'}
									value={newPassword.password}
									onChange={handleChangeNewPassword('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowNewPassword}
												onMouseDown={handleMouseDownNewPassword}
											>
												{newPassword.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Box>
						<Box pt={3}>
							<FormControl fullWidth className="mb-2">
								<Input
									id="retype-password"
									placeholder="Retype password"
									autoComplete="current-password"
									type={rePassword.showPassword ? 'text' : 'password'}
									value={rePassword.password}
									onChange={handleChangeRePassword('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowRePassword}
												onMouseDown={handleMouseDownRePassword}
											>
												{rePassword.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}

								/>
							</FormControl>
						</Box>
						<Box pt={2}>
							<FormControl>
								<Button type="submit" variant="outlined" className="primary-bg-btn" color="primary" onClick={handleUpdate}>Update</Button>
							</FormControl>
						</Box>
					</form>
				</ContentLayout>
			</Box>

		</div>
	)
}