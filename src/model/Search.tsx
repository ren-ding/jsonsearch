import * as _ from 'lodash';
import * as fromUtil from './Util';

export default class Search <T> {
    _searchContent: Array<T>;
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

    get searchableFields(): Array<string> {
        return this._searchableFields;
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
    addSearchContent(newContent: Array<T>) {
        this._searchContent = [...this._searchContent,...newContent];
        this.indexing();
    }

    search(searchValue: string) : Array<T> {
        return this._indexedSearchContent[searchValue] || [];
    }

    isArrayField(fieldName: string, content:Array<T>) {
        if(content.length === 0) return false;
        //check the input field is an array type property in content
        const contentFirstElement:any = content[0];// this is a json key value pair element
        return (contentFirstElement[fieldName] instanceof Array);
    }

    
    readonly tmpFieldPrefix: string = "__tmpFieldNameFor__";
    /// <summary>
    /// flatten content,
    /// if it contains array type fields, insert temporary fields for them
    /// [{tags:["a", "b"]}]
    /// =>
    /// [{tags:["a", "b"], __tmpFieldfor__tags:"a"}, {tags:["a", "b"],  __tmpFieldfor__tags:"b"}]
    /// </summary>
    flattenSearchContent(fieldName: string, content:Array<T>) {
        if(content.length === 0) return [];
        if(!this.isArrayField(fieldName,content)) return content;

        //iterate each content item and iterate its array property values
        //generate new array items
        const nestedResult = content.map((item:any) => 
            item[fieldName].map( (val: string|number) => 
                _.assign({},item,{[this.tmpFieldPrefix + `${fieldName}`] :val})
            )
        );

        return _.flatten(nestedResult);
    }

    /// <summary>
    /// remove temporary added fields from indexed search content
    /// </summary>
    removeTmpField(indexedContentWithTmpField:any, tmpFieldName:string) {
        let result = {};
        Object.keys(indexedContentWithTmpField).forEach((k:any)=> {
            const indexedValue = indexedContentWithTmpField[k].map((val:any) => {
                delete val[tmpFieldName];
                return val;
            });
            _.merge(result,{ [`${k}`]: indexedValue }); 
        });

        return result;
    }


    /// <summary>
    /// a helper function used to build indexes for searchable fields via groupBy
    /// </summary>
    private indexing() {
        if(this._searchContent.length === 0 || this._searchableFields.length === 0) return;
        this._indexedSearchContent = {};

        this._searchableFields.forEach(fieldName => {
            if(this.isArrayField(fieldName,this._searchContent)){
                //preprocessing the searchContent
                let content = _.assign(this._searchContent);
                content = this.flattenSearchContent(fieldName,content);
                
                const indexedContentWithTmpField = fromUtil.indexedByField(content, this.tmpFieldPrefix + fieldName);
                const indexedResult = this.removeTmpField(indexedContentWithTmpField, this.tmpFieldPrefix + fieldName);
                
                //remove tmpfields
                _.merge(this._indexedSearchContent, indexedResult);
            } else {
                const indexedContent = fromUtil.indexedByField(this._searchContent, fieldName);
                _.merge(this._indexedSearchContent, indexedContent);                     
            }
        });
    }
}