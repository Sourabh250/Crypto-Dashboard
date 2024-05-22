import React,{ useState } from "react";
import { IoTriangle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function CurrencySelectorComponent() {
    const [list, setList] = useState(false);
    const dispatcher = useDispatch();
    const reduxData = useSelector(state => state.currency);

    // Function to handle currency selection
    const handleCurrency = (e) => {
        dispatcher({type: "SET_CURRENCY", payload: e.target.textContent});
        setList(false); // Close the currency list dropdown
    };

    const currencyList = ["INR","USD","EUR","JPY","GBP"]; // List of currency

    return (
        <div className="w-28 bg-gray-100 rounded-lg shadow-lg relative">
            <button className="w-full h-full flex justify-between items-center gap-1  p-4" onClick={() => setList(!list)}>{reduxData}<IoTriangle style={{transform: "rotate(180deg)"}} /></button>

            {/* Currency list */}
            {list && <ul className="absolute z-10 bg-gray-300 w-32 mt-2 rounded max-h-20 overflow-y-auto p-2 custom-scrollbar">
                {currencyList.map(currency => (
                    <li key={currency} className="p-1 hover:bg-red-200 cursor-pointer" onClick={handleCurrency}>{currency}</li>
                ))}
            </ul>}
        </div>
    )
}

export default CurrencySelectorComponent;