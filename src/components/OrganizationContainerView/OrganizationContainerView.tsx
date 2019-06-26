import React, { Component } from 'react';
import OrganizationContainer from '../../model/OrganizationContainer';
import ItemView from '../ItemView';

export interface OrganizationContainerViewProps {
    organizationContainerList: Array<OrganizationContainer>
}

export default class OrganizationContainerView extends Component<OrganizationContainerViewProps> {
    renderList = () => this.props.organizationContainerList.map((organizationContainer:OrganizationContainer, index:number) => 
      (
        <div key={index}>
          <h2>Organization:</h2>
            <ItemView
              itemObject = {organizationContainer.organization}
            />
          <h2>Users:</h2>
            {organizationContainer.users.map(user => (
              <ItemView
                itemObject = {user}
              />
            ))}
          <h2>Tickets:</h2>
            {organizationContainer.tickets.map(ticket => (
              <ItemView
                itemObject = {ticket}
              />
            ))}
        </div>
      )
    );

    render() {
      return <div>{this.renderList()}</div>;
    }
}