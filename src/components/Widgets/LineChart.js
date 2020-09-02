/**
 * Line Chart
 */
import React from 'react'
import { ReactLineChart } from '../GlobalComponents'
import { Button, ButtonGroup, Grid, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
	textWhite:{
		color:theme.palette.common.white,
	},
	root:{
		border:`1px solid ${theme.palette.common.white}`,
		boxShadow:'none',
	},
	btn:{
		backgroundColor:'#3f51b5',
		'&:hover':{
			backgroundColor:'transparent'
		},
		[theme.breakpoints.down('sm')]: {
			padding: '3px 10px',
		},
	},
	activeBtn:{
		backgroundColor:'#9ca4d5',
		color:theme.palette.text.primary,
		'&:hover':{
			backgroundColor:'#9ca4d5'
		}
	}
});

class LineChart extends React.Component {
	tabs = [
		{ "key": "hourly", "label": "Hourly" },
		{ "key": "daily", "label": "Daily" },
		{ "key": "weekly", "label": "Weekly" },
		{ "key": "monthly", "label": "Monthly" }
	]

	/** class constructor */
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			legends: null,
			activeType: 'daily'
		}
	}

	/** lifecycle */
	componentDidMount() {
		this.onChangeChartData(this.state.activeType)
	}

	/** function to change chart data */
	onChangeChartData = (tabType) => {
		const { data, legends } = this.props
		var newData = data.find(obj => {
			return obj.value === tabType
		})
		this.setState({ data: newData, legends: legends, activeType: newData.value })
	}

	/** main render function */
	render() {
		const { title } = this.props;
		const { data, activeType } = this.state;
		const { classes } = this.props;
		return (
			<div className="widget-line-chart">
				<Box pt="20px" px={2} mb={2}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4} md={6}>
							<Typography variant="h4" style={{color:'#fff'}}>{title}</Typography>
						</Grid>
						<Grid item xs={12} sm={8} md={6}>
							<Box textAlign={{ xs: 'left', sm: 'right' }}>
								{this.tabs && this.tabs.length > 0 &&
									< >
										<ButtonGroup className={classes.root}>
											{this.tabs.map((tab, index) => (
												<Button 
													key={tab.key} 
													className={clsx(classes.btn, {[classes.activeBtn]: activeType === tab.key})}  
													onClick={() => this.onChangeChartData(tab.key)} 
													variant="contained" 
													color="primary"
													>
													{tab.label}
												</Button>
											))}
										</ButtonGroup>
									</>
								}
							</Box>
						</Grid>
					</Grid>
				</Box>
				<Box>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{data &&
								<Box pl="12px" pr="4px" className="widget-content-wrap">
									<ReactLineChart data={data}/>
								</Box>
							}
						</Grid>
					</Grid>
				</Box>
			</div>
		);
	}
}

LineChart.defaultProps = {
	legends: ["Revenue", "Ecommerce Conversion Rate"],
	data: null,
	defaultEnabledKey: 'daily'
}

export default withStyles(styles)(LineChart);