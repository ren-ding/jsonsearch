Zendesk Search
===================

Description
-----------
- This is a React single page application created by create-react-app --typescript

- The application is using for searching given organizations, users and tickets

## Installation Instruction

### `npm install`
Install node_modules

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Excution

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### `npm test`
Launches the test runner in the interactive watch mode.<br>


## Project folder structure

| First Level   | Second level        |  Description                                                            |
| ------------- | ------------------- | ------------------------------------------------------------------------|
| public        | index.html          |  html view                                                              |
| src           | model               |  business domain, core search class and functions                       |
|               | api                 |  backend controller handling user input and calling searching functions |
|               | components          |  frontend React components                                              |
|               | index.tsx           |  ReactDom render root component                                         |


| Second level        |  Files/Folder             | Description                                                                                     |
| ------------------- | --------------------------|-------------------------------------------------------------------------------------------------|
| api                 | fakedatabase.tsx          | simulate a fake db contains all raw json data                                                   |
|                     | ZendeskSearch.tsx         | controller class contains a fake db instance, pre-indexed data, and search function call        |
| components          | SearchPage                | root container component include search header, filter, button and display components           |
|                     | SearchFilter              | stateless component include table selection dropdownlist, searchable fields and value input box |
|                     | OrganizationContainerView | presentation component show organization search results: organization, related users and tickets|
|                     | UserContainerView         | presentation component show user search results: users, related organizations and tickets       |
|                     | TicketContainerView       | presentation component show ticket search results: ticket, submitter, assignee and organization |
|                     | ItemView                  | presentation component show property and value in a table for given object                      |
| model               | Search.tsx                | util class for indexing content by input searchable fields, support nested array.               |
|                     | Util.tsx                  | contains utility functions like indexedByField                                                  |
|                     | Organization.tsx          | interface matching to organizations.json array element schema                                   |
|                     | User.tsx                  | interface matching to users.json array element schema                                           |
|                     | Ticket.tsx                | interface matching to tickets.json array element schema                                         |
|                     | OrganizationContainer.tsx | view model for displaying organization                                                          |
|                     | UserContainer.tsx         | view model for displaying user                                                                  |
|                     | TicketContainer.tsx       | view model for displaying ticket                                                                | 


### note
Each folder has a __test__ folder contains unit test.<br>
model/Search.tsx is reusable and extensible, can be used in either a console application or like this React app.<br>


## Project assumptions

  - Assume all data can fit into a single machine memory
  - User usually search in same table and same fields multiple times then change another table or fields

### assumptions explaination
  - the app has pre-processing data stage, which is indexing each table by its primary key and foreign key for related search result joining.
    It also indexes by user input searchable fields, so that search time complexity is hashtable search O(1). However, if json files are too
    big, they will take a lot of memory.
  - Each time user input searchable fields and start to search, it only indexes once if the user not change these fields.

## Project Design specification
    
### business domain model

Organization, User and Ticket have primary key, and foreign keys<br>

- Organization: primary key is _id
- User: primary key is _id, foreign keys is organization_id
- Ticket: primary key is _id, foreign keys are submitter_id, assignee_id and organization_id

Based on given json files, these model specified some nullable fields<br>
e.g. a Ticket must have submitter_id (submitted by some user), but could have no assignee_id (not assigned yet) <br>
The search can handle these nullable fields<br>

### search
 - Search has two stages: index stage and search stage
 - Index stages: it can indexded by either string, number, boolean fields or array fields
 - Search support for multiple searchable fields
 - The search response times should not increase linearly as the number of documents grows.
   Search time complexity is hashtable O(1) becuase of the indexing

### search explaination
Search index is using lodash groupby, which can group by one layer field (string, number, boolean) <br>
I implemented the two layers field indexing by adding temporary fields and removing them<br>
e.g. User has a tags property which is an array. If there are two users:<br>
- {_id:1, tags: ['programmer','qa']}
- {_id:2, tags: ['qa']}
It first added fields<br>
- {_id:1, tags: ['programmer','qa'], __tmpFieldfor__tags: 'programmer'}
- {_id:1, tags: ['programmer','qa'], __tmpFieldfor__tags: 'qa'}
- {_id:2, tags: ['qa'], __tmpFieldfor__tags: 'qa'}
Then group by __tmpFieldfor__tags<br>
- {'programmer', [{_id:1, tags: ['programmer','qa'], __tmpFieldfor__tags: 'programmer'}] }
- {'qa', [{_id:1, tags: ['programmer','qa'], __tmpFieldfor__tags: 'qa'}, {_id:2, tags: ['qa'], __tmpFieldfor__tags: 'qa'}] }
Then remove __tmpFieldfor__tags<br>
- {'programmer', [{_id:1, tags: ['programmer','qa']}] }
- {'qa', [{_id:1, tags: ['programmer','qa']}, {_id:2, tags: ['qa']] }
When the user search 'qa', it will get [{_id:1, tags: ['programmer','qa']}, {_id:2, tags: ['qa']] in O(1) <br>