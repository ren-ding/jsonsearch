import React, { Component } from 'react';
import ZendeskSearch, {ZendeskSearchInterface} from '../../api/ZendeskSearch';
import OrganizationContainer from '../../model/OrganizationContainer';
import UserContainer from '../../model/UserContainer';
import TicketContainer from '../../model/TicketContainer';

interface SearchPagePropsInterface {
}

interface SearchPageStateInterface {
    zendeskSearch: ZendeskSearch
    searchResults: Array<OrganizationContainer|UserContainer|TicketContainer>
    searchTable: SearchTable
    searchableFields: Array<string>
    searchValue: string
}

export enum SearchTable {
    Organizations,
    Users,
    Tickets
}

/// <summary>
/// This is a root component, also a container component using for searching data
/// The component contains: a header component, a filter component, a result display component and a search button component
/// </summary>
export default class SearchPage extends Component<SearchPagePropsInterface,SearchPageStateInterface>
                                implements ZendeskSearchInterface {
    constructor(props:SearchPagePropsInterface) {
        super(props);
        this.state = {
          zendeskSearch: new ZendeskSearch(),
          searchResults:[],
          searchTable: SearchTable.Organizations,
          searchableFields: [],
          searchValue: ""
        };
    }

    render() {
        //TODO: add filter component and result display component
        return (
        <div>
            <ZendeskSearchHeader/>
            
            <button type="button" className='search-button' onClick={this.onSearchButtonClick}>Search</button>
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
        if(this.state.searchTable === null || this.state.searchableFields.length === 0) return;
        switch(this.state.searchTable){
            case SearchTable.Organizations:
                this.setState({
                    searchResults: this.searchOrganizationWithRelatedInfo(this.state.searchableFields, this.state.searchValue)
                });
                break;
            case SearchTable.Users:
                this.setState({
                    searchResults: this.searchUserWithRelatedInfo(this.state.searchableFields, this.state.searchValue)
                });
                break;
            case SearchTable.Tickets:
                this.setState({
                    searchResults: this.searchTicketWithRelatedInfo(this.state.searchableFields, this.state.searchValue)
                });
                break;
            default:
                return;
        }
    }
}

const ZendeskSearchHeader = () => (
    <div className='zendesk-search-header'>Zendesk Search</div>
);
