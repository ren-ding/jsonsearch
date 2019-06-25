import React from 'react';
import SearchFilter, {SearchFilterPropsInterface} from '../SearchFilter';
import renderer from 'react-test-renderer';

describe('SearchFilter', () => {
    let props:SearchFilterPropsInterface;
    beforeEach(()=> {
        props = {
            searchTableDropdownList: [],
            onChange: () => {},
            selectedSearchTable: 0,
            onSearchableFieldsChange: (event: {target: { value: string }}) => {},
            onSearchValueChange: (event: {target: { value: string }}) => {}
        }
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<SearchFilter {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});