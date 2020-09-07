/**
 * Component for line chart
*/
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Button, Box } from '@material-ui/core';
import classnames from 'classnames';

import { withTheme } from '@material-ui/core/styles';

class StackBarEcharts extends Component {
	state = {
		data1: '',
		data2: '',
		data3: '',
		data4: '',
		data5: '',
		selectedBtn: 'daily'
	}

	componentDidMount() {
		this.pushRandomData('daily');
	}

	pushRandomData(selected) {
		this.setState({selectedBtn: selected})
		let rd1 = '';
		let rd2 = '';
		let rd3 = '';
		let rd4 = '';
		let rd5 = '';
		let selectedData = '';

		selectedData = this.props.data.filter((data) => {
			return data.title === selected;
		})
		rd1 = selectedData[0].data1;
		rd2 = selectedData[0].data2;
		rd3 = selectedData[0].data3;
		rd4 = selectedData[0].data4;
		rd5 = selectedData[0].data5;

		for (let i = 0; i < 8; i++) {
			let elementVal1 = rd1[i]
			let elementVal2 = rd2[i]
			let elementVal3 = rd3[i]
			let elementVal4 = rd4[i]
			let elementVal5 = rd5[i]

			let total = elementVal1 + elementVal2 + elementVal3 + elementVal4 + elementVal5

			let elementValInPercent1 = elementVal1 / total;
			let elementValInPercent2 = elementVal2 / total;
			let elementValInPercent3 = elementVal3 / total;
			let elementValInPercent4 = elementVal4 / total;
			let elementValInPercent5 = elementVal5 / total;

			rd1.splice(i, 1, elementValInPercent1);
			rd2.splice(i, 1, elementValInPercent2);
			rd3.splice(i, 1, elementValInPercent3);
			rd4.splice(i, 1, elementValInPercent4);
			rd5.splice(i, 1, elementValInPercent5);

		}
		this.setState({
			data1: rd1,
			data2: rd2,
			data3: rd3,
			data4: rd4,
			data5: rd5
		})
	}

	getOptions() {
		const option = {
			tooltip: {
				show: false,
			},
			grid: {
				top:'4%',
				left: '1%',
				right: '1%',
				bottom: '1%',
				containLabel: true
			},
			xAxis: {
				type: 'value'
			},
			yAxis: {
				type: 'category',
				data: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6']
			},
			series: [
				{
					name: 'month 1',
					type: 'bar',
					stack: 'Total',
					label: {
						show: false,
						position: 'insideRight'
					},
					data: this.state.data1,
					color: this.props.theme.palette.primary.main
				},
				{
					name: 'month 2',
					type: 'bar',
					stack: 'Total',
					label: {
						show: false,
						position: 'insideRight'
					},
					data: this.state.data2,
					color: this.props.theme.palette.primary.dark
				},
				{
					name: 'month 3',
					type: 'bar',
					stack: 'Total',
					label: {
						show: false,
						position: 'insideRight'
					},
					data: this.state.data3,
					color: this.props.theme.palette.primary.light
				},
				{
					name: 'month 4',
					type: 'bar',
					stack: 'Total',
					label: {
						show: false,
						position: 'insideRight'
					},
					data: this.state.data4,
					color: this.props.theme.palette.primary.dark
				},
				{
					name: 'month 5',
					type: 'bar',
					stack: 'Total',
					label: {
						show: false,
						position: 'insideRight'
					},
					data: this.state.data5,
					color: this.props.theme.palette.primary.main
				}
			]
		}
		return option;
	}

	render() {
		const { selectedBtn } = this.state;
		
		return (
			<div className="dynamic-bar-chart">
				<Box pt={2} pb="5px" display="flex" justifyContent="flex-end" alignItems="center">
					<Box pr={1} className="btn-wrap">
						<Button size="small" variant="outlined" className={classnames({ 'active-Stack' : selectedBtn === 'daily' })}
							onClick={() => this.pushRandomData('daily')}
						>
							Daily
						</Button>
					</Box>
					<Button size="small" variant="outlined" className={classnames({ 'active-Stack' : selectedBtn === 'monthly' })}
						onClick={() => this.pushRandomData('monthly')}
					>
						Monthly
					</Button>
				</Box>
				<ReactEcharts
					option={this.getOptions()}
					style={{ height: "310px", width: '100%' }}
				/>
			</div>
		);
	}
}

StackBarEcharts.defaultProps = {
	data: null
}

export default withTheme(StackBarEcharts);