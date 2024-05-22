import React from "react";
import { render,fireEvent,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "../../redux/reducer";
import GraphComponent from '../../components/GraphComponent';

const store = createStore(reducer);

test('renders graphComponent correctly', () => {
    render(
        <Provider store={store}>
            <GraphComponent />
        </Provider>
    );

    expect(screen.getByText('Cryptocurrency')).toBeInTheDocument();
    expect(screen.getByText('Line')).toBeInTheDocument();
});

test('toggles cryptocurrency dropdown on button click', () => {
    render(
        <Provider store={store}>
            <GraphComponent />
        </Provider>
    );

    // Open the cryptocurrency dropdown
    fireEvent.click(screen.getByText('Cryptocurrency'));
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    // Close the cryptocurrency dropdown
    fireEvent.click(screen.getByText('Cryptocurrency'));
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();

});

test('toggles chart type dropdown on button click', () => {
    render(
        <Provider store={store}>
            <GraphComponent />
        </Provider>
    );

    // Open the chart type dropdown
    fireEvent.click(screen.getByText('Line'));
    expect(screen.getByText('Bar chart horizontal')).toBeInTheDocument();

    // Close the chart type dropdown
    fireEvent.click(screen.getByRole('button', { name: 'Line'}));
    expect(screen.queryByText('Bar chart horizontal')).not.toBeInTheDocument();
});