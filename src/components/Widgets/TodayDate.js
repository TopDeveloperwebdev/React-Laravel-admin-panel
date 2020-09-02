import React, { Component } from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core';

// Main component
export default class TodayDate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDay: moment().format("Do MMMM"),
			todayDayName: moment().format('dddd')
		}
	}
	render() {
		return (
			<div className="today-date sidebar-widget">
				<Typography variant="h4">{this.state.todayDayName}</Typography>
				<Typography variant="h4">{this.state.currentDay}</Typography>
			</div>
		)
	}
}