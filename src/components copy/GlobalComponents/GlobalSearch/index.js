/**
 * Global Search Component
*/
/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Tooltip, IconButton, Box, TextField, Icon } from '@material-ui/core';

import urlName from 'assets/Data/GlobalSearchMenuItem';

const styles = theme => ({
	inputBar: {
		width: 'calc(100% - 40px)',
		'& .MuiInputBase-root': {
			'&:before, &:after': {
				display: 'none',
			}
		}
	},
	closeIcon: {
		width: 40
	}
});

class GlobalSearch extends Component {
	constructor() {
		super()
		this.state = {
			searchResult: false,
			searchData: null,
			value: ''
		};
	}

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		const { windowWidth } = this.state;
		window.addEventListener("resize", this.updateDimensions);
	}
	
	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	updateSearch(e){
		this.setState({value: e.target.value})
		if(e.target.value == ''){
			this.setState({searchResult: false})
		} else {
			this.setState({searchResult: true})
			let filteredMenu = urlName.data.filter((menu,i) => 
			menu.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
			this.setState({searchData: filteredMenu})
		}
	}

	changeSearchResult(){
		this.setState({ searchResult: false, value: '' })
		this.props.showSearchBar()
	}

	render() {
		const { className } = this.props;
		const { classes } = this.props;
		const { searchResult, searchData, value } = this.state;

		return (
			<div className={className}>
				<Box className={classes.inputBar}>
					<TextField 
						fullWidth 
						id="standard-basic" 
						placeholder="Search here..." 
						onChange={(e) => this.updateSearch(e)}
						value={value}
					/>
				</Box>
				<Tooltip title="Close" placement="bottom">
					<IconButton
						className={classes.closeIcon}
						size="small"
						onClick={this.props.showSearchBar}
					>
						<Icon style={{ transform: 'scale(0.9)' }}>close</Icon>
					</IconButton>
				</Tooltip>
				{searchResult && 
					<div className="search-overlay-wrap">
						{searchData.length == 0 ? 
							<div>
								<ul >
									<li>
										<div className="no-result-found">
											<span>Nothing Found</span>
										</div>
									</li>
								</ul>
							</div>
							:
							<div>
								<ul >
									{
										searchData.map((data,i)=>(
											<li key={i}>
												<div>
													<Link to={data.url} onClick={() => this.changeSearchResult()} >{data.name}</Link>
												</div>
											</li>
										))
									}
								</ul>
							</div>
						}
					</div>
				}
			</div>
		);
	}
}

export default withStyles(styles)(GlobalSearch);