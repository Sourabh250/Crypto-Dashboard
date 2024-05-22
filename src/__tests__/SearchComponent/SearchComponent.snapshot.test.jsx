import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../redux/reducer";
import SearchComponent from '../../components/SearchComponent';

const store = createStore(reducer);

test('SearchComponent snapshot', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <SearchComponent />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
})