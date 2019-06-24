import {fakeDatabase} from './fakeDatabase';
import * as api from '../api';
import Search from '../model/Search';
import Organization from '../model/Organization';
import User from '../model/User';
import Ticket from '../model/Ticket';

export default class ZendeskSearch {
    _db: Object;
    _organizationsSearch: Search<Organization>;
    _usersSearch: Search<User>;
    _ticketsSearch: Search<Ticket>;

    constructor(){
        this._db = {
            ...fakeDatabase,
            indexedOrganizationsByUid: api.indexedOrganizationsByUid,
            indexedUsersByUid: api.indexedUsersByUid,
            indexedTicketsByUid: api.indexedTicketsByUid
        };

        this._organizationsSearch = new Search();
        this._organizationsSearch.addSearchContent(fakeDatabase.organizations);

        this._usersSearch = new Search();
        this._usersSearch.addSearchContent(fakeDatabase.users);

        this._ticketsSearch = new Search();
        this._ticketsSearch.addSearchContent(fakeDatabase.tickets);
    }

    searchFromOrganizations(searchableFields:Array<string>, searchValue: string) : Array<Object> {
        return this.search(this._organizationsSearch, searchableFields, searchValue);
    }

    searchFromUsers(searchableFields:Array<string>, searchValue: string) : Array<Object> {
        return this.search(this._usersSearch, searchableFields, searchValue);
    }

    searchFromTickets(searchableFields:Array<string>, searchValue: string) : Array<Object> {
        return this.search(this._ticketsSearch, searchableFields, searchValue);
    }

    search(search:Search<Organization|User|Ticket>, searchableFields:Array<string>, searchValue: string) : Array<Object> {
        if(search == null) return [];
        
        if(!this.stringArraysEqual(search.searchableFields, searchableFields)) {
            search.searchableFields = searchableFields;
        }

        return search.search(searchValue);
    }

    private stringArraysEqual(a1: Array<string>,a2:Array<string>) {
        /* WARNING: arrays must not contain {objects} or behavior may be undefined */
        return JSON.stringify(a1)==JSON.stringify(a2);
    }
}