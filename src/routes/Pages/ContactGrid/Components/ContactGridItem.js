import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Switch,CardActions, Icon, Avatar, IconButton, Box, Typography } from '@material-ui/core';
import OperationButton from './OperationButton';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	thumb: {
		width: 100,
		height: 100,
		marginBottom: 10,
	}
}));

export default function ContactGridItem(props) {
	const classes = useStyles();
	const { contacts } = props;
	return (
		<Fragment>
			{contacts && contacts.map((contact, index) => (
				<div key={index} className="contact-grid-item">
					<Card>
						<CardContent>
							<div className="contact-grid-action">
								<OperationButton parentEditMethod={() => props.parentEditMethod(contact)}
									parentMethod={() => props.parentMethod(contact)}
									data={contact} />
							</div>
							<Avatar alt="Remy Sharp" className={classes.thumb} src={require(`assets/Images/avatars/${contact.image}`)} />
							<div className="contact-grid-content">
								<Box fontSize="subtitle1.fontSize" fontWeight="h6.fontWeight" mb="5px">Medication name</Box>
								<Typography variant="subtitle2">Ingredients</Typography>
								<Box display="flex" alignItems="center" justifyContent="center">
									<Switch
										size="small"										
										color="primary"
									/>
								</Box>
							</div>
						</CardContent>
						<CardActions disableSpacing className="footer-icon">
							<Link to='/app/tables/patients-table'> <IconButton size="small">
								Patients
							</IconButton>
							</Link>
							<Link to='/app/tables/search-table'> <IconButton size="small">
								Directors
							</IconButton>
							</Link>
							<Link to='/app/user-settings'> <IconButton size="small">
								Manager
							</IconButton>
							</Link>
						</CardActions>
					</Card>
				</div>
			))};
		</Fragment>
	);
}