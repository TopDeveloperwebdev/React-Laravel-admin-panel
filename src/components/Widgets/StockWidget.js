/*
 * Task List Widget
 */
import React, { Component } from 'react';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import LineChartV3 from './LineChartV3'
// Data
import Stocksdata from 'assets/Data/Stocks.json';

class StockWidget extends Component {
	state = {
		data: Stocksdata,
		chartData: {
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Dec'],
				chartdata: [250, 310, 150, 420, 250, 450, 250, 310, 150, 420, 250, 450],
				borderColor: "#0387d2",
				pointBackgroundColor: "#fff",
				height: 30,
				pointBorderColor: "#0387d2",
				borderWidth: 1,
				shadowColor: 'rgba(0,0,0,0.4)'
			}
		}
	}
	render() {
		return (
			<Box position="relative" className="sidebar-widget">
				<div className="widget-title">
					<Typography variant="h6">Stock Market</Typography>
				</div>
				<div className="widget-box">
					<Scrollbars
						className="rct-scroll"
						autoHide
						style={{ height: "350px" }}
						ref="taskListScroll"
					>
						<List>
							{this.state.data && this.state.data.map((item, index) => (
								<ListItem key={index} disableRipple button>
									<div className="stock-widget-wrap">
										<div className="stock-title">
											<Typography variant="body2">{item.stockName}</Typography>
											<Typography className="text-over">{item.desc}</Typography>
										</div>
										<div className="stock-chart">
											<LineChartV3 data={item.data}></LineChartV3>
										</div>
										<div className="stock-data">
											<Typography className="stock-current">{item.total}</Typography>
											<Typography className="stock-diff bg-success text-white">{item.profile}</Typography>
										</div>
									</div>
								</ListItem>
							))}
						</List>
					</Scrollbars>
				</div>
			</Box>
		)
	}
}
export default (StockWidget);