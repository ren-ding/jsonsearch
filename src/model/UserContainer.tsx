import User from './User';
import Organization from './Organization';
import Ticket from './Ticket';

export default interface UserContainer {
    user: User;
    organization?: Organization;
    submitTickets: Array<Ticket>;
    assignedTickets: Array<Ticket>;
}