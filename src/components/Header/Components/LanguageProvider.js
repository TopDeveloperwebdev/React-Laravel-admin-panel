/**
 * Language Provider Component
 */
import React, {Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import { Divider, Box, List, ListItem, ListSubheader, Typography, Popover, Button } from '@material-ui/core';

// Actions
import { setLanguage, rtlAction } from 'actions';

const styles = theme => ({
   root: {
      width: '100%',
      minWidth: 250,
      maxWidth: 250,
		padding: 0,
		backgroundColor:theme.palette.background.default,
     '& .MuiListSubheader-root':{
			backgroundColor:theme.palette.background.paper,
	  	},
      '& .top-dropdown-menu--item': {
			margin: 5,
			width:'calc(100% - 10px)',
			border:0,
			alignItems:'center',
			padding: '0.5rem',
			cursor:'pointer',
			backgroundColor:theme.palette.background.paper,
      }
   }
});

class LanguageProvider extends Component {
   constructor(props) {
      super(props)
      this.state = {
         anchorEl: null,
      };
	}
	
   //Define function for open dropdown
   handleClick = event => {
      this.setState({
         anchorEl: event.currentTarget,
      });
   };

   //Define function for close dropdown
   handleClose = () => {
      this.setState({
         anchorEl: null,
      });
	};
	
   onChangeLanguage(lang) {
      this.props.setLanguage(lang);
      if (lang.locale === 'ar') {
         this.rtlLayoutHanlder(true);
      } else {
         this.rtlLayoutHanlder(false);
      }
	}
	
   rtlLayoutHanlder(isTrue) {
      var root = document.getElementsByTagName('html')[0];
      if (isTrue) {
         root.setAttribute('dir', 'rtl');
         document.body.classList.add("rtl-layout");
      }
      else {
         root.setAttribute('dir', 'ltr');
         document.body.classList.remove("rtl-layout");
      }
      this.props.rtlAction(isTrue);
	}
	
   render() {
      const { locale, languages } = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
      const { classes } = this.props;
      return (
         <div>
				<Button aria-describedby={open ? 'notifications' : null} variant="contained" color="default"
               style={{ padding: '6px' }}
               onClick={this.handleClick}
				>
               <img alt="translate-icon" width="35" height="20" src={require(`assets/Images/flags/${locale.icon}`)} />
					<Box component="span" pl={1} className="material-icons" color="text.primary">arrow_drop_down</Box>
				</Button>
            <Popover
               id="notifications"
               open={open}
               anchorEl={anchorEl}
               onClose={this.handleClose}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
               }}
            >
               <Fragment>
                  <List className={`${classes.root} top-dropdown-menu`}
                     component="nav"
                     aria-labelledby="nested-list-subheader"
                     subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                           <div className="dropdown-header text-center">
                              <Typography variant="body2">Languages</Typography>
                           </div>
                        </ListSubheader>
                     }
                  >
                     <Divider></Divider>
                     {languages && languages.map((item, index) => (
                        <ListItem component="div" className="top-dropdown-menu--item" key={index} onClick={() => this.onChangeLanguage(item)}>
									<img alt="translate-icon" width="45" height="25" src={require(`assets/Images/flags/${item.icon}`)} />
                           <Box px={2}>{item.name}</Box>
                        </ListItem>
                     ))}  
                  </List>
               </Fragment>
            </Popover>
         </div>
      );
   }   
}

// map state to props
const mapStateToProps = ({ settings }) => {
   return settings
};

export default withRouter(connect(mapStateToProps, {
   setLanguage,
   rtlAction
})(withStyles(styles)(LanguageProvider)));