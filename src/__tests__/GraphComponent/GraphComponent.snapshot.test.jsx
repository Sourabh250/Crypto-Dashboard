import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import GraphComponent from '../../components/GraphComponent';

const store = createStore(reducer);

test('GraphComponent snapshot', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <GraphComponent />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});