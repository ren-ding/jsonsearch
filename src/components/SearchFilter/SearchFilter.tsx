import React, { Component } from 'react';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import './style/search-filter.css';

export interface SearchFilterPropsInterface {
    searchTableDropdownList: Array<Option>,
    onChange: (option:Option) => void,
    selectedSearchTable: number,
    onSearchableFieldsChange: (event: {target: { value: string }}) => void,
    onSearchValueChange: (event: {target: { value: string }}) => void
}

interface SearchFilterStatesInterface {

}

interface OnInputChangeInterface {
    labelName: string,
    onInputChange:(event: {target: { value: string }}) => void
}
  
const InputBox = ({
    labelName,
    onInputChange
}:OnInputChangeInterface)=>(
    <div className='ui fluid icon input'>
        <input type="text" size={30} onChange={onInputChange} placeholder={labelName}></input>
        <i className='search icon'></i>
    </div>
);

export default class SearchFilter extends Component<SearchFilterPropsInterface, SearchFilterStatesInterface> {
    constructor(props:SearchFilterPropsInterface) {
        super(props);
    }

    render() {
        return (
        <div className='search-filter-wrapper'>
            <div className='drop-down-wrapper'>
                <Dropdown 
                    options={this.props.searchTableDropdownList}
                    onChange={this.props.onChange}
                    value={this.props.selectedSearchTable.toString()} 
                />
            </div>
            <div className='searchable-fields-input-box-wrapper'>
                <InputBox
                    labelName = "Search fields (e.g. name,tags): "
                    onInputChange={this.props.onSearchableFieldsChange}
                />
            </div>
            <div className='search-value-input-box-wrapper'>
                <InputBox
                    labelName = "Search value"
                    onInputChange={this.props.onSearchValueChange}
                />
            </div>
        </div>);
    }
}