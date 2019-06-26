import {fakeDatabase} from './fakeDatabase';
import Search from '../model/Search';
import Organization from '../model/Organization';
import User from '../model/User';
import Ticket from '../model/Ticket';
import OrganizationContainer from '../model/OrganizationContainer';
import UserContainer from '../model/UserContainer';
import TicketContainer from '../model/TicketContainer';
import {indexedByField} from '../model/Util';

interface DBInterface {
    organizations: Array<Organization>,
    users: Array<User>,
    tickets: Array<Ticket>,
    indexedOrganizationsById: any,
    indexedUsersById: any,
    indexedUsersByOrganizationId: any,
    indexedTicketsBySubmitterId: any,
    indexedTicketsByAssigneeId: any,
    indexedTicketsByOrganizationId: any,
}

export interface ZendeskSearchInterface {
    searchOrganizationWithRelatedInfo: (searchableFields:Array<string>, searchValue: string) => Array<OrganizationContainer> 
    searchUserWithRelatedInfo: (searchableFields:Array<string>, searchValue: string) => Array<UserContainer> 
    searchTicketWithRelatedInfo: (searchableFields:Array<string>, searchValue: string) => Array<TicketContainer> 
}

export default class ZendeskSearch implements ZendeskSearchInterface {
    _db: DBInterface;
    _organizationsSearch: Search<Organization>;
    _usersSearch: Search<User>;
    _ticketsSearch: Search<Ticket>;

    constructor(){
        this._db = {
            ...fakeDatabase,
            indexedOrganizationsById: this.indexedOrganizationsById(),
            indexedUsersById: this.indexedUsersById(),
            indexedUsersByOrganizationId: this.indexedUsersByOrganizationId(),
            indexedTicketsBySubmitterId: this.indexedTicketsBySubmitterId(),
            indexedTicketsByAssigneeId: this.indexedTicketsByAssigneeId(),
            indexedTicketsByOrganizationId: this.indexedTicketsByOrganizationId(),
        };

        this._organizationsSearch = new Search();
        this._organizationsSearch.addSearchContent(fakeDatabase.organizations);

        this._usersSearch = new Search();
        this._usersSearch.addSearchContent(fakeDatabase.users);

        this._ticketsSearch = new Search();
        this._ticketsSearch.addSearchContent(fakeDatabase.tickets);
    }

    searchOrganizationWithRelatedInfo(searchableFields:Array<string>, searchValue: string): Array<OrganizationContainer> {
        const organizations = this.searchFromOrganizations(searchableFields, searchValue);
        return organizations.map((organization: Organization) => ({
            'organization': organization,
            'users':this._db.indexedUsersByOrganizationId[organization._id] || [],
            'tickets': this._db.indexedTicketsByOrganizationId[organization._id] || []
        }));
    }

    searchUserWithRelatedInfo(searchableFields:Array<string>, searchValue: string): Array<UserContainer> {
        const users = this.searchFromUsers(searchableFields, searchValue);
        return users.map((user: User) => ({
            'user': user,
            'organization': (user.organization_id == null || this._db.indexedOrganizationsById[user.organization_id] == null) 
                            ? null 
                            : this._db.indexedOrganizationsById[user.organization_id][0],
            'submitTickets': this._db.indexedTicketsBySubmitterId[user._id] || [],
            'assignedTickets': this._db.indexedTicketsByAssigneeId[user._id] || []
        }));
    }

    searchTicketWithRelatedInfo(searchableFields:Array<string>, searchValue: string): Array<TicketContainer> {
        const tickets = this.searchFromTickets(searchableFields, searchValue);
        return tickets.map((ticket: Ticket) => ({
            'ticket': ticket,
            'submitter': (ticket.submitter_id == null || this._db.indexedUsersById[ticket.submitter_id] == null)
                            ? null
                            : this._db.indexedUsersById[ticket.submitter_id][0],
            'assignee': (ticket.assignee_id == null || this._db.indexedUsersById[ticket.assignee_id] == null) 
                            ? null 
                            : this._db.indexedUsersById[ticket.assignee_id][0],
            'organization': (ticket.organization_id == null || this._db.indexedOrganizationsById[ticket.organization_id] == null) 
                            ? null 
                            : this._db.indexedOrganizationsById[ticket.organization_id][0]
        }));
    }

    searchFromOrganizations(searchableFields:Array<string>, searchValue: string) : Array<Organization> {
        return this.search(this._organizationsSearch, searchableFields, searchValue);
    }

    searchFromUsers(searchableFields:Array<string>, searchValue: string) : Array<User> {
        return this.search(this._usersSearch, searchableFields, searchValue);
    }

    searchFromTickets(searchableFields:Array<string>, searchValue: string) : Array<Ticket> {
        return this.search(this._ticketsSearch, searchableFields, searchValue);
    }

    private search<T>(search:Search<T>, searchableFields:Array<string>, searchValue: string) : Array<T> {
        if(search == null) return [];
        
        if(!this.stringArraysEqual(search.searchableFields, searchableFields)) {
            search.searchableFields = searchableFields;
        }

        return search.search(searchValue);
    }

    private stringArraysEqual(a1: Array<string>,a2:Array<string>) {
        /* WARNING: arrays must not contain {objects} or behavior may be undefined */
        return JSON.stringify(a1)===JSON.stringify(a2);
    }

    private indexedOrganizationsById() {
        return indexedByField(fakeDatabase.organizations, "_id");
    };

    private indexedUsersById() {
        return indexedByField(fakeDatabase.users, "_id");
    };

    private indexedUsersByOrganizationId() {
        return indexedByField(fakeDatabase.users, "organization_id");
    };

    private indexedTicketsBySubmitterId() {
        return indexedByField(fakeDatabase.tickets, "submitter_id");
    };

    private indexedTicketsByAssigneeId(){
        return indexedByField(fakeDatabase.tickets, "assignee_id");
    };

    private indexedTicketsByOrganizationId(){
        return indexedByField(fakeDatabase.tickets, "organization_id");
    };

}