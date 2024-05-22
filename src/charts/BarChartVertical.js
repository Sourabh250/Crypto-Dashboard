import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

function BarChartVertical({ChartData}) {
    // Get the current currency from the Redux store
    const currency = useSelector(state => state.currency);

    // Options for the vertical bar chart
    const options = {
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
    
    // Render the vertical bar chart
    return <Bar data={ChartData} options={options} />
}

export default BarChartVertical;