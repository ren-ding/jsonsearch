import React, { Component } from 'react';
import TicketContainer from '../../model/TicketContainer';
import ItemView from '../ItemView';

export interface TicketContainerViewProps {
    ticketContainer: TicketContainer
}

export default class TicketContainerView extends Component<TicketContainerViewProps> {
    constructor(props:TicketContainerViewProps) {
      super(props);
    }
  
    render() {
      const displayAssignee = (this.props.ticketContainer.assignee != null);
      const displayOrganization = (this.props.ticketContainer.organization != null);
      
      return (
        <div>
          <h2>Ticket:</h2>
            <ItemView
              itemObject = {this.props.ticketContainer.ticket}
            />
          <h2>Submitter:</h2>
            <ItemView
              itemObject = {this.props.ticketContainer.submitter}
            />
          <h2>Assignee:</h2>
            <ItemView
              itemObject = {this.props.ticketContainer.assignee || {}}
            />
          <h2>Organization:</h2>
            <ItemView
              itemObject = {this.props.ticketContainer.organization || {}}
            />
        </div>
      );
    }
}