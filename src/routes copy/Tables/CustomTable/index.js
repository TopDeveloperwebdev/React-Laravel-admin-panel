/**
 * Custom Table
*/
import React, { Component } from "react";
import { Container, Box } from '@material-ui/core';

// Components
import { SmallTitleBar } from 'components/GlobalComponents';
import PatientsTableWidget from "components/Widgets/PatientsTableWidget";
import IntlMessages from 'util/IntlMessages';

class CustomTable extends Component {
   render() {
      return (
         <div className="tables-wrapper">
            <SmallTitleBar title={<IntlMessages id="widgets.customTable" />} center />
				<Container maxWidth="lg">
					<Box px={{ xs:'12px', lg:0}} className="page-space">
						<PatientsTableWidget />
					</Box>
				</Container>
			</div>			  
      );
   }
}

export default CustomTable;