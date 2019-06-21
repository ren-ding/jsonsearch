import * as _ from 'lodash';

export default class Search {
    _searchContent: Array<Object>;
    _indexedSearchContent: any;
    _searchField:string;

    constructor() {
        this._searchContent = [];
        this._indexedSearchContent = {};
        this._searchField = ""; 
    }

    set searchField(value:string) {
        this._searchField = value;
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
    /// <returns></returns>
    addSearchContent(newContent: Array<Object>) {
        this._searchContent = [...this._searchContent,...newContent];
        this.indexing();
    }

    search(searchValue: string) : Array<Object> {
        return this._indexedSearchContent[searchValue] || [];
    }

    /// <summary>
    /// a helper function used to build indexes for searchable field via groupBy
    /// </summary>
    /// <returns></returns>
    private indexing() {
        if(this._searchContent.length === 0 || this._searchField === "") return;

        this._indexedSearchContent = _.chain(this._searchContent)
                                      .groupBy(this._searchField)
                                      .value();
    }
}