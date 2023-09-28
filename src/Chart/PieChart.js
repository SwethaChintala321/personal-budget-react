import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS, Tooltip, Title, ArcElement, Legend} from 'chart.js';
ChartJS.register(
    Tooltip, Title, ArcElement, Legend
  );


function App() {
  const [budgetData, setBudgetData] = useState({ myBudget: [] });

  useEffect(() => {
    axios.get('http://localhost:3000/budget')
      .then((response) => {
        setBudgetData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#008000',
          '#ff0000',
          '#808080',
          '#E6E6FA',
          '#FF00FF',
          '#ADD8E6',
          '#A52A2A',
        ],
      },
    ],
  };

  for (const item of budgetData.myBudget) {
    chartData.labels.push(item.title);
    chartData.datasets[0].data.push(item.budget);
  }

  return (
    <div>
      {budgetData.myBudget.length > 0 ? (
        <div>
          <Pie data={chartData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
