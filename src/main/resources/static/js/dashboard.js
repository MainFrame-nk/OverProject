/* globals Chart:false */

(() => {
    'use strict'

    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Chelsea',
                'Manchester United',
                'Crystal Palace',
                'West Ham',
                'Real Madrid',
                'Brentford',
                'Liverpool'
            ],
            datasets: [{
                data: [
                    15,
                    21,
                    12,
                    25,
                    6,
                    32,
                    16
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    boxPadding: 3
                }
            }
        }
    })
})()
