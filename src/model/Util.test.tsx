import {indexedByField} from './Util';

describe('PreProcess', () => {
    let organizations: Array<Object>;
    let users: Array<Object>;
    let tickets: Array<Object>;

    beforeEach(() => {
        organizations = [
            {
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
            {
              "_id": 102,
              "url": "http://initech.zendesk.com/api/v2/organizations/102.json",
              "external_id": "7cd6b8d4-2999-4ff2-8cfd-44d05b449226",
              "name": "Nutralab",
              "domain_names": [
                "trollery.com",
                "datagen.com",
                "bluegrain.com",
                "dadabase.com"
              ],
              "created_at": "2016-04-07T08:21:44 -10:00",
              "details": "Non profit",
              "shared_tickets": false,
              "tags": [
                "Cherry",
                "Collier",
                "Fuentes",
                "Trevino"
              ]
            }
        ];

        users = [
            {
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
              "organization_id": 1,
              "tags": [
                "Springville",
                "Sutton",
                "Hartsville/Hartley",
                "Diaperville"
              ],
              "suspended": true,
              "role": "admin"
            },
            {
              "_id": 2,
              "url": "http://initech.zendesk.com/api/v2/users/2.json",
              "external_id": "c9995ea4-ff72-46e0-ab77-dfe0ae1ef6c2",
              "name": "Cross Barlow",
              "alias": "Miss Joni",
              "created_at": "2016-06-23T10:31:39 -10:00",
              "active": true,
              "verified": true,
              "shared": false,
              "locale": "zh-CN",
              "timezone": "Armenia",
              "last_login_at": "2012-04-12T04:03:28 -10:00",
              "email": "jonibarlow@flotonic.com",
              "phone": "9575-552-585",
              "signature": "Don't Worry Be Happy!",
              "organization_id": 1,
              "tags": [
                "Foxworth",
                "Woodlands",
                "Herlong",
                "Henrietta"
              ],
              "suspended": false,
              "role": "admin"
            },
            {
                "_id": 3,
                "url": "http://initech.zendesk.com/api/v2/users/3.json",
                "external_id": "85c599c1-ebab-474d-a4e6-32f1c06e8730",
                "name": "Ingrid Wagner",
                "alias": "Miss Buck",
                "created_at": "2016-07-28T05:29:25 -10:00",
                "active": false,
                "verified": false,
                "shared": false,
                "locale": "en-AU",
                "timezone": "Trinidad and Tobago",
                "last_login_at": "2013-02-07T05:53:38 -11:00",
                "email": "buckwagner@flotonic.com",
                "phone": "9365-482-943",
                "signature": "Don't Worry Be Happy!",
                "organization_id": 2,
                "tags": [
                  "Mulino",
                  "Kenwood",
                  "Wescosville",
                  "Loyalhanna"
                ],
                "suspended": false,
                "role": "end-user"
              }
        ];

        tickets = [
            {
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
                "assignee_id": 2,
                "organization_id": 1,
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
              {
                "_id": "1a227508-9f39-427c-8f57-1b72f3fab87c",
                "url": "http://initech.zendesk.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json",
                "external_id": "3e5ca820-cd1f-4a02-a18f-11b18e7bb49a",
                "created_at": "2016-04-14T08:32:31 -10:00",
                "type": "incident",
                "subject": "A Catastrophe in Micronesia",
                "description": "Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.",
                "priority": "low",
                "status": "hold",
                "submitter_id": 2,
                "assignee_id": 3,
                "organization_id": 2,
                "tags": [
                  "Puerto Rico",
                  "Idaho",
                  "Oklahoma",
                  "Louisiana"
                ],
                "has_incidents": false,
                "due_at": "2016-08-15T05:37:32 -10:00",
                "via": "chat"
              }
        ];

    });

    describe('indexedByFields: index by its single uid', ()=>{
      it('should index content by its unique field', ()=> {
        const indexedOrganizationsById = indexedByField(organizations,"_id");
        expect(indexedOrganizationsById).toEqual({
          '101': [organizations[0]],
          '102': [organizations[1]],
        });

        const indexedUsersById = indexedByField(users, "_id");
        expect(indexedUsersById).toEqual({
          '1': [users[0]],
          '2': [users[1]],
          '3': [users[2]]
        });

        const indexedTicketsById = indexedByField(tickets,"_id");
        expect(indexedTicketsById).toEqual({
          '436bf9b0-1147-4c0a-8439-6f79833bff5b': [tickets[0]],
          '1a227508-9f39-427c-8f57-1b72f3fab87c': [tickets[1]]
        });
      });
    });
});