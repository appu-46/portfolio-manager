import * as XLSX from "xlsx";
import { FaUpload } from "react-icons/fa";

function ExcelReader({ onDataUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const wb = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = wb.SheetNames[0]; // Use the first sheet, adjust if necessary
        const ws = wb.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const headerRow = json[4];

        // Get the index of the relevant columns ("NAV Date" and "NAV (Rs)")
        const navDateIndex = headerRow.indexOf("NAV Date");
        const navRsIndex = headerRow.indexOf("NAV (Rs)");

        console.log(navDateIndex, navRsIndex);

        // Filter data starting from row 4 (the actual data) and extract the required columns
        const filteredData = json.slice(4).map((row) => ({
          NAVDate: row[navDateIndex],
          NAVRs: row[navRsIndex],
        }));

        // Store the data in the state for graph
        onDataUpload(filteredData);
      };
      reader.readAsBinaryString(file);
    }
  };

  // The data is now stored in the state as 'navData'
  // You can pass 'navData' to your graph component

  return (
    <div>
      <label className="upload-btn">
        <input type="file" onChange={handleFileUpload} />
        <span>
          {" "}
          <FaUpload /> Upload Excel File
        </span>
      </label>
    </div>
  );
}

export default ExcelReader;
