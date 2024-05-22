import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Importing ChartJS from chart.js/auto
import { useSelector } from "react-redux";

function LineChart({ ChartData }) {
  // Get the current currency from the Redux store
  const currency = useSelector((state) => state.currency);

  // Options for the line chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
  },
        plugins: {
            // Display legend at the top end
            legend: {
              display: true,
              position: "top",
              align: "end",
              labels: {
                usePointStyle: true,
              },
            },
            // Display title  at the top start
            title: {
              display: true,
              text: currency,
              align: "start",
              position: "top",
              font: {
                size: 12,
              },
              padding: 0,
            },
            // Customize tooltip appearance
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: '#fff',
              titleColor: '#000',
              bodyColor: '#000',
              borderColor: 'rgba(0,0,0,0.3)',
              bodyFont: {
                size: 14,
              },
              titleFont: {
                size: 12,
              },
              padding: 12,
              cornerRadius: 6,
            },
            // Hide data labels
            datalabels: {
              display: false,
          },
          },
  };

  // Render the line chart
  return (
    <Line
      data={ChartData}
      options={options}
    />
  );
}

export default LineChart;
