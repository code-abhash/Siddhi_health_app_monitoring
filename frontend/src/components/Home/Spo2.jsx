import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

const SPO2Chart = ({ patientId }) => {
  const [chartData, setChartData] = useState({});
  const [filterType, setFilterType] = useState('day');
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [analysisResult, setAnalysisResult] = useState('');

  const fetchVitals = async () => {
    try {
      let url = `http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals?filter_type=${filterType}`;
      if (filterType === 'day') {
        url += `&date=${selectedDate}`;
      }

      const res = await axios.get(url);
      const data = res.data;

      if (Array.isArray(data)) {
        let appoint_times = [];
        let spo2Values = [];

        for (const dataObj of data) {
          appoint_times.push(dataObj.appointmentTime);
          spo2Values.push(parseInt(dataObj.spo2Value, 10));
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

        // Send the data to Flask API for analysis
        const analysisRes = await axios.post('http://127.0.0.1:8001/api/v1/analysis', {spo2Values});
        setAnalysisResult(analysisRes.data.analysis_result);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchVitals();
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
      {analysisResult && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{analysisResult}</pre>
        </div>
      )}
    </div>
  );
};

export default SPO2Chart;
