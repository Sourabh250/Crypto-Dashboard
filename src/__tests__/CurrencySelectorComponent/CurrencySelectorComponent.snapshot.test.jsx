import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import CurrencySelectorComponent from '../../components/CurrencySelectorComponent';

const store = createStore(reducer);

test('CurrencySelectorComponent snapshot', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <CurrencySelectorComponent />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});