import Ticket from './Ticket';
import User from './User';
import Organization from './Organization';

export default interface TicketContainer {
    ticket: Ticket;
    submitter: User;
    assignee: User;
    organization: Organization;
}