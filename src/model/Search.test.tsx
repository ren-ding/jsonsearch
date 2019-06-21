import Search from './Search';

describe('Search', () => {
    let search: Search;
    let organizations: Array<Object>;

    beforeEach(() => {
        search = new Search();

        organizations = [
            {
                _id:1,
                name:"MYOB",
                abn:13086760198,
                tags:["software company","accounting"]
            },
            {
                _id:2,
                name:"Xero",
                abn:8924215247,
                tags:["software company","accounting"]
            }
        ]
    });

    describe('added a json search content without search field', () => {
        it('should not index the search content', () => {
            search.addSearchContent(organizations);
            expect(search.indexedSearchContent).toEqual({});
        });
    });

    describe('added a json search content with a search field: name', () => {
        it('should index the search content by name', () => {
            search.addSearchContent(organizations);
            search.searchField = "name";
            const organizationsIndexedByName = {
                "MYOB": [
                   {
                      "_id": 1,
                      "name": "MYOB",
                      "abn": 13086760198,
                      "tags": [
                         "software company",
                         "accounting"
                      ]
                   }
                ],
                "Xero": [
                   {
                      "_id": 2,
                      "name": "Xero",
                      "abn": 8924215247,
                      "tags": [
                         "software company",
                         "accounting"
                      ]
                   }
                ]
            };

            expect(search.indexedSearchContent).toEqual(organizationsIndexedByName);
        });
    });

    describe('search companies by their names', () => {
        it('should find all companies by the searched name', () => {
            search.addSearchContent(organizations);
            search.searchField = "name";
            expect(search.search("UNKNOWN")).toEqual([]);
            expect(search.search("MYOB")).toEqual([organizations[0]]);
            expect(search.search("Xero")).toEqual([organizations[1]]);

        });
    });
});