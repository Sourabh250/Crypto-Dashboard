import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import Chart.js with auto mode
import DataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// Register the datalabels plugin with Chart.js
ChartJS.register(DataLabels);

function PieChart({ChartData}) {
    return <Pie data={ChartData} options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
            easing: 'easeInOutQuad'
        },
        layout: {
            padding: 0,
        },
        plugins: {
            legend: {
                display: true,
                position: 'right',
                align: 'center',
                labels: {
                    usePointStyle: true,   
                    padding: 20,
                }
            },
            tooltip: {
                enabled: true,
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
            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    return `$${value}`;
                },
                font: {
                    weight: 'bold',
                    size: 14,
                },
                padding: 0,
            },
        }
    }} />
}

export default PieChart;