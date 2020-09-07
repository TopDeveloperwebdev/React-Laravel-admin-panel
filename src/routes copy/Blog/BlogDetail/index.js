/**
 * Blog Detail Page
 */
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import IntlMessages from 'util/IntlMessages';
import {Grid,Typography,Button,Paper,Avatar,Box,Card,CardContent} from '@material-ui/core';
import { CustomCard, SocialIcons } from 'components/GlobalComponents';
import BlogData from 'assets/Data/BlogData';
import clsx from 'clsx';

const styles = theme => ({
	Paper: {
		margin: '1.5rem',
		backgroundColor: theme.palette.background.paper,
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		borderRadius: '4px',
		'&:last-child': {
			paddingBottom: '30px',
		}
	},
	mrgnR: {
		marginRight: "20px",
	},
	btn:{
		[theme.breakpoints.down('xs')]: {
			marginBottom: "10px",
		},
	},
	card: {
		boxShadow: 'none'
	},
	cardContent: {
		paddingLeft: 0,
		paddingRight: 0,
	},
	media: {
		height: 220,
		objectFit: 'cover',
		borderRadius: '4px',
	},
	backgroundProps: {
		height: '541px',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.down('md')]: {
			height: '430px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '360px',
		},
		[theme.breakpoints.down('xs')]: {
			height: '260px',
		},
		'@media (max-width:375px)': {
			height: '190px',
		}
	},
	authorImg: {
		height: '90px',
		width: '90px',
		[theme.breakpoints.down('xs')]: {
			height: '70px',
			width: '70px',
		},
	},
	customcard: {
		padding: '1.5rem'
	},
	pointer:{
		cursor:'pointer',
	}
});

class BlogDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allBlogs: BlogData.data,
			blogId: parseInt(this.props.match.params.id),
			selectedBlog: null,
			relatedItems: []
		}
	}

	componentDidMount() {
		this.getBlogItem(this.state.allBlogs);
		this.relatedItems(this.state.allBlogs)
	}	

	getBlogItem(allBlogs) {
		let { blogId } = this.state;
		if (allBlogs && allBlogs.length > 0) {
			for (let Item of allBlogs) {
				if (Item.id === blogId) {
					this.setState({
						selectedBlog: Item
					})
				}
			}
		}
	}

	readRecent(blog) {
		const { history } = this.props;
		this.setState({
			selectedBlog: blog,
			blogId: blog.id
		})
		this.relatedItems(this.state.allBlogs)
		history.push(`/app/blog/blog-detail/${blog.id}`);
	}

	relatedItems(allBlogs) {
		let { blogId } = this.state;
		let newItems = allBlogs.filter((item) => item.id !== blogId)
		this.setState({
			relatedItems: newItems
		})
	}

	createMarkup(value) {
		return { __html: value };
	}

	render() {
		const { selectedBlog, relatedItems } = this.state;
		const { classes } = this.props;
		return (
			<Fragment>
				{selectedBlog !== null ?
					<div className="blog-detail-wrap">
						<Box pt={1}>
							<Paper className={classes.Paper}>
								<Box px={{ xs: 2, sm: 3 }} pt={4} pb={3}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={12} md={7} lg={8}>
											<Box mb={3}>
												<Typography variant="h3">{selectedBlog.title}</Typography>
											</Box>
											<Box display="flex" alignItems="center">
												<Box>
													<Avatar className={classes.authorImg} alt="user-thumb" src={require(`assets/Images/avatars/${selectedBlog.authorImage}`)} />
												</Box>
												<Box pl={{ xs: 2, sm: 3 }} className="author-content">
													<Box>By <Box component="span" color="primary.main">{selectedBlog.author}</Box> Lorem News</Box>
													<Typography variant="subtitle2">Updated {selectedBlog.metaData.updatedOn}</Typography>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} md={5} lg={4}>
											<Box display={{ xs: 'block', sm: 'flex' }} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} pt={{ xs: 0, sm: 1 }} mb={{ xs: 2, sm: 3 }}>
												<Button size="large" className={clsx(classes.btn, classes.mrgnR ,"edit-btn")} variant="outlined" color="primary">
                                       <IntlMessages id="component.editBlog" />
												</Button>
												<Button size="large" className={classes.btn} variant="contained" color="secondary">
                                       <IntlMessages id="component.deleteBlog" />
												</Button>
											</Box>
											<Box textAlign={{ xs: 'left', md: 'right' }} className="social-wrap">
												<SocialIcons />
											</Box>
										</Grid>
									</Grid>
								</Box>
								<Box className={classes.backgroundProps} style={{ backgroundImage: 'url(' + require(`assets/Images/${selectedBlog.image}`) + ')' }}>
								</Box>
								<Box px={{ xs: 2, sm: 3 }} pt={1}>
									<p dangerouslySetInnerHTML={this.createMarkup(selectedBlog.content)} />
								</Box>
							</Paper>
						</Box>
						<Box m={3} mb={5}>
                     <CustomCard cardClasses={classes.CustomCard} title={<IntlMessages id="component.recentBlog" />
} showDivider={true} >
								<Box mt={3}>
									<Grid container spacing={3}>
										{relatedItems.map((blog, i) => (
											<Fragment key={i}>
												{i < 4 &&
													<Grid item xs={12} sm={6} md={3}>
														<Card className={classes.card}>
															<Box lineHeight={0.9} onClick={() => this.readRecent(blog)} style={{cursor:'pointer'}}>
																<img src={require(`assets/Images/${blog.image}`)} alt="thumb-wrap" className={clsx(
																'img-fluid',classes.media)}/>
															</Box>
															<CardContent className={classes.cardContent}>
																<Box fontSize="h6.fontSize" fontWeight="h6.fontWeight" className={classes.pointer} onClick={() => this.readRecent(blog)} color="primary.main" mb={1}>{blog.title}</Box>
																<Box component="p" m={0}>{blog.desc.length > 180 ? blog.desc.substring(0, 80) + '...' : blog.desc}</Box>
															</CardContent>
														</Card>
													</Grid>
												}
											</Fragment>
										))}
									</Grid>
								</Box>
							</CustomCard>
						</Box>
					</div>
					:
					null
				}
			</Fragment>
		)
	}
}
export default withStyles(styles)(BlogDetail);