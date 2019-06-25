import React, { Component } from 'react';
import UserContainer from '../../model/UserContainer';
import ItemView from '../ItemView';

export interface UserContainerViewProps {
    userContainer: UserContainer
}

export default class UserContainerView extends Component<UserContainerViewProps> {
    constructor(props:UserContainerViewProps) {
      super(props);
    }
  
    render() {
      const displayOrganization = (this.props.userContainer.organization != null);

      return (
        <div>
          <h2>User:</h2>
            <ItemView
              itemObject ={this.props.userContainer.user}
            />
          <h2>Organization:</h2>
            <ItemView
              itemObject ={this.props.userContainer.organization || {}}
            />
          <h2>SubmitTickets:</h2>
            {this.props.userContainer.submitTickets.map(ticket => (
              <ItemView
                itemObject ={ticket}
              />
            ))}
          <h2>AssignedTickets:</h2>
            {this.props.userContainer.assignedTickets.map(ticket => (
              <ItemView
                itemObject ={ticket}
              />
            ))}
        </div>
      );
      
    }
}