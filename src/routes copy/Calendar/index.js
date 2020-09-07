/**
 * Calendar
*/
import React from 'react';
import { Box } from '@material-ui/core';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Components
import { CustomCard } from 'components/GlobalComponents';
import { Scrollbars } from 'react-custom-scrollbars';

// Events
import events from './events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

function Calendar() {
	return (
		<div className="hk-calendar-wrap">
			<Scrollbars
					className="rct-scroll"
					autoHide
					style={{ height: "calc(100vh - 64px)" }}
				>
				<Box p={3}>
					<CustomCard>
						<BigCalendar
							events={events}
							views={allViews}
							step={60}
							showMultiDayTimes
							defaultDate={new Date(2020, 1, 12)}
						/>
					</CustomCard>
				</Box>
			</Scrollbars>
		</div>
	);
}

export default Calendar;