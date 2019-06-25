import React from 'react';
import OrganizationContainerView, {OrganizationContainerViewProps} from '../OrganizationContainerView';
import renderer from 'react-test-renderer';

describe('OrganizationContainerView', () => {
    let props:OrganizationContainerViewProps;
    beforeEach(()=> {
        props = { 
            organizationContainer: {
                organization: {
                    "_id": 101,
                    "url": "http://initech.zendesk.com/api/v2/organizations/101.json",
                    "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
                    "name": "Enthaze",
                    "domain_names": [
                    "kage.com",
                    "ecratic.com",
                    "endipin.com",
                    "zentix.com"
                    ],
                    "created_at": "2016-05-21T11:10:28 -10:00",
                    "details": "MegaCorp",
                    "shared_tickets": false,
                    "tags": [
                    "Fulton",
                    "West",
                    "Rodriguez",
                    "Farley"
                    ]
                },
                users: [],
                tickets: []
            }
          }
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<OrganizationContainerView {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});