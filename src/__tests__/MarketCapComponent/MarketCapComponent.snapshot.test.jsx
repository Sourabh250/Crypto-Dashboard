import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import MarketCapComponent from '../../components/MarketCapComponent';

const store = createStore(reducer);

test('MarketCapComponent snapshot', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <MarketCapComponent />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
})