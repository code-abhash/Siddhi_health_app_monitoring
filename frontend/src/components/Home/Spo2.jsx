// // import React, { useState } from 'react';
// // import { Line } from 'react-chartjs-2';
// // import 'chart.js/auto';

// // const SPO2Chart = () => {
// //   // Hardcoded data for testing
// //   const dayData = {
// //     labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
// //     datasets: [
// //       {
// //         label: 'SPO2 Per Day',
// //         data: [95, 96, 97, 98, 95],
// //         fill: false,
// //         borderColor: 'rgb(75, 192, 192)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

// //   const weekData = {
// //     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
// //     datasets: [
// //       {
// //         label: 'SPO2 Per Week',
// //         data: [96, 97, 95, 98, 96, 97, 99],
// //         fill: false,
// //         borderColor: 'rgb(75, 192, 192)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

// //   const monthData = {
// //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
// //     datasets: [
// //       {
// //         label: 'SPO2 Per Month',
// //         data: [97, 96, 98, 95],
// //         fill: false,
// //         borderColor: 'rgb(75, 192, 192)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

// //   const [data, setData] = useState(dayData); // Default to dayData
// //   const [filter, setFilter] = useState('per day'); // Default filter

// //   const handleFilterChange = (e) => {
// //     const newFilter = e.target.value;
// //     setFilter(newFilter);
    
// //     if (newFilter === 'per day') {
// //       setData(dayData);
// //     } else if (newFilter === 'per week') {
// //       setData(weekData);
// //     } else if (newFilter === 'per month') {
// //       setData(monthData);
// //     }
// //   };

// //   return (
// //     <>
// //       <select value={filter} onChange={handleFilterChange}>
// //         <option value="per day">Per Day</option>
// //         <option value="per week">Per Week</option>
// //         <option value="per month">Per Month</option>
// //       </select>
// //       <Line data={data} />
// //     </>
// //   );
// // };

// // export default SPO2Chart;
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import axios from 'axios';

// const SPO2Chart = ({ patientId }) => {
//   const [chartData, setChartData] = useState({});

//   const chart = async () => {
//     let appoint_time = [];
//     let spo2_Value = [];

//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals`);
//       console.log(res); // Log the full response
//       const data = res.data; // Adjust this line based on actual response structure

//       if (Array.isArray(data)) {
//         for (const dataObj of data) {
//           appoint_time.push(dataObj.appointmentTime);
//           spo2_Value.push(parseInt(dataObj.spo2Value, 10));
//           console.log(dataObj.heartRate)
//         }
//         setChartData({
//           labels: appoint_time,
//           datasets: [
//             {
//               label: "HeartRate of patients",
//               data: spo2_Value,
//               backgroundColor: ["rgba(75, 192, 192, 0.6)"],
//               borderWidth: 4,
//             },
//           ],
//         });
//       } else {
//         console.error('Data is not an array:', data);
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   useEffect(() => {
//     chart();
//   }, [patientId]);

//   return (
    
//     <>
//       {chartData && chartData.labels ? (
//         <Line data={chartData} />
//       ) : (
//         <p>Loading...</p>
//       )}
//       </>

//   );
// };

// export default SPO2Chart;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

const SPO2Chart = ({ patientId }) => {
  const [chartData, setChartData] = useState({});
  const [filterType, setFilterType] = useState('day');

  const chart = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals?filter_type=${filterType}`);
      console.log(res); // Log the full response
      const data = res.data;

      if (Array.isArray(data)) {
        let appoint_times = [];
        let spo2Values = [];

        if (filterType === 'day') {
          // Filter data for today
          for (const dataObj of data) {
            appoint_times.push(dataObj.appointmentTime);
            spo2Values.push(parseInt(dataObj.spo2Value, 10));
          }
        } else if (filterType === 'week') {
          // Filter data for the current week
          const startOfWeek = moment().startOf('week');
          const endOfWeek = moment().endOf('week');

          const filteredData = data.filter(item => {
            const date = moment(item.appointmentDate);
            return date.isBetween(startOfWeek, endOfWeek, null, '[]');
          });

          // Prepare labels for each day of the week
          for (let i = 0; i < 7; i++) {
            const dayLabel = startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD');
            appoint_times.push(dayLabel);
          }

          // Group filtered data by day
          const groupedData = filteredData.reduce((acc, current) => {
            const date = moment(current.appointmentDate).format('YYYY-MM-DD');
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(parseInt(current.spo2Value, 10));
            return acc;
          }, {});

          // Calculate average SPO2 values per day
          spo2Values = appoint_times.map(date => {
            const rates = groupedData[date];
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });
        } else if (filterType === 'month') {
          // Filter data for the current month
          const startOfMonth = moment().startOf('month');
          const endOfMonth = moment().endOf('month');

          const filteredData = data.filter(item => {
            const date = moment(item.appointmentDate);
            return date.isBetween(startOfMonth, endOfMonth, null, '[]');
          });

          // Prepare labels for each week of the month
          appoint_times = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          const weekLabels = appoint_times.map((_, index) => ({
            start: startOfMonth.clone().add(index, 'weeks').startOf('week'),
            end: startOfMonth.clone().add(index, 'weeks').endOf('week')
          }));

          // Group filtered data by week
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

          // Calculate average SPO2 values per week
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
              label: "SPO2 Values",
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
  }, [patientId, filterType]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
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

