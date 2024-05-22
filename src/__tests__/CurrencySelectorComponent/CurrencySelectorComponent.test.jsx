import React from "react";
import { render,screen,fireEvent } from  '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import CurrencySelectorComponent from '../../components/CurrencySelectorComponent';

const store = createStore(reducer);

test('renders the selected currency correctly', () => {
    render(
        <Provider store={store}>
            <CurrencySelectorComponent />
        </Provider>
    );

    // Verify the initial state
    expect(screen.getByText('USD')).toBeInTheDocument();
});

test('check the currency list on button click', () => {
    render(
        <Provider store={store}>
            <CurrencySelectorComponent />
        </Provider>
    );

    // Click to open the currency list
    fireEvent.click(screen.getByText('USD'));
    expect(screen.getByText('INR')).toBeInTheDocument();

    // Click to close the currency list
    // there are multiple elements with the text "USD" — one in the button and one in the list item, thatswhy using getByRole to specifically target the button
    fireEvent.click(screen.getByRole('button', { name: 'USD' }));
  expect(screen.queryByText('INR')).not.toBeInTheDocument();
});

test('updates the selected currency on  click', () => {
    render(
        <Provider store={store}>
            <CurrencySelectorComponent />
        </Provider>
    );

    // Open the currency list
    fireEvent.click(screen.getByText('USD'));

    // Select a currency
    fireEvent.click(screen.getByText('INR'));

    // Verify the selected currency is updated
    expect(screen.getByText('INR')).toBeInTheDocument();
})