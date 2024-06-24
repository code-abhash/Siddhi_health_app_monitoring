// // import React, { useState } from 'react';
// // import { Line } from 'react-chartjs-2';
// // import 'chart.js/auto';

// // const BloodPressureChart = () => {
// //   // Hardcoded data for testing
// //   const dayData = {
// //     labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
// //     datasets: [
// //       {
// //         label: 'Systolic BP Per Day',
// //         data: [120, 122, 121, 123, 125],
// //         fill: false,
// //         borderColor: 'rgb(255, 99, 132)',
// //         tension: 0.1
// //       },
// //       {
// //         label: 'Diastolic BP Per Day',
// //         data: [80, 82, 81, 83, 85],
// //         fill: false,
// //         borderColor: 'rgb(54, 162, 235)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

// //   const weekData = {
// //     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
// //     datasets: [
// //       {
// //         label: 'Systolic BP Per Week',
// //         data: [123, 125, 122, 126, 124, 122, 125],
// //         fill: false,
// //         borderColor: 'rgb(255, 99, 132)',
// //         tension: 0.1
// //       },
// //       {
// //         label: 'Diastolic BP Per Week',
// //         data: [83, 85, 82, 86, 84, 83, 85],
// //         fill: false,
// //         borderColor: 'rgb(54, 162, 235)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

// //   const monthData = {
// //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
// //     datasets: [
// //       {
// //         label: 'Systolic BP Per Month',
// //         data: [124, 122, 125, 123],
// //         fill: false,
// //         borderColor: 'rgb(255, 99, 132)',
// //         tension: 0.1
// //       },
// //       {
// //         label: 'Diastolic BP Per Month',
// //         data: [84, 82, 85, 83],
// //         fill: false,
// //         borderColor: 'rgb(54, 162, 235)',
// //         tension: 0.1
// //       }
// //     ]
// //   };

  
// // const [data, setData] = useState(dayData); // Default to dayData
// // const [filter, setFilter] = useState('per day'); // Default filter

// // const handleFilterChange = (e) => {
// // const newFilter = e.target.value;
// // setFilter(newFilter);

// // if (newFilter === 'per day') {
// // setData(dayData);
// // } else if (newFilter === 'per week') {
// // setData(weekData);
// // } else if (newFilter === 'per month') {
// // setData(monthData);
// // }
// // };

// // return (
// // <>
// // <select value={filter} onChange={handleFilterChange}>
// // <option value="per day">Per Day</option>
// // <option value="per week">Per Week</option>
// // <option value="per month">Per Month</option>
// // </select>
// // <Line data={data} />
// // </>
// // );
// // };

// // export default BloodPressureChart;
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import axios from 'axios';

// const BloodPressureChart = ({ patientId }) => {
//   const [chartData, setChartData] = useState({});

//   const chart = async () => {
//     let appoint_time = [];
//     let systolicBP = [];
//     let diastolicBP = [];

//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals`);
//       console.log('API response:', res); // Log the entire response
//       const data = res.data; // Adjust this line based on actual response structure

//       if (Array.isArray(data)) {
//         for (const dataObj of data) {
//           appoint_time.push(dataObj.appointmentTime);
//           systolicBP.push(parseInt(dataObj.systolicBP, 10));
//           diastolicBP.push(parseInt(dataObj.diastolicBP, 10));
//         }
//         setChartData({
//           labels: appoint_time,
//           datasets: [
//             {
//               label: "Systolic Blood Pressure",
//               data: systolicBP,
//               backgroundColor: "rgba(255, 99, 132, 0.6)",
//               borderColor: "rgba(255, 99, 132, 1)",
//               borderWidth: 1,
//               fill: false,
//             },
//             {
//               label: "Diastolic Blood Pressure",
//               data: diastolicBP,
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//               fill: false,
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

// export default BloodPressureChart;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment';

const BloodPressureChart = ({ patientId }) => {
  const [chartData, setChartData] = useState({});
  const [filterType, setFilterType] = useState('day');

  const chart = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/patients/${patientId}/vitals?filter_type=${filterType}`);
      console.log(res); // Log the full response
      const data = res.data;

      if (Array.isArray(data)) {
        let appoint_times = [];
        let systolicValues = [];
        let diastolicValues = [];

        if (filterType === 'day') {
          // Filter data for today
          for (const dataObj of data) {
            appoint_times.push(dataObj.appointmentTime);
            systolicValues.push(parseInt(dataObj.systolicBP, 10));
            diastolicValues.push(parseInt(dataObj.diastolicBP, 10));
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
              acc[date] = { systolic: [], diastolic: [] };
            }
            acc[date].systolic.push(parseInt(current.systolicBP, 10));
            acc[date].diastolic.push(parseInt(current.diastolicBP, 10));
            return acc;
          }, {});

          // Calculate average systolic and diastolic values per day
          systolicValues = appoint_times.map(date => {
            const rates = groupedData[date]?.systolic;
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });

          diastolicValues = appoint_times.map(date => {
            const rates = groupedData[date]?.diastolic;
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
                acc[weekIndex] = { systolic: [], diastolic: [] };
              }
              acc[weekIndex].systolic.push(parseInt(current.systolicBP, 10));
              acc[weekIndex].diastolic.push(parseInt(current.diastolicBP, 10));
            }
            return acc;
          }, {});

          // Calculate average systolic and diastolic values per week
          systolicValues = appoint_times.map((_, index) => {
            const rates = groupedData[index]?.systolic;
            if (rates) {
              const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
              return avgRate;
            }
            return null;
          });

          diastolicValues = appoint_times.map((_, index) => {
            const rates = groupedData[index]?.diastolic;
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
              label: "Systolic Blood Pressure",
              data: systolicValues,
              backgroundColor: ["rgba(255, 99, 132, 0.6)"],
              borderWidth: 4,
            },
            {
              label: "Diastolic Blood Pressure",
              data: diastolicValues,
              backgroundColor: ["rgba(54, 162, 235, 0.6)"],
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

export default BloodPressureChart;
