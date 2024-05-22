function reducer(state = {currency : "USD", selectedCurrencies: ["Ethereum"]},action) {
    switch(action.type) {
        // Update the selected currency in the state
        case "SET_CURRENCY":
            return {
                ...state,
                currency: action.payload
            };
        // Add a new cryptocurrency to the list of selected cryptocurrencies
        case "ADD_CRYPTO_CURRENCY" :
            return {
                ...state,
                selectedCurrencies: [...state.selectedCurrencies, action.payload],
            };
        // Remove a cryptocurrency from the list of selected cryptocurrencies
        case "REMOVE_CRYPTO_CURRENCY" :
            return {
                ...state,
                selectedCurrencies: state.selectedCurrencies.filter(data => data !== action.payload),
            };
        // Modify the list of selected cryptocurrencies to only contain the specified cryptocurrency
        case "MODIFY_CRYPTO_CURRENCY" :
            return {
                ...state,
                selectedCurrencies: [action.payload],
            }
        // Return the current state if the action type is not recognized
        default:
            return state;
    }
}

export default reducer;