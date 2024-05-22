import React from "react";
import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../redux/reducer';
import SearchComponent from '../../components/SearchComponent';

const store = createStore(reducer);

test('renders SearchComponent correctly', () => {
    render(
        <Provider store={store}>
            <SearchComponent />
        </Provider>
    );

    expect(screen.getByPlaceholderText('Search by coin')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
});