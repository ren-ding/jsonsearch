import React, { Component } from 'react';
import ZendeskSearch, {ZendeskSearchInterface} from '../../api/ZendeskSearch';
import OrganizationContainer from '../../model/OrganizationContainer';
import UserContainer from '../../model/UserContainer';
import TicketContainer from '../../model/TicketContainer';
import SearchFilter from '../SearchFilter';
import {Option} from 'react-dropdown';
import './style/search-page.css';

interface SearchPagePropsInterface {
}

interface SearchPageStatesInterface {
    zendeskSearch: ZendeskSearch,
    searchResults: Array<OrganizationContainer|UserContainer|TicketContainer>,
    selectedSearchTable: SearchTable,
    searchableFields: string,
    searchValue: string
}

export enum SearchTable {
    Organizations,
    Users,
    Tickets
}

/// <summary>
/// SearchPage component is a container component using for searching data
/// The component contains: a header component, a filter component, a result display component and a search button
/// </summary>
export default class SearchPage extends Component<SearchPagePropsInterface, SearchPageStatesInterface>
                                implements ZendeskSearchInterface {
    constructor(props:SearchPagePropsInterface) {
        super(props);
        this.state = {
          zendeskSearch: new ZendeskSearch(),
          searchResults:[],
          selectedSearchTable: SearchTable.Organizations,
          searchableFields: "",
          searchValue: ""
        };
    }

    render() {
        const ddlSearchTableOptions = [
            {value: SearchTable.Organizations.toString(), label:'Organizations'},
            {value: SearchTable.Users.toString(), label:'Users'},
            {value: SearchTable.Tickets.toString(), label:'Tickets'}
        ];

        return (
        <div className='search-page-wrapper'>
            <ZendeskSearchHeader/>
            <SearchFilter
             searchTableDropdownList = { ddlSearchTableOptions }
             onChange = {this.onSearchTableDropdownListChange}
             selectedSearchTable = {this.state.selectedSearchTable}
             onSearchableFieldsChange = {this.onSearchableFieldsChange}
             onSearchValueChange = {this.onSearchValueChange}
            />
            <button type="button" className='ui blue button search-button' onClick={this.onSearchButtonClick}>Search</button>
        </div>);
    }

    searchOrganizationWithRelatedInfo(searchableFields:Array<string>, searchValue: string) {
        return this.state.zendeskSearch.searchOrganizationWithRelatedInfo(searchableFields, searchValue);
    } 

    searchUserWithRelatedInfo(searchableFields:Array<string>, searchValue: string) {
        return this.state.zendeskSearch.searchUserWithRelatedInfo(searchableFields, searchValue);;
    }

    searchTicketWithRelatedInfo(searchableFields:Array<string>, searchValue: string) {
        return this.state.zendeskSearch.searchTicketWithRelatedInfo(searchableFields, searchValue);;
    }

    onSearchButtonClick = () => {
        const searchableFieldsArray = this.state.searchableFields.split(',');

        if(this.state.selectedSearchTable === null || searchableFieldsArray.length === 0) return;
        switch(this.state.selectedSearchTable){
            case SearchTable.Organizations:
                this.setState({
                    searchResults: this.searchOrganizationWithRelatedInfo(searchableFieldsArray, this.state.searchValue)
                });
                break;
            case SearchTable.Users:
                this.setState({
                    searchResults: this.searchUserWithRelatedInfo(searchableFieldsArray, this.state.searchValue)
                });
                break;
            case SearchTable.Tickets:
                this.setState({
                    searchResults: this.searchTicketWithRelatedInfo(searchableFieldsArray, this.state.searchValue)
                });
                break;
            default:
                return;
        }
    }

    onSearchTableDropdownListChange = (option:Option) => {
        this.setState({
            selectedSearchTable: parseInt(option.value)
        })
    }

    onSearchableFieldsChange = (event: {target: { value: string }}) => {
        this.setState({
            searchableFields:event.target.value
        });
    }

    onSearchValueChange = (event: {target: { value: string }}) => {
        this.setState({
            searchValue:event.target.value
        });
    }

}

const ZendeskSearchHeader = () => {
    //unfortunitely, keys of interface in typescript still not supported
    //https://github.com/Microsoft/TypeScript/issues/13267
    const keysOfOrganization = [
        '_id','url','external_id','name','domain_names',
        'created_at','details','shared_tickets','tags'
    ];

    const keysOfUser = [
        '_id','url','external_id','name','alias','created_at','active','verified',
        'shared','locale','timezone','last_login_at','email','phone','signature',
        'organization_id','tags','suspended','role'
    ];
    
    const keysOfTicket = [
            '_id','url','external_id','created_at','type','subject','description',
            'priority','status','submitter_id','assignee_id','organization_id',
            'tags','has_incidents','due_at','via'
    ];
    
    return (
    <div className='zendesk-search-header'>
        <h1 className="ui center aligned header">Zendesk Search</h1>
        <h2 className="ui header">
            <i className="search icon"></i>
            <div className="content">Searchable Fields</div>
        </h2>
        <table className="ui celled striped table">
            <thead>
                <tr>
                    <th colSpan={2}>
                        Searchable Fields
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>User Fields</td>
                    <td>{keysOfUser.join(',')}</td>
                </tr>
                <tr>
                    <td>Organization Fields</td>
                    <td>{keysOfOrganization.join(',')}</td>
                </tr>
                <tr>
                    <td>Ticket Fields</td>
                    <td>{keysOfTicket.join(',')}</td>
                </tr>
            </tbody>
        </table>
    </div>);
};
