import React, { Component } from 'react';

export interface ItemViewProps {
    itemObject: Object
}

export default class ItemView extends Component<ItemViewProps> {
  renderObject = () =>
        Object.entries(this.props.itemObject).map(([key, value]) => {
			return (
                <tr key={key}>
                <td>{key}</td>
                <td>{value.toString()}</td>
                </tr>
			);
		});
  
  render() {
    return (
      <div>
          <table className="ui compact table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.renderObject()}
            </tbody>
          </table>
        </div>
    );
  }
}