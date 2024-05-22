import React from "react";
import renderer from 'react-test-renderer';
import  ExchangeComponent from '../../components/ExchangeComponent';

test('ExchangeComponent snapshot', () => {
    const tree = renderer.create(<ExchangeComponent />).toJSON();

    expect(tree).toMatchSnapshot();
});