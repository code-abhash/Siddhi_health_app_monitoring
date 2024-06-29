import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

const SPO2Chart = ({ patientId }) => {
  const [chartData, setChartData] = useState({});
  const [filterType, setFilterType] = useState('day');
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const chart = async () => {
    try {
      let url = `http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals?filter_type=${filterType}`;
      if (filterType === 'day') {
        url += `&date=${selectedDate}`;
      }

      const res = await axios.get(url);
      console.log(res); // Log the full response
      const data = res.data;

      if (Array.isArray(data)) {
        let appoint_times = [];
        let spo2Values = [];

        if (filterType === 'day') {
          for (const dataObj of data) {
            appoint_times.push(dataObj.appointmentTime);
            spo2Values.push(parseInt(dataObj.spo2Value, 10));
          }
          setChartData({
            labels: appoint_times,
            datasets: [
              {
                label: "SPO2 Values (%)",
                data: spo2Values,
                backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                borderWidth: 4,
              },
            ],
          });
        } else if (filterType === 'week') {
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
            acc[date].push(parseInt(current.spo2Value, 10));
            return acc;
          }, {});

          spo2Values = appoint_times.map(date => {
            const rates = groupedData[date];
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });
        } else if (filterType === 'month') {
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
              acc[weekIndex].push(parseInt(current.spo2Value, 10));
            }
            return acc;
          }, {});

          spo2Values = appoint_times.map((_, index) => {
            const rates = groupedData[index];
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });
        }

        setChartData({
          labels: appoint_times,
          datasets: [
            {
              label: filterType === 'day' ? "SPO2 Values per Hour (%)" : (filterType === 'week' ? "Average SPO2 Values per Day (%)" : "Average SPO2 Values per Week (%)"),
              data: spo2Values,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
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

  useEffect(() => {
    chart();
  }, [patientId, filterType, selectedDate]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

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

export default SPO2Chart;