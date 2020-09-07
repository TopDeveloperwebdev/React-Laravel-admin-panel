import React from 'react'
import { ESmoothLineChart } from '../GlobalComponents'

class SmoothLineChart extends React.Component {
	render() {
		return (
			<ESmoothLineChart xAxisdata={this.props.xAxisdata} seriesData={this.props.seriesData} />
		);
	}
}

export default SmoothLineChart;