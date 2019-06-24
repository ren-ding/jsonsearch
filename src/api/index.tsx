// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.
import {fakeDatabase} from './fakeDatabase';
import {indexedByField} from '../model/Util';

const delay = (ms:number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchOrganizations = () =>
    delay(500).then(() => fakeDatabase.organizations);

export const fetchUsers = () =>
    delay(500).then(() => fakeDatabase.users);

export const fetchTickets = () =>
    delay(500).then(() => fakeDatabase.tickets);

export const indexedOrganizationsByUid = () => (fakeDatabase.organizations, "_id");
export const indexedUsersByUid = () => indexedByField(fakeDatabase.users, "_id");
export const indexedTicketsByUid = () => indexedByField(fakeDatabase.tickets, "_id");