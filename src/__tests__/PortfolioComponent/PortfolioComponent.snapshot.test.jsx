import React from "react";
import renderer from 'react-test-renderer';
import PortfolioComponent from '../../components/PortfolioComponent';

test('PortfolioComponent snapshot', () => {
    const tree = renderer.create(<PortfolioComponent />).toJSON();

    expect(tree).toMatchSnapshot();
})