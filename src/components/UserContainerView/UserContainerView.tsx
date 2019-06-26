import React, { Component } from 'react';
import UserContainer from '../../model/UserContainer';
import ItemView from '../ItemView';

export interface UserContainerViewProps {
    userContainerList: Array<UserContainer>
}

export default class UserContainerView extends Component<UserContainerViewProps> {
    renderList = () => this.props.userContainerList.map((userContainer: UserContainer, index:number) =>
      (
        <div key={index}>
          <h2>User:</h2>
            <ItemView
              itemObject ={userContainer.user}
            />
          <h2>Organization:</h2>
            <ItemView
              itemObject ={userContainer.organization || {}}
            />
          <h2>SubmitTickets:</h2>
            {userContainer.submitTickets.map(ticket => (
              <ItemView
                itemObject ={ticket}
              />
            ))}
          <h2>AssignedTickets:</h2>
            {userContainer.assignedTickets.map(ticket => (
              <ItemView
                itemObject ={ticket}
              />
            ))}
        </div>
      )
    );
  
    render() {
      return <div>{this.renderList()}</div>;
    }
}