import React from 'react';
import TicketContainerView, {TicketContainerViewProps} from '../TicketContainerView';
import renderer from 'react-test-renderer';

describe('TicketContainerView', () => {
    let props:TicketContainerViewProps;
    beforeEach(()=> {
        props = {
            ticketContainer: {
                ticket: {
                    "_id": "436bf9b0-1147-4c0a-8439-6f79833bff5b",
                    "url": "http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json",
                    "external_id": "9210cdc9-4bee-485f-a078-35396cd74063",
                    "created_at": "2016-04-28T11:19:34 -10:00",
                    "type": "incident",
                    "subject": "A Catastrophe in Korea (North)",
                    "description": "Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.",
                    "priority": "high",
                    "status": "pending",
                    "submitter_id": 1,
                    "tags": [
                      "Ohio",
                      "Pennsylvania",
                      "American Samoa",
                      "Northern Mariana Islands"
                    ],
                    "has_incidents": false,
                    "due_at": "2016-07-31T02:37:50 -10:00",
                    "via": "web"
                  },
                submitter: {
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
                assignee: undefined,
                organization: undefined,
            }
        }
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<TicketContainerView {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});