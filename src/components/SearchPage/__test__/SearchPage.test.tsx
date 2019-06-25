import React from 'react';
import SearchPage, {SearchTable} from '../SearchPage';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ZendeskSearch from '../../../api/ZendeskSearch';
import OrganizationContainer from '../../../model/OrganizationContainer';
import {fakeDatabase} from '../../../api/fakeDatabase';
import UserContainer from '../../../model/UserContainer';
import TicketContainer from '../../../model/TicketContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchPage', () => {
    let searchPage: () => ShallowWrapper;
    beforeEach(()=>{
      searchPage = () => shallow(<SearchPage/>);
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<SearchPage />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    
    describe('search organization `Enthaze` by name from organizations',()=> {
      it('should find the matched organization and related users and tickets', ()=> {
        const wrapper = searchPage();
        wrapper.setState({ 
          zendeskSearch: new ZendeskSearch(),
          searchResults:[],
          searchTable: SearchTable.Organizations,
          searchableFields: ["name"],
          searchValue: "Enthaze"
        });

        wrapper.find('.search-button').simulate('Click');
        const results: Array<OrganizationContainer> = wrapper.state('searchResults');
        expect(results.length).toBe(1);

        expect(results[0].organization).toEqual(fakeDatabase.organizations[0]);
        const enthazeUsersId = [5, 23, 27, 29];
        const enthazeTicketsId = [
            'b07a8c20-2ee5-493b-9ebf-f6321b95966e',
            'c22aaced-7faa-4b5c-99e5-1a209500ff16',
            '89255552-e9a2-433b-970a-af194b3a39dd',
            '27c447d9-cfda-4415-9a72-d5aa12942cf1'
        ];

        const resultUserId = results[0].users.map(user => user._id);
        const resultTicketsId = results[0].tickets.map(ticket => ticket._id);
        expect(resultUserId).toEqual(enthazeUsersId);
        expect(resultTicketsId).toEqual(enthazeTicketsId);
      });
    });

    describe('search user `Francisca Rasmussen` by name from users',()=> {
      it('should find the matched user and related her organization, submitted and assigned tickets', ()=> {
        const wrapper = searchPage();
        wrapper.setState({ 
          zendeskSearch: new ZendeskSearch(),
          searchResults:[],
          searchTable: SearchTable.Users,
          searchableFields: ["name"],
          searchValue: "Francisca Rasmussen"
        });

        wrapper.find('.search-button').simulate('Click');
        const results: Array<UserContainer> = wrapper.state('searchResults');
        expect(results.length).toBe(1);

        expect(results[0].user).toEqual(fakeDatabase.users[0]);
        expect(results[0].organization).toEqual(fakeDatabase.organizations[18]);
        const submitTicketsId = [
            'fc5a8a70-3814-4b17-a6e9-583936fca909',
            'cb304286-7064-4509-813e-edc36d57623d'
        ];
        expect(results[0].submitTickets.map(ticket=> ticket._id)).toEqual(submitTicketsId);
        const assignedTicketsId = [
            '1fafaa2a-a1e9-4158-aeb4-f17e64615300',
            '13aafde0-81db-47fd-b1a2-94b0015803df'
        ];
        expect(results[0].assignedTickets.map(ticket=> ticket._id)).toEqual(assignedTicketsId);
      });
    });

    describe('search tickets who have `Ohio` tag',()=> {
      it('should find all matched tickets and their organizations, submitter and assignee', ()=> {
        const wrapper = searchPage();
        wrapper.setState({ 
          zendeskSearch: new ZendeskSearch(),
          searchResults:[],
          searchTable: SearchTable.Tickets,
          searchableFields: ["tags"],
          searchValue: "Ohio"
        });

        wrapper.find('.search-button').simulate('Click');
        const results: Array<TicketContainer> = wrapper.state('searchResults');
        expect(results.length).toBe(14);

        expect(results[0].submitter._id).toEqual(fakeDatabase.users[37]._id);
        expect(results[0].assignee._id).toEqual(fakeDatabase.users[23]._id);
        expect(results[0].organization._id).toEqual(fakeDatabase.organizations[15]._id);
      });
    });  
});