import React, { Component } from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
let colors = ['orange', 'red', 'blue', 'purple'];
class SearchTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: []
    }
  }


  onChange = (event) => {
    this.setState({
      value: [...event.target.value]
    });
  }

  render() {
    return (
      <div className="example-wrapper">
        <div>
          <div>Favorite sports:</div>
          <MultiSelect
            data={colors}
            onChange={this.onChange}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }

}
export default SearchTable;

