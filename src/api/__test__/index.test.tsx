import {fakeDatabase} from '../fakeDatabase';
import * as fromApi from '../../api';

describe('api', () => {
    describe('send request to fetch organizations', () => {
        it('should return a list of organizations', () => {

            fromApi.fetchOrganizations().then(
                response => {
                    expect(response.length).toEqual(fakeDatabase.organizations.length);
                    response.forEach(o => expect(fakeDatabase.organizations.includes(o)).toBe(true));
                }
            );
        });
    });

    describe('send request to fetch users', () => {
        it('should return a list of users', () => {

            fromApi.fetchUsers().then(
                response => {
                    expect(response.length).toEqual(fakeDatabase.users.length);
                    response.forEach(u => expect(fakeDatabase.users.includes(u)).toBe(true));
                }
            );
        });
    });

    describe('send request to fetch tickets', () => {
        it('should return a list of tickets', () => {

            fromApi.fetchTickets().then(
                response => {
                    expect(response.length).toEqual(fakeDatabase.tickets.length);
                    response.forEach(t => expect(fakeDatabase.tickets.includes(t)).toBe(true));
                }
            );
        });
    });
});