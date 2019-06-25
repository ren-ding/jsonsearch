import Search from './Search';

interface FakeOrganizationInterface {
    id:number,
    name:string,
    abn:number,
    tags:Array<string>,
    domainNames: Array<string>
}

describe('Search', () => {
    let search: Search<FakeOrganizationInterface>;
    let myobOrganization: FakeOrganizationInterface;
    let xeroOrganization: FakeOrganizationInterface;
    let organizations: Array<FakeOrganizationInterface>;

    beforeEach(() => {
        search = new Search();

        myobOrganization = {
            id:1,
            name:"MYOB",
            abn:13086760198,
            tags:["software company","accounting"],
            domainNames: ["myob.com","www.com"]
        };

        xeroOrganization = {
            id:2,
            name:"Xero",
            abn:8924215247,
            tags:["software company","accounting"],
            domainNames:["xero.com","www.com"]
        };

        organizations = [myobOrganization, xeroOrganization];
    });

    describe('addSearchContent: added a json search content without search field', () => {
        it('should not index the search content', () => {
            search.addSearchContent(organizations);
            expect(search.indexedSearchContent).toEqual({});
        });
    });

    describe('addSearchContent: added a json search content with a search field: name', () => {
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

    describe('search: search companies by their names', () => {
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

    describe('addSearchContent: added a json search content with multiple search fields', () => {
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

    describe('search: search companies by their names and abns', () => {
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

    describe('addSearchContent: added a json search content with searchable fields are array type', () => {
        it('should index by array value and combine the results', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["tags","domainNames"];
            
            expect(search.indexedSearchContent).toEqual( {
                'software company': [myobOrganization,xeroOrganization],
                'accounting': [myobOrganization, xeroOrganization],
                'myob.com': [myobOrganization],
                'www.com': [myobOrganization,xeroOrganization],
                'xero.com': [xeroOrganization]
              });
            
        });
    });

    describe('search: search companies by their tags and domainNames', () => {
        it('should find all companies by the searchable array value', () => {
            search.addSearchContent(organizations);
            search.searchableFields = ["tags","domainNames"];

            expect(search.search("software company")).toEqual([myobOrganization,xeroOrganization]);
            expect(search.search("accounting")).toEqual([myobOrganization,xeroOrganization]);
            expect(search.search("myob.com")).toEqual([myobOrganization]);
            expect(search.search("www.com")).toEqual([myobOrganization,xeroOrganization]);
            expect(search.search("xero.com")).toEqual([xeroOrganization]);

        });
    });


    describe('isArrayField: check organizations each field is array field or not',()=>{
        it('should tell the array field', ()=> {
            expect(search.isArrayField("id", organizations)).toBe(false);
            expect(search.isArrayField("name", organizations)).toBe(false);
            expect(search.isArrayField("abn", organizations)).toBe(false);
            expect(search.isArrayField("tags", organizations)).toBe(true);
            expect(search.isArrayField("domainNames", organizations)).toBe(true);
            expect(search.isArrayField("domainNames", [])).toBe(false);
        });
    });

    describe('flattenSearchContent: searchContent has an array type field',()=>{
        it('should flatten the searchContent with the new tmporary inserting field name', ()=> {            
            interface ItagInterface{
                tags:Array<string>        
            }
            const content:Array<ItagInterface> = [{tags:["a", "b"]}];
            const searchableField = "tags";
            const tagSearch = new Search<ItagInterface>()

            expect(tagSearch.flattenSearchContent(searchableField, content)).toEqual([
                {tags:["a", "b"],"__tmpFieldNameFor__tags": "a"},
                {tags:["a", "b"],"__tmpFieldNameFor__tags": "b"}
            ]);
        });
    });

    describe('removeTmpField: remove temporary added field during flatten search content',()=>{
        it('should remove the given fieldname from the content', ()=> {
            const flattenedIndexedContent = {
                'myob.com': [
                  {
                    ...myobOrganization,
                    __tmpFieldNameFor__domainNames: 'myob.com'
                  }
                ],
                'www.com': [
                  {
                    ...myobOrganization,
                    __tmpFieldNameFor__domainNames: 'www.com'
                  },
                  {
                    ...xeroOrganization,
                    __tmpFieldNameFor__domainNames: 'www.com'
                  }
                ],
                'xero.com': [
                  {
                    ...xeroOrganization,
                    __tmpFieldNameFor__domainNames: 'xero.com'
                  }
                ]
              };
            
            const indexedContent = search.removeTmpField(flattenedIndexedContent, "__tmpFieldNameFor__domainNames");

            expect(indexedContent).toEqual({
                'myob.com': [myobOrganization],
                'www.com': [myobOrganization, xeroOrganization],
                'xero.com': [xeroOrganization]
            });
        });
    });
    
});