import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

function BarChartHorizontal({ChartData}) {
    // Get the current currency from the Redux store
    const currency = useSelector(state => state.currency);

    // Options for  horizontal bar chart
    const options = {
        // Display bars horizontally
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeOutCubic',
        },
        elements: {
            bar: {
              borderWidth: 2,
            },
          },
        plugins: {
            // Display legend at the top end
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                }
            },
            // Display title  at the top start
            title: {
                display: true, 
                text: currency, 
                align: 'start', 
                position: 'top', 
                font: {
                    size: 12, 
                },
                padding: 0,
            },
            // Customize tooltip appearance
            tooltip: {
                mode: "index",
                backgroundColor: '#fff',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: 'rgba(0,0,0,0.3)',
                bodyFont: {
                  size: 14, // Body font size
                },
                titleFont: {
                  size: 12, // Title font size
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

    // Render the horizontal bar chart
    return <Bar data={ChartData} options={options} />
}

export default BarChartHorizontal;