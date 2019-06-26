import React from 'react';
import UserContainerView, {UserContainerViewProps} from '../UserContainerView';
import renderer from 'react-test-renderer';

describe('UserContainerView', () => {
    let props:UserContainerViewProps;
    beforeEach(()=> {
        props = {
            userContainerList: [{
                user: {
                    "_id": 1,
                    "url": "http://initech.zendesk.com/api/v2/users/1.json",
                    "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
                    "name": "Francisca Rasmussen",
                    "alias": "Miss Coffey",
                    "created_at": "2016-04-15T05:19:46 -10:00",
                    "active": true,
                    "verified": true,
                    "shared": false,
                    "locale": "en-AU",
                    "timezone": "Sri Lanka",
                    "last_login_at": "2013-08-04T01:03:27 -10:00",
                    "email": "coffeyrasmussen@flotonic.com",
                    "phone": "8335-422-718",
                    "signature": "Don't Worry Be Happy!",
                    "organization_id": 119,
                    "tags": [
                      "Springville",
                      "Sutton",
                      "Hartsville/Hartley",
                      "Diaperville"
                    ],
                    "suspended": true,
                    "role": "admin"
                  },
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
                submitTickets: [],
                assignedTickets: []
            }]
        }
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<UserContainerView {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});