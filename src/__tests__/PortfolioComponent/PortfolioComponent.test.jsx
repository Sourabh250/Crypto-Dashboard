import React from "react";
import { render, screen } from "@testing-library/react";
import PortfolioComponent from "../../components/PortfolioComponent";

// Mock the PieChart component
jest.mock("../../charts/PieChart", () => {
  return function DummyChart(props) {
    // renders the ChartData prop as a JSON string
    return <div data-testid="pie-chart">{JSON.stringify(props.ChartData)}</div>;
  };
});

test("renders PortfolioComponent correctly", () => {
  // Render the PortfolioComponent
  render(<PortfolioComponent />);

  expect(screen.getByText("Portfolio")).toBeInTheDocument();
  expect(screen.getByText(/Total value/i)).toBeInTheDocument();
  expect(screen.getByText("$1000")).toBeInTheDocument();
});

test("passes data to Piechart Correctly", () => {
  const data = {
    labels: ["Ethereum", "Tether", "Luna"],
    datasets: [
      {
        label: "Holdings",
        data: [250, 375, 375],
        borderWidth: 0,
      },
    ],
  };

  render(<PortfolioComponent />);

  // Verify that each label in the data is in the document
  expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
  expect(screen.getByText(/Tether/i)).toBeInTheDocument();
  expect(screen.getByText(/Luna/i)).toBeInTheDocument();

  expect(screen.getByText(/250/)).toBeInTheDocument();
  expect(screen.getByText(/375/)).toBeInTheDocument();

  // Verify that the mocked PieChart component receives the correct data as props
  expect(screen.getByTestId("pie-chart")).toHaveTextContent(
    JSON.stringify(data)
  );
});