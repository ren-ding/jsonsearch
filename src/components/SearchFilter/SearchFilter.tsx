import React, { Component } from 'react';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';

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
    <div>
        <label>{labelName}</label>
        <input type="text" onChange={onInputChange}></input>
    </div>
);

export default class SearchFilter extends Component<SearchFilterPropsInterface, SearchFilterStatesInterface> {
    constructor(props:SearchFilterPropsInterface) {
        super(props);
    }

    render() {
        return (
        <div>
            <Dropdown 
                options={this.props.searchTableDropdownList}
                onChange={this.props.onChange}
                value={this.props.selectedSearchTable.toString()} 
            />
            <InputBox
                labelName = "SearchableFields(e.g. name,tags): "
                onInputChange={this.props.onSearchableFieldsChange}
            />
            <InputBox
                labelName = "Search Value: "
                onInputChange={this.props.onSearchValueChange}
            />
        </div>);
    }
}