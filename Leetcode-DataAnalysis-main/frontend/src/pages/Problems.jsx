import { useEffect, useState } from "react";
import axios from "axios";
import "./Problems.css";

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/problems")
      .then((res) => {
        setProblems(res.data);
      })
      .catch((err) => {
        console.log("Error fetching problems:", err);
      });
  }, []);

  return (
    <div className="problems-container">
      <h1 className="problems-title">
        LeetCode Problems List
      </h1>

      <div className="table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Acceptance Rate</th>
              <th>Companies</th>
              <th>Topics</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>

                <td
                  className={
                    item.difficulty === "Easy"
                      ? "easy"
                      : item.difficulty === "Medium"
                      ? "medium"
                      : "hard"
                  }
                >
                  {item.difficulty}
                </td>

                <td>{item.acceptance_rate}%</td>

                <td>{item.companies}</td>

                <td>{item.related_topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Problems;