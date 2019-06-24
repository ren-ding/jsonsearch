import Organization from './Organization';
import User from './User';
import Ticket from './Ticket';

export default interface OrganizationContainer {
    organization: Organization;
    users: Array<User>;
    tickets: Array<Ticket>;
}