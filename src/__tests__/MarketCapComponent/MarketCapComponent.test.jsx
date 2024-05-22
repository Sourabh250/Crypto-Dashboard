import React from "react";
import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import MarketCapComponent from '../../components/MarketCapComponent';

const store = createStore(reducer);

test('renders MarketCapComponent correctly', () => {
    render(
        <Provider store={store}>
            <MarketCapComponent />
        </Provider>
    );

    expect(screen.getByText(/Cryptocurrency by/i)).toBeInTheDocument();
    expect(screen.getByText(/market cap/i)).toBeInTheDocument();
})