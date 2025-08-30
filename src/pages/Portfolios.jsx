import { useState } from "react";
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
import { Line } from "react-chartjs-2";

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

function Portfolios() {
  const [fromDate, setFromDate] = useState("2019-01-01");
  const [toDate, setToDate] = useState("2024-04-24");

  const portfolioData = [
    {
      name: "Focused",
      ytd: "-1.7%",
      d1: "0.1%",
      w1: "2.9%",
      m1: "7.6%",
      m3: "2.2%",
      m6: "10.1%",
      y1: "43.5%",
      y3: "23.9%",
      si: "22.5%",
      dd: "-2.8%",
      maxdd: "-40.3%",
    },
    {
      name: "NIFTY50",
      ytd: "3.1%",
      d1: "0.1%",
      w1: "1.1%",
      m1: "1.4%",
      m3: "4.4%",
      m6: "16.2%",
      y1: "26.2%",
      y3: "16.0%",
      si: "14.5%",
      dd: "-1.5%",
      maxdd: "-38.4%",
    },
  ];

  const getReturnClass = (value) => {
    if (typeof value === "string") {
      return value.startsWith("-") ? "negative" : "positive";
    }
    return value < 0 ? "negative" : "positive";
  };

  // Generate sample chart data
  const generateChartData = () => {
    const dates = [];
    const focusedData = [];
    const niftyData = [];
    const drawdownData = [];

    const startDate = new Date("2019-01-01");
    const endDate = new Date("2024-04-24");
    let focusedValue = 100;
    let niftyValue = 100;
    let maxFocused = 100;

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 7)
    ) {
      dates.push(d.toISOString().split("T")[0]);

      // Simulate portfolio growth with volatility
      focusedValue *= 1 + (Math.random() - 0.45) * 0.02;
      niftyValue *= 1 + (Math.random() - 0.48) * 0.015;

      maxFocused = Math.max(maxFocused, focusedValue);
      const drawdown = ((focusedValue - maxFocused) / maxFocused) * 100;

      focusedData.push(focusedValue);
      niftyData.push(niftyValue);
      drawdownData.push(drawdown);
    }

    return {
      labels: dates,
      datasets: [
        {
          label: "Focused",
          data: focusedData,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: "NIFTY50",
          data: niftyData,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: "Drawdown",
          data: drawdownData,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderWidth: 1,
          fill: true,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
          yAxisID: "y1",
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        min: -200,
        max: 150,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        display: true,
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trailing Returns</h1>
      </div>

      <div className="returns-table">
        <h2 className="table-title">Performance Summary</h2>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>YTD</th>
              <th>1D</th>
              <th>1W</th>
              <th>1M</th>
              <th>3M</th>
              <th>6M</th>
              <th>1Y</th>
              <th>3Y</th>
              <th>SI</th>
              <th>DD</th>
              <th>MAXDD</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map((portfolio) => (
              <tr key={portfolio.name}>
                <td>
                  <strong>{portfolio.name}</strong>
                </td>
                <td className={getReturnClass(portfolio.ytd)}>
                  {portfolio.ytd}
                </td>
                <td className={getReturnClass(portfolio.d1)}>{portfolio.d1}</td>
                <td className={getReturnClass(portfolio.w1)}>{portfolio.w1}</td>
                <td className={getReturnClass(portfolio.m1)}>{portfolio.m1}</td>
                <td className={getReturnClass(portfolio.m3)}>{portfolio.m3}</td>
                <td className={getReturnClass(portfolio.m6)}>{portfolio.m6}</td>
                <td className={getReturnClass(portfolio.y1)}>{portfolio.y1}</td>
                <td className={getReturnClass(portfolio.y3)}>{portfolio.y3}</td>
                <td className={getReturnClass(portfolio.si)}>{portfolio.si}</td>
                <td className={getReturnClass(portfolio.dd)}>{portfolio.dd}</td>
                <td className={getReturnClass(portfolio.maxdd)}>
                  {portfolio.maxdd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="note">Note: Returns above 1 year are annualised</div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h2 className="table-title">Equity curve</h2>
          <div className="date-picker">
            <label>From date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="legend">
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#10b981" }}
            ></div>
            <span>Focused</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#3b82f6" }}
            ></div>
            <span>NIFTY50</span>
          </div>
        </div>
        <div className="chart-wrapper">
          <Line data={generateChartData()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Portfolios;
