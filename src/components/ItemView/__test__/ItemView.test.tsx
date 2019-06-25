import React from 'react';
import ItemView, {ItemViewProps} from '../ItemView';
import renderer from 'react-test-renderer';

describe('ItemView', () => {
    let props: ItemViewProps;
    beforeEach(()=> {
        props = {
            itemObject: {variableName: 'variableValue'}
        }
    });

    it('should render to match snapshot', () => {
        const tree = renderer.create(<ItemView {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});