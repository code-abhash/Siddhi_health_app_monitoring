import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

const HeartChart = ({ patientId }) => {
  // State to store chart data
  const [chartData, setChartData] = useState({});
  // State to store filter type (day, week, or month)
  const [filterType, setFilterType] = useState('day');
  // State to store selected date (for day filter)
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // Function to fetch and set chart data
  const chart = async () => {
    try {
      // Construct API URL based on filter type
      let url = `http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals?filter_type=${filterType}`;
      if (filterType === 'day') {
        url += `&date=${selectedDate}`;
      }

      // Fetch data from API
      const res = await axios.get(url);
      console.log(res); // Log the full response
      const data = res.data;

      if (Array.isArray(data)) {
        let appoint_times = [];
        let heartRates = [];

        // Process data for day filter
        if (filterType === 'day') {
          for (const dataObj of data) {
            appoint_times.push(dataObj.appointmentTime);
            heartRates.push(parseInt(dataObj.heartRate, 10));
          }
          setChartData({
            labels: appoint_times,
            datasets: [
              {
                label: "Heart Rate of Patients (bpm)",
                data: heartRates,
                backgroundColor: ["rgba(255, 99, 132, 0.6)"],
                borderWidth: 4,
              },
            ],
          });
        } else if (filterType === 'week') {
          // Process data for week filter
          const startOfWeek = moment().startOf('week');
          const endOfWeek = moment().endOf('week');

          const filteredData = data.filter(item => {
            const date = moment(item.appointmentDate);
            return date.isBetween(startOfWeek, endOfWeek, null, '[]');
          });

          for (let i = 0; i < 7; i++) {
            const dayLabel = startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD');
            appoint_times.push(dayLabel);
          }

          const groupedData = filteredData.reduce((acc, current) => {
            const date = moment(current.appointmentDate).format('YYYY-MM-DD');
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(parseInt(current.heartRate, 10));
            return acc;
          }, {});

          heartRates = appoint_times.map(date => {
            const rates = groupedData[date];
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });
        } else if (filterType === 'month') {
          // Process data for month filter
          const startOfMonth = moment().startOf('month');
          const endOfMonth = moment().endOf('month');

          const filteredData = data.filter(item => {
            const date = moment(item.appointmentDate);
            return date.isBetween(startOfMonth, endOfMonth, null, '[]');
          });

          appoint_times = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          const weekLabels = appoint_times.map((_, index) => ({
            start: startOfMonth.clone().add(index, 'weeks').startOf('week'),
            end: startOfMonth.clone().add(index, 'weeks').endOf('week')
          }));

          const groupedData = filteredData.reduce((acc, current) => {
            const date = moment(current.appointmentDate);
            const weekIndex = weekLabels.findIndex(
              week => date.isBetween(week.start, week.end, null, '[]')
            );
            if (weekIndex !== -1) {
              if (!acc[weekIndex]) {
                acc[weekIndex] = [];
              }
              acc[weekIndex].push(parseInt(current.heartRate, 10));
            }
            return acc;
          }, {});

          heartRates = appoint_times.map((_, index) => {
            const rates = groupedData[index];
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });
        }

        // Set chart data state
        setChartData({
          labels: appoint_times,
          datasets: [
            {
              label: filterType === 'day' ? "Heart Rate per Hour (bpm)" : (filterType === 'week' ? "Average Heart Rate per Day (bpm)" : "Average Heart Rate per Week (bpm)"),
              data: heartRates,
              backgroundColor: ["rgba(255, 99, 132, 0.6)"],
              borderWidth: 4,
            },
          ],
        });
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Fetch chart data whenever patientId, filterType, or selectedDate changes
  useEffect(() => {
    chart();
  }, [patientId, filterType, selectedDate]);

  // Handle filter type change
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filterType} onChange={handleFilterChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      {filterType === 'day' && (
        <div>
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
        </div>
      )}
      <>
        {chartData && chartData.labels ? (
          <Line data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </>
    </div>
  );
};

export default HeartChart;