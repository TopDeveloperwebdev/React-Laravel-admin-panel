/**
 * Component for line chart
*/
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { hexToRgbA } from 'helpers'

/** main class */
class ESmoothLineChart extends Component {

	/** 
	 * function to get all the required options 
	*/
	getOptions() {
		const { xAxisdata, seriesData, lineColor } = this.props

		const option = {
			grid: {
				top:'0%',
				left: '0%', //Values must be in percentages
				right: '0%',
				bottom: '0%',
			},
			xAxis: {
				type: 'category',
				data: xAxisdata,
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				splitNumber: 3
			},
			series: [{
				data: seriesData,
				type: 'line',
				showSymbol: false,
				smooth: true,
				lineStyle: {
					color: lineColor,
					width: 3,
					shadowColor: hexToRgbA(lineColor, 0.8),
					shadowBlur: 10,
					shadowOffsetY: 10
				},
			}]
		}
		return option;
	}

	render() {
		const { height } = this.props;
		return (
			<ReactEcharts 
				option={this.getOptions()} 
				style={{height: `${height}`, width: '100%'}}
			/>
		);
	}
}

ESmoothLineChart.defaultProps = {
	xAxisdata: null,
	seriesData: null,
	lineColor: "#3f51b5",
}

export { ESmoothLineChart };