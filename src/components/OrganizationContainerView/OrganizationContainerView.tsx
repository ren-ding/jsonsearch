import React, { Component } from 'react';
import OrganizationContainer from '../../model/OrganizationContainer';
import ItemView from '../ItemView';

export interface OrganizationContainerViewProps {
    organizationContainer: OrganizationContainer
}

export default class OrganizationContainerView extends Component<OrganizationContainerViewProps> {
    constructor(props:OrganizationContainerViewProps) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <h2>Organization:</h2>
            <ItemView
              itemObject = {this.props.organizationContainer.organization}
            />
          <h2>Users:</h2>
            {this.props.organizationContainer.users.map(user => (
              <ItemView
                itemObject = {user}
              />
            ))}
          <h2>Tickets:</h2>
            {this.props.organizationContainer.tickets.map(ticket => (
              <ItemView
                itemObject = {ticket}
              />
            ))}
        </div>
      );
    }
}