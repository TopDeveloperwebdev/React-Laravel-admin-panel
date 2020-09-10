/**
 * Ag Grid Table
*/
import React, { Component } from 'react';
import { Box, Container } from '@material-ui/core';

// Component
import { SmallTitleBar, CustomCard } from 'components/GlobalComponents';
import TaskList from 'components/Widgets/TaskList';

import IntlMessages from 'util/IntlMessages';
class Medication extends Component {
   render() {
      return (
         <div className="tables-wrapper">
				<SmallTitleBar
               title={<IntlMessages id="sidebar.medication" />}
					center
				/>
				<Container maxWidth="lg">
					<Box px={{ xs: '12px', lg: 0 }} className="page-space">
                  <CustomCard title={<IntlMessages id="sidebar.medication" />}>
							<Box pt={3}>
								<TaskList></TaskList>
							</Box>
						</CustomCard>
					</Box>
            </Container>
         </div>
      )
   }
}
export default Medication;