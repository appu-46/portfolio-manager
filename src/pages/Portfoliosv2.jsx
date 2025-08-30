// PortfolioV3.js
import React, { useState, useEffect } from "react";
import ExcelReader from "./ExcelReader"; // Import ExcelUploader for file upload
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Portfoliov2 = () => {
  const [navData, setNavData] = useState([]);
  const [portfolioMetrics, setPortfolioMetrics] = useState([]);

  // Function to clean and prepare data
  const cleanData = (data) => {
    return data
      .filter((row, index) => row.NAVDate !== "NAV Date" && index > 0) // Skip the first header row
      .map((row) => ({
        NAVDate: row.NAVDate,
        NAVRs: parseFloat(row.NAVRs), // Ensure NAVRs is a number
      }));
  };

  // Function to calculate the performance metrics

  // Calculate YTD (Year-To-Date)
  const calculateYTD = (data) => {
    const startOfYearNav = data.find(
      (item) =>
        new Date(item.NAVDate).getMonth() === 0 &&
        new Date(item.NAVDate).getDate() === 1
    )?.NAVRs;
    const currentNav = data[data.length - 1].NAVRs;
    return startOfYearNav
      ? ((currentNav - startOfYearNav) / startOfYearNav) * 100
      : 0;
  };

  // Calculate 1D (1 Day)
  const calculateOneDay = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const previousNav = data[data.length - 2].NAVRs;
    return ((currentNav - previousNav) / previousNav) * 100;
  };

  // Calculate 1W (1 Week)
  const calculateOneWeek = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const weekAgoNav = data[data.length - 8]?.NAVRs; // 7 days ago
    return weekAgoNav ? ((currentNav - weekAgoNav) / weekAgoNav) * 100 : 0;
  };

  // Calculate 1M (1 Month)
  const calculateOneMonth = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const monthAgoNav = data[data.length - 30]?.NAVRs; // 30 days ago
    return monthAgoNav ? ((currentNav - monthAgoNav) / monthAgoNav) * 100 : 0;
  };

  // Calculate 3M (3 Months)
  const calculateThreeMonth = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const threeMonthsAgoNav = data[data.length - 90]?.NAVRs; // 90 days ago
    return threeMonthsAgoNav
      ? ((currentNav - threeMonthsAgoNav) / threeMonthsAgoNav) * 100
      : 0;
  };

  // Calculate 6M (6 Months)
  const calculateSixMonth = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const sixMonthsAgoNav = data[data.length - 180]?.NAVRs; // 180 days ago
    return sixMonthsAgoNav
      ? ((currentNav - sixMonthsAgoNav) / sixMonthsAgoNav) * 100
      : 0;
  };

  // Calculate 1Y (1 Year)
  const calculateOneYear = (data) => {
    const currentNav = data[data.length - 1].NAVRs;
    const oneYearAgoNav = data[data.length - 365]?.NAVRs; // 365 days ago
    return oneYearAgoNav
      ? ((currentNav - oneYearAgoNav) / oneYearAgoNav) * 100
      : 0;
  };

  // Calculate MAXDD (Maximum Drawdown)
  const calculateMaxDD = (data) => {
    const navValues = data.map((item) => item.NAVRs);
    const peak = Math.max(...navValues);
    const trough = Math.min(...navValues);
    return ((peak - trough) / peak) * 100;
  };

  // Calculate SI (Since Inception)
  const calculateSI = (data) => {
    const inceptionNav = data[0].NAVRs;
    const currentNav = data[data.length - 1].NAVRs;
    return ((currentNav - inceptionNav) / inceptionNav) * 100;
  };

  useEffect(() => {
    function calculateMetrics() {
      if (navData.length === 0) return;

      // Clean the data
      const cleanNavData = cleanData(navData);
      const metrics = [
        {
          name: "Portfolio 1", // Replace with actual portfolio name if available
          ytd: calculateYTD(cleanNavData),
          oneDay: calculateOneDay(cleanNavData),
          oneWeek: calculateOneWeek(cleanNavData),
          oneMonth: calculateOneMonth(cleanNavData),
          threeMonth: calculateThreeMonth(cleanNavData),
          sixMonth: calculateSixMonth(cleanNavData),
          oneYear: calculateOneYear(cleanNavData),
          maxDD: calculateMaxDD(cleanNavData),
          si: calculateSI(cleanNavData),
        },
      ];

      setPortfolioMetrics(metrics);
    }
    calculateMetrics();
  }, [navData]);

  // Generate Chart Data for the Graph
  const generateChartData = () => {
    const dates = navData.map((item) => item.NAVDate);
    const navRs = navData.map((item) => item.NAVRs);

    return {
      labels: dates,
      datasets: [
        {
          label: "NAV (Rs)",
          data: navRs,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    };
  };

  // Recalculate metrics when navData changes

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trailing Returns (Portfolio v2)</h1>
      </div>

      {/* Excel Uploader */}
      <ExcelReader onDataUpload={setNavData} />

      {/* Metrics Table */}
      <div className="metrics-table">
        <h2>Performance Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>YTD</th>
              <th>1D</th>
              <th>1W</th>
              <th>1M</th>
              <th>3M</th>
              <th>6M</th>
              <th>1Y</th>
              <th>MAXDD</th>
              <th>SI</th>
            </tr>
          </thead>
          <tbody>
            {portfolioMetrics.map((portfolio, idx) => (
              <tr key={idx}>
                <td>{portfolio.name}</td>
                <td>{portfolio.ytd.toFixed(2)}%</td>
                <td>{portfolio.oneDay.toFixed(2)}%</td>
                <td>{portfolio.oneWeek.toFixed(2)}%</td>
                <td>{portfolio.oneMonth.toFixed(2)}%</td>
                <td>{portfolio.threeMonth.toFixed(2)}%</td>
                <td>{portfolio.sixMonth.toFixed(2)}%</td>
                <td>{portfolio.oneYear.toFixed(2)}%</td>
                <td>{portfolio.maxDD.toFixed(2)}%</td>
                <td>{portfolio.si.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Line Graph */}
      <div className="chart-container">
        <div className="chart-wrapper">
          <Line data={generateChartData()} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Portfoliov2;
