import React from "react";
import { render,screen,fireEvent, within } from '@testing-library/react';
import ExchangeComponent from "../../components/ExchangeComponent";

test('renders ExchangeComponent correctly', () => {
    render(<ExchangeComponent />);

    expect(screen.getByText('Exchange Coins')).toBeInTheDocument();

    expect(screen.getByText('Sell')).toBeInTheDocument();

    expect(screen.getByText('Buy')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Exchange' })).toBeInTheDocument();
})

test('toggles sell currency list on button click', () => {
    render(<ExchangeComponent />);
  
    // Open the sell currency list
    fireEvent.click(screen.getByText('Btc'));
    const sellCurrencyList = screen.getByTestId('sell-currency-list');
    expect(within(sellCurrencyList).getByText('Eth')).toBeInTheDocument();
  
    // Close the sell currency list
    fireEvent.click(screen.getByRole('button', { name: 'Btc' }));
    expect(within(sellCurrencyList).queryByText('Eth')).not.toBeInTheDocument();
  });

test('toggles buy currency list on button click', () => {
    render(<ExchangeComponent />);
  
    // Open the buy currency list
    fireEvent.click(screen.getByText('Eth'));
    const buyCurrencyList = screen.getByTestId('buy-currency-list');
    expect(within(buyCurrencyList).getByText('Btc')).toBeInTheDocument();
  
    // Close the buy currency list
    fireEvent.click(screen.getByRole('button', { name: 'Eth' }));
    expect(within(buyCurrencyList).queryByText('Btc')).not.toBeInTheDocument();
  });

  test('updates sell currency on list item click', () => {
    render(<ExchangeComponent />);

    fireEvent.click(screen.getByText('Btc'));
    fireEvent.click(screen.getByText('Xrp'));
    expect(screen.getByRole('button', { name: 'Xrp'})).toBeInTheDocument();
  });

  test('updates buy currency on list item click', () => {
    render(<ExchangeComponent />);

    fireEvent.click(screen.getByText('Eth'));
    fireEvent.click(screen.getByText('Bnb'));
    expect(screen.getByRole('button', { name: 'Bnb'})).toBeInTheDocument();
  });

  test('shows error on invalid sell amount', () => {
    render(<ExchangeComponent />);
  
    // Enter an invalid sell amount
    fireEvent.change(screen.getByLabelText('Enter value'), { target: { value: 'invalid' } });
  
    // Click exchange button
    fireEvent.click(screen.getByRole('button', { name: 'Exchange' }));
  
    // Verify error message
    expect(screen.getByText('Invalid Number')).toBeInTheDocument();
  });