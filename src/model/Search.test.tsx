import Search from './Search';

interface FakeOrganization {
    id:number,
    name:string,
    abn:number,
    tags:Array<string>,
    domainNames: Array<string>
}

describe('Search', () => {
    let search: Search;
    let myobOrganization: FakeOrganization;
    let xeroOrganization: FakeOrganization;
    let organizations: Array<Object>;

    beforeEach(() => {
        search = new Search();

        myobOrganization = {
            id:1,
            name:"MYOB",
            abn:13086760198,
            tags:["software company","accounting"],
            domainNames: ["myob.com","arl.com"]
        };

        xeroOrganization = {
            id:2,
            name:"Xero",
            abn:8924215247,
            tags:["software company","accounting"],
            domainNames:["xero.com"]
        };

        organizations = [myobOrganization, xeroOrganization];
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
            search.searchableFields = ["name"];
            const organizationsIndexedByName = {
                "MYOB": [myobOrganization],
                "Xero": [xeroOrganization]
            };

            expect(search.indexedSearchContent).toEqual(organizationsIndexedByName);
        });
    });

    describe('search companies by their names', () => {
        it('should find all companies by the searched name', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["name"];
            expect(search.search("UNKNOWN")).toEqual([]);
            expect(search.search("MYOB")).toEqual([myobOrganization]);
            expect(search.search("Xero")).toEqual([xeroOrganization]);
            expect(search.search("13086760198")).toEqual([]);
            expect(search.search("8924215247")).toEqual([]);

        });
    });


    describe('added a json search content with multiple search fields', () => {
        it('should index by each field and combine the results', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["name","abn"];

            expect(search.indexedSearchContent).toEqual( {
                MYOB: [ myobOrganization ],
                Xero: [ xeroOrganization ],
                '13086760198': [ myobOrganization ],
                '8924215247': [ xeroOrganization]
              })
        });
    });

    describe('search companies by their names and abns', () => {
        it('should find all companies by the searched name', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["name", "abn"];
            expect(search.search("UNKNOWN")).toEqual([]);
            expect(search.search("MYOB")).toEqual([myobOrganization]);
            expect(search.search("Xero")).toEqual([xeroOrganization]);
            expect(search.search("13086760198")).toEqual([myobOrganization]);
            expect(search.search("8924215247")).toEqual([xeroOrganization]);

        });
    });


    describe('added a json search content with searchable fields are array type', () => {
        it('should index by array ToString() value and combine the results', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["tags","domainNames"];
            
            expect(search.indexedSearchContent).toEqual({
                'software company,accounting': [
                    myobOrganization, xeroOrganization
                ],
                'myob.com,arl.com': [
                    myobOrganization
                ],
                'xero.com': [
                    xeroOrganization
                ]
            });

        });
    });

    describe('flattenSearchContent: searchContent has an array type field',()=>{
        it('should flatten the searchContent with the new tmporary inserting field name', ()=> {
            const content = [{tags:["a", "b"]}];
            const searchableField = "tags";

            expect(search.flattenSearchContent(searchableField, content)).toEqual([
                {tags:["a", "b"],"__tmpFieldNameFor__tags": "a"},
                {tags:["a", "b"],"__tmpFieldNameFor__tags": "b"}
            ]);
        });
    });
});