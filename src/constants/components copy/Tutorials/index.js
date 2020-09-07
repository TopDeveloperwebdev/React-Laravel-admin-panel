import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box, Stepper, IconButton } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import VideoPopup from './VideoPopup'
import { notificationSidebarAction } from 'actions';
import IntlMessages from 'util/IntlMessages';
const styles = theme => ({
	typography: {
		padding: theme.spacing(2),
	},
	root: {
		width: '100%',
		maxWidth: 450,
		padding: 0,
	},
});
const stepsList = [
	{
		"id": 1,
		"type": "video",
		"title": "components.welcomeToHulk",
		"linkText": "",
		"videoLink": "https://www.youtube.com/embed/JSU9EK5bKeI",
		"thumbnail": "blog-6.jpg",
		"additionalInfo": "Building a Admin Panel often takes too much time and takes away from things you should be doing. With Hulk, we've already done the work for you. We've built over 30 webpages that you can customize just how you like. To feel close look, please click on the Video link to see whats available."
	},
	{
		"id": 2,
		"type": "link",
		"title": "components.advancedTable",
		"linkText": "components.clicktoknowmore",
		"url": "/app/tables/custom-table",
		"additionalInfo": "This table enables you to look around the basics information of the specific user without going to detail of the user. You can enter any information in the table like contact no, email, etc."
	},
	{
		"id": 3,
		"type": "link",
		"title": "components.chatPanel",
		"linkText": "components.clicktoknowmore",
		"url": "/app/chat",
		"additionalInfo": "Fully Created for to covering all the aspects of the professional chat panal. You can Search the users from the chat list. Dynamic Typing of the messages. Bots Suggestions and many more. "
	},
	{
		"id": 4,
		"title": "components.signaturePad",
		"type": "link",
		"linkText": "components.clicktoknowmore",
		"url": "/app/pages/signature-pad",
		"additionalInfo": "Signature Pad enables you to edit in the given form and you can duly sign the docs and send or save as pdf file."
	},
	{
		"id": 5,
		"title": "components.help",
		"type": "button",
		"linkText": "components.clickhereifyouneedanyhelp",
		"additionalInfo": "Our dedicated support professionals are always ready to help you to fix problems."
	}
]
const cookies = new Cookies();
class ProjectTutorial extends React.Component {
	constructor(props) {
		super(props)

		this.confirmationDialog = React.createRef();
		this.state = {
			anchorEl: false,
			activeStep: 0,
			stepId: cookies.get('stepId') || 0
		};
	}

	componentDidMount() {
		this.updateProjectToturialStep();
		if (this.state.anchorEl === false) {
			this.setState({
				anchorEl: true,
			});
		}
	}
	updateProjectToturialStep = event => {
		if (isNaN(cookies.get('stepId'))) {
			console.log('No Cookies!')
		} else {
			if (parseInt(cookies.get('stepId')) !== this.state.activeStep) {
				this.setState({
					activeStep: parseInt(cookies.get('stepId')) + 1
				})
			}
		}
	}
	//Define function for open dropdown
	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
		document.body.classList.add("tutorials-overlay--enable");
		document.body.classList.remove("tutorials-overlay--disable");
	};

	//Define function for close dropdown
	handleClose = () => {
		this.setState({
			anchorEl: false,
		});
	};
	handleNext(id) {
		const { cookies } = this.props;
		let check = id - this.state.activeStep
		if (check === 1) {
			this.setState({
				activeStep: id
			});
			cookies.set('stepId', this.state.activeStep);
		}
		if (id === 5) {
			this.props.notificationSidebarAction(true)
		}
	};
	onOverlayClick() {
		document.body.classList.add("tutorials-overlay--disable");
		document.body.classList.remove("tutorials-overlay--enable");
	}
	render() {
		const { anchorEl, activeStep } = this.state;
		const open = Boolean(anchorEl);
		const { classes } = this.props;
		return (
			<div className="h-stepper-body">
				<Button aria-describedby={open ? 'simple-popper' : null} className="tutorial-btn" variant="contained" onClick={this.handleClick}>
					<IntlMessages id="components.tutorials" />
		  		</Button>
				<div className="h-overlay-layer" onClick={() => this.onOverlayClick()}></div>
				<div className="tutorials-wrap">
					<IconButton className="close-icon" size="small"  onClick={() => this.onOverlayClick()}>
						<Box component="span" color="primary.contrastText" className="material-icons-outlined">close</Box>
					</IconButton>
					<Typography variant="h6" className="h-stepper--head"><IntlMessages id="components.checklist" /></Typography>
					<div className="tutorials-box">
						<Box className={`${classes.root} h-stepper-wrap`}>
							<Stepper className="h-stepper" activeStep={activeStep} orientation="vertical">
								{stepsList.map((step, index) => (
									<Step className="h-stepper--list" key={step.id}>
										<StepLabel className="h-stepper--title"><IntlMessages id={step.title} /></StepLabel>
										<StepContent className="steppercontent" TransitionProps={{ in: true }}>
											<Box color="text.secondary">
												<p className="h-stepper--content">{step.additionalInfo}</p>
												{step.type === 'video' ?
													<>
														<div className="h-stepper--video">
															<img alt="img-fluid" src={require(`assets/Images/${step.thumbnail}`)} />
															<div className="video-wrapper">
																<VideoPopup onClose={() => this.handleNext(step.id)} videoLink={step.videoLink} />
															</div>
														</div>
													</>
													: null
												}
												{step.type === 'link' ?
													<Link className="h-stepper--link" onClick={() => this.handleNext(step.id)} to={step.url}> <IntlMessages id={step.linkText} /><span className="material-icons">arrow_right_alt</span></Link>
													:
													null
												}
												{step.type === 'button' ?
													<span className="h-stepper--link" onClick={() => this.handleNext(step.id)}><IntlMessages id={step.linkText} /><span className="material-icons">
														arrow_right_alt</span></span>
													:
													null
												}
											</Box>
										</StepContent>
									</Step>
								))}
							</Stepper>
						</Box>
					</div>
				</div>
			</div>
		);
	}
}
// export default withCookies(withStyles(styles)(ProjectTutorial));
// map state to props
const mapStateToProps = ({ settings }) => {
	return { settings }
}

export default withCookies(withRouter(connect(mapStateToProps, { notificationSidebarAction })(withStyles(styles)(ProjectTutorial))));