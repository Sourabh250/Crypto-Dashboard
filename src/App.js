import "./App.css";
import MarketCapComponent from "./components/MarketCapComponent";
import CurrencySelectorComponent from "./components/CurrencySelectorComponent";
import SearchComponent from "./components/SearchComponent";
import GraphComponent from "./components/GraphComponent";
import PortfolioComponent from "./components/PortfolioComponent";
import ExchangeComponent from "./components/ExchangeComponent";

function App() {
  return (
    <main className="flex justify-center items-center md:h-screen p-8">
      <div className="w-full h-full flex justify-center items-center gap-4 md:flex-row flex-col">
        <div className="h-full w-full md:w-3/4  flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <CurrencySelectorComponent />
            <SearchComponent />
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <GraphComponent />
            <div className="h-2/5 grid sm:grid-cols-2 grid-cols-1 gap-4">
              <PortfolioComponent />
              <ExchangeComponent />
            </div>
          </div>  
        </div>
        <MarketCapComponent />
      </div>
    </main>
  );
}

export default App;