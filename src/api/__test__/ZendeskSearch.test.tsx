import {fakeDatabase} from '../fakeDatabase';
import ZendeskSearch from '../ZendeskSearch';

describe('ZendeskSearch', () => {
    let zendeskSearch: ZendeskSearch;

    const incidentTicketsId = [
        "436bf9b0-1147-4c0a-8439-6f79833bff5b",
        "1a227508-9f39-427c-8f57-1b72f3fab87c",
        "bb6b2b5b-d58e-4c05-99a8-0d7cf2792acb",
        "01731a8f-7c00-40ca-94a1-6b874abd1d17",
        "530bc434-9984-4a54-8a74-83433d3da340",
        "a0d5a779-dc8d-4191-9245-971ed57a8072",
        "17951590-6a78-49e8-8e45-1d4326ba49cc",
        "60d6b68c-51e9-439f-aacb-c2f36f1fa2f5",
        "1c17f9a3-9ff2-4974-ae34-01959dbf64c6",
        "cb3b726e-9ba0-4e35-b4d6-ee41c29a7185",
        "8dc38ac1-53a6-4dff-a43d-d52aa9de1d1f",
        "41fdfa9b-26c8-4d71-80ff-ad2220d0ad80",
        "c22aaced-7faa-4b5c-99e5-1a209500ff16",
        "c496e355-4400-4baa-b8ca-bb2edd270c43",
        "bc736a06-eeb0-4271-b4a8-c66f61b5df1f",
        "0ca339ca-b056-4e1a-85ef-b1113c331660",
        "4d22436c-6c26-431b-9083-35ec8e86c57d",
        "a25f90f3-2157-4585-bbee-360367a2c1e8",
        "e34262a7-df37-4715-a482-fb0acb5d0b46",
        "de70eb6b-0717-40f9-9322-75f1262cda12",
        "92e5d8f0-853a-4f56-b7fb-b0582e6b1c79",
        "c48bf827-fc45-4158-b7ce-70784509f562",
        "0f823d66-7e6e-4867-949f-1308a25ab2b0",
        "5799c5e4-2c48-4319-8c5b-88df58ebbd12",
        "1153a9d0-80b8-45f8-9753-e1c004caea7b",
        "31e7f6d7-f6cb-4781-b4e7-2f552941e1f5",
        "9fe171f6-8790-4d8c-9463-b90052ee7423",
        "4c5a405d-0805-4d8b-ac48-2a3d7f3816e4",
        "140e0cd4-c31b-4e90-833d-c42a12d4b713",
        "92c88581-f778-42bc-a828-0000afaa9588",
        "59cc8598-7f44-4b4c-a57f-e65e8ad67323",
        "27c447d9-cfda-4415-9a72-d5aa12942cf1",
        "cb7cae87-2915-44d4-bda4-4ccb59c63bd4",
        "a7b16a5c-76d9-4e60-aadc-33653b828173",
        "50f3fdbd-f8a6-481d-9bf7-572972856628"];


    const ohioTicketsId = [
        "436bf9b0-1147-4c0a-8439-6f79833bff5b",
        "6aac0369-a7e5-4417-8b50-92528ef485d3",
        "b07a8c20-2ee5-493b-9ebf-f6321b95966e",
        "b776f78f-e3ac-4139-9a8f-6f905472f44d",
        "8629d5fa-89c4-4e9b-9d9f-221b68b079f4",
        "20615fe1-765b-4ff5-b4f6-ea42dcc8cac3",
        "ed3432e1-8cb7-40a1-be6a-6f69cbc911f1",
        "8ea53283-5b36-4328-9a78-f261ee90f44b",
        "4af3bbbd-661f-4348-be25-47c6f7d36009",
        "ba4feaec-47ac-483f-bc3d-2604f797e6f0",
        "ccf4c82c-f572-4fd2-82a6-11d6055929b8",
        "92ab4d58-39fa-4a25-a1ff-c61eebaf2cdb",
        "c6c851a6-fbe6-4736-a465-6f1859a511dd",
        "a12a5f33-d4a0-4e43-8773-4b22e16fc0c8"];
        
    beforeEach(()=>{
        zendeskSearch = new ZendeskSearch();
    });

    describe('search from organizations', () => {
        it('should find matched organizations', () => {
            expect(zendeskSearch.searchFromOrganizations([], "101")).toEqual([]);
            expect(zendeskSearch.searchFromOrganizations(["name"], "")).toEqual([]);
            expect(zendeskSearch.searchFromOrganizations(["_id"], "101")).toEqual([fakeDatabase.organizations[0]]);
            expect(zendeskSearch.searchFromOrganizations(["name"], "101")).toEqual([]);
            expect(zendeskSearch.searchFromOrganizations(["name"], "Enthaze")).toEqual([fakeDatabase.organizations[0]]);
            expect(zendeskSearch.searchFromOrganizations(["_id","name"], "101")).toEqual([fakeDatabase.organizations[0]]);
            expect(zendeskSearch.searchFromOrganizations(["_id","name"], "Enthaze")).toEqual([fakeDatabase.organizations[0]]);
            expect(zendeskSearch.searchFromOrganizations(["domain_names"], "kage.com")).toEqual([fakeDatabase.organizations[0]]);
        });
    });

    describe('search from users', () => {
        it('should find matched users', () => {
            expect(zendeskSearch.searchFromUsers([], "Francisca Rasmussen")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["name"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["name"], "Francisca Rasmussen")).toEqual([fakeDatabase.users[0]]);
            expect(zendeskSearch.searchFromUsers(["alias"], "Francisca Rasmussen")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["alias"], "Miss Coffey")).toEqual([fakeDatabase.users[0]]);
            expect(zendeskSearch.searchFromUsers(["alias"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["name","alias"], "Francisca Rasmussen")).toEqual([fakeDatabase.users[0]]);
            expect(zendeskSearch.searchFromUsers(["name","alias"], "Miss Coffey")).toEqual([fakeDatabase.users[0]]);
            expect(zendeskSearch.searchFromUsers(["tags"], "Springville")).toEqual([fakeDatabase.users[0]]);

            const expectedSuspendsersId = [
                1,  4,  7,  8,  9, 13, 14, 15, 17, 18,
               20, 26, 28, 31, 33, 34, 35, 37, 38, 39,
               40, 47, 49, 51, 52, 54, 56, 61, 62, 63,
               65, 66, 69, 72, 73, 75
             ]
            const suspendUsersId = zendeskSearch.searchFromUsers(["suspended"], "true").map((user:any)=>{
                return user._id;
            });

            expect(suspendUsersId).toEqual(expectedSuspendsersId);            
        });
    });

    describe('search from tickets', () => {
        it('should find matched tickets', () => {
            expect(zendeskSearch.searchFromTickets([], "incident")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["type"], "")).toEqual([]);
            
            
            const incidentTicketsIdResults = zendeskSearch.searchFromTickets(["type"], "incident").map((ticket:any)=>{
                return ticket._id;
            });

            expect(incidentTicketsIdResults).toEqual(incidentTicketsId);


            const ohioTicketsIdResult = zendeskSearch.searchFromTickets(["tags"], "Ohio").map((ticket:any)=>{
                return ticket._id;
            });
            
            expect(ohioTicketsIdResult).toEqual(ohioTicketsId);
        });
    });

    describe('search empty string of nullable field', () => {
        it('should return empty array', () => {
            expect(zendeskSearch.searchFromUsers(["alias"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["verified"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["locale"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["timezone"], "")).toEqual([]);
            expect(zendeskSearch.searchFromUsers(["email"], "")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["type"], "")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["description"], "")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["assignee_id"], "")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["organization_id"], "")).toEqual([]);
            expect(zendeskSearch.searchFromTickets(["due_at"], "")).toEqual([]);
        });
    });


    describe('searchOrganizationWithRelatedInfo', () => {
        it('should return matched organization and related users and tickets', () => {
            const enthazeUsersId = [5, 23, 27, 29];
            const enthazeTicketsId = [
                'b07a8c20-2ee5-493b-9ebf-f6321b95966e',
                'c22aaced-7faa-4b5c-99e5-1a209500ff16',
                '89255552-e9a2-433b-970a-af194b3a39dd',
                '27c447d9-cfda-4415-9a72-d5aa12942cf1'
            ];

            const result = zendeskSearch.searchOrganizationWithRelatedInfo(["name"], "Enthaze");

            expect(result.length).toBe(1);
            expect(result[0].organization).toEqual(fakeDatabase.organizations[0]);           
            const resultUserId = result[0].users.map(user => user._id);
            const resultTicketsId = result[0].tickets.map(ticket => ticket._id);
            expect(resultUserId).toEqual(enthazeUsersId);
            expect(resultTicketsId).toEqual(enthazeTicketsId);
        });
    });

    describe('searchUserWithRelatedInfo', () => {
        it('should return matched users and related organization and tickets', () => {
            const result = zendeskSearch.searchUserWithRelatedInfo(["name"], "Francisca Rasmussen");
            expect(result.length).toBe(1);
            expect(result[0].user).toEqual(fakeDatabase.users[0]);
            expect(result[0].organization).not.toBe(null);
            if(result[0].organization != null) {
                expect(result[0].organization._id).toEqual(119);
            }
            expect(result[0].submitTickets.length).toEqual(2);
            const submitTicketsId = [
                'fc5a8a70-3814-4b17-a6e9-583936fca909',
                'cb304286-7064-4509-813e-edc36d57623d'
            ];
            expect(result[0].submitTickets.map(ticket=> ticket._id)).toEqual(submitTicketsId);
            const assignedTicketsId = [
                '1fafaa2a-a1e9-4158-aeb4-f17e64615300',
                '13aafde0-81db-47fd-b1a2-94b0015803df'
            ];
            expect(result[0].assignedTickets.map(ticket=> ticket._id)).toEqual(assignedTicketsId);
        });
    });

    describe('searchTicketWithRelatedInfo', () => {
        it('should return matched tickets and related organization and users', () => {
            const result = zendeskSearch.searchTicketWithRelatedInfo(["tags"], "Ohio");
            expect(result.length).toEqual(ohioTicketsId.length);
            expect(result[0].submitter).not.toBe(null);
            if(result[0].submitter != null) expect(result[0].submitter._id).toEqual(fakeDatabase.users[37]._id);
            expect(result[0].assignee).not.toBe(null);
            if(result[0].assignee != null) expect(result[0].assignee._id).toEqual(fakeDatabase.users[23]._id);
            expect(result[0].organization).not.toBe(null);
            if(result[0].organization != null) expect(result[0].organization._id).toEqual(fakeDatabase.organizations[15]._id);
        });
    });

});