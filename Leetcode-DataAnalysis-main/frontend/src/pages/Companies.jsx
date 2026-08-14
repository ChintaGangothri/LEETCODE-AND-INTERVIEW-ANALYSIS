import { useEffect, useState } from "react";
import axios from "axios";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/companies")
      .then((res) => setCompanies(res.data));
  }, []);

  return (
    <div className="company-container">
      <h1 className="company-title">
        Company Wise Problems
      </h1>

      <table className="company-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Problems Count</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((item, index) => (
            <tr key={index}>
              <td>
                {item.company || item.companies}
              </td>

              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;