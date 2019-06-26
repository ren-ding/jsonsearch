import React, { Component } from 'react';
import TicketContainer from '../../model/TicketContainer';
import ItemView from '../ItemView';

export interface TicketContainerViewProps {
    ticketContainerList: Array<TicketContainer>
}

export default class TicketContainerView extends Component<TicketContainerViewProps> {
    renderList = () => this.props.ticketContainerList.map((ticketContainer: TicketContainer, index:number) => 
      (
        <div key={index}>
          <h2>Ticket:</h2>
            <ItemView
              itemObject = {ticketContainer.ticket}
            />
          <h2>Submitter:</h2>
            <ItemView
              itemObject = {ticketContainer.submitter || {}}
            />
          <h2>Assignee:</h2>
            <ItemView
              itemObject = {ticketContainer.assignee || {}}
            />
          <h2>Organization:</h2>
            <ItemView
              itemObject = {ticketContainer.organization || {}}
            />
        </div>
      )
    );

    render() {
      return <div>{this.renderList()}</div>;
    }
}