import React from 'react';
import SearchPage from '../SearchPage';
import renderer from 'react-test-renderer';

describe('SearchPage', () => {
    it('should render to match snapshot', () => {
        const tree = renderer.create(<SearchPage />).toJSON();
        expect(tree).toMatchSnapshot();
      });

});