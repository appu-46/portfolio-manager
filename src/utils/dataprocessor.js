import * as XLSX from "xlsx";

export const processExcelData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Process first sheet for portfolio data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const formatPortfolioData = (rawData) => {
  // Transform your Excel data structure to match the portfolio format
  // This is a template - adjust based on your actual Excel structure
  return rawData.map((row) => ({
    name: row.Portfolio || row.Name,
    ytd: formatPercentage(row.YTD),
    d1: formatPercentage(row["1D"]),
    w1: formatPercentage(row["1W"]),
    m1: formatPercentage(row["1M"]),
    m3: formatPercentage(row["3M"]),
    m6: formatPercentage(row["6M"]),
    y1: formatPercentage(row["1Y"]),
    y3: formatPercentage(row["3Y"]),
    si: formatPercentage(row.SI),
    dd: formatPercentage(row.DD),
    maxdd: formatPercentage(row.MAXDD),
  }));
};

const formatPercentage = (value) => {
  if (typeof value === "number") {
    return `${(value * 100).toFixed(1)}%`;
  }
  return value || "0.0%";
};
