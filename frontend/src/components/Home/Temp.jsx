import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = () => {
  // Hardcoded data for testing
  const dayData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
    datasets: [
      {
        label: 'Temperature Per Day',
        data: [96, 99, 97, 100, 102],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const weekData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Temperature Per Week',
        data: [96, 99, 97, 100, 102, 98, 101],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const monthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Temperature Per Month',
        data: [96, 99, 97, 100, 102],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const [data, setData] = useState(dayData); // Default to dayData
  const [filter, setFilter] = useState('per day'); // Default filter

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    
    if (newFilter === 'per day') {
      setData(dayData);
    } else if (newFilter === 'per week') {
      setData(weekData);
    } else if (newFilter === 'per month') {
      setData(monthData);
    }
  };

  return (
    <>
      <select value={filter} onChange={handleFilterChange}>
        <option value="per day">Per Day</option>
        <option value="per week">Per Week</option>
        <option value="per month">Per Month</option>
      </select>
      <Line data={data} />
    </>
  );
};

export default TemperatureChart;
