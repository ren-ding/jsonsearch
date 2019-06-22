import * as _ from 'lodash';

export default class Search {
    _searchContent: Array<Object>;
    _indexedSearchContent: any; //this is a groupby results type, an object contains indexed key value pairs
    _searchableFields:Array<string>;

    constructor() {
        this._searchContent = [];
        this._indexedSearchContent = {};
        this._searchableFields = []; 
    }

    set searchableFields(value:Array<string>) {
        this._searchableFields = value;
        this.indexing();
    }
    
    get searchContent() : Array<Object> {
        return this._searchContent;
    }

    get indexedSearchContent() : Array<Object> {
        return this._indexedSearchContent;
    }

    /// <summary>
    /// append new search content and rebuild the index
    /// </summary>
    addSearchContent(newContent: Array<Object>) {
        this._searchContent = [...this._searchContent,...newContent];
        this.indexing();
    }

    search(searchValue: string) : Array<Object> {
        return this._indexedSearchContent[searchValue] || [];
    }

    /// <summary>
    /// a helper function used to build indexes for searchable fields via groupBy
    /// </summary>
    private indexing() {
        if(this._searchContent.length === 0 || this._searchableFields.length === 0) return;

        this._searchableFields.forEach(field => {
            const indexedContentByEachField =  _.chain(this._searchContent)
                                                .groupBy(field)
                                                .value();
            _.merge(this._indexedSearchContent,indexedContentByEachField);                                    
            return indexedContentByEachField;
        });
    }

}