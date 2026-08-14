import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [difficulty, setDifficulty] = useState([]);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topicAcceptance, setTopicAcceptance] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/difficulty")
      .then((res) => setDifficulty(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/topic-acceptance")
      .then((res) => setTopicAcceptance(res.data))
      .catch((err) => console.log(err));

  }, []);

  const totalProblems = difficulty.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const difficultyData = {
    labels: difficulty.map((item) => item.difficulty),
    datasets: [
      {
        label: "Problems Count",
        data: difficulty.map((item) => item.count),
        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#ec4899"
        ]
      }
    ]
  };

  const topicData = {
    labels: topics
      .slice(0, 10)
      .map((item) => item.topic || item.related_topics),

    datasets: [
      {
        label: "Topic Frequency",
        data: topics
          .slice(0, 10)
          .map((item) => item.count),
        backgroundColor: "#6366f1"
      }
    ]
  };

  const companyData = {
    labels: companies
      .slice(0, 8)
      .map((item) => item.company || item.companies),

    datasets: [
      {
        data: companies
          .slice(0, 8)
          .map((item) => item.count),

        backgroundColor: [
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
          "#f59e0b",
          "#ef4444",
          "#3b82f6",
          "#10b981"
        ]
      }
    ]
  };

  const acceptanceData = {
    labels: topicAcceptance
      .slice(0, 10)
      .map((item) => item.related_topics),

    datasets: [
      {
        label: "Average Acceptance Rate %",
        data: topicAcceptance
          .slice(0, 10)
          .map((item) => item.acceptance_rate),

        borderColor: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        tension: 0.4,
        fill: false
      }
    ]
  };

  return (
    <div className="container">

      <div className="sidebar">

        <h2>LeetCode Analytics</h2>

        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>

          <li>
            <Link to="/problems">Problems</Link>
          </li>

          <li>
            <Link to="/topics">Topics</Link>
          </li>

          <li>
            <Link to="/companies">Companies</Link>
          </li>
        </ul>

      </div>

      <div className="main">

        <div className="header">
          <h1>LeetCode Analytics Dashboard</h1>
        </div>

        <div className="cards">

          {difficulty.map((item, index) => (

            <div className="card" key={index}>

              <h3>{item.difficulty}</h3>

              <h2>{item.count}</h2>

              <p>
                Total Problems: {totalProblems}
              </p>

              <p>
                {(
                  (item.count / totalProblems) * 100
                ).toFixed(2)}
                % of total
              </p>

            </div>

          ))}

        </div>

        <div className="top-charts">

          <div className="chart-box">

            <h2>Difficulty Distribution</h2>

            <Bar
              data={difficultyData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />

          </div>

          <div className="chart-box">

            <h2>Topic Acceptance Rate Trend</h2>

            <Line
              data={acceptanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />

          </div>

        </div>

        <div className="bottom-grid">

          <div className="chart-box">

            <h2>Top Topics</h2>

            <Bar
              data={topicData}
              options={{
                indexAxis: "y",
                responsive: true
              }}
            />

          </div>

          <div className="chart-box">

            <h2>Top Companies</h2>

            <Pie
              data={companyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 18,
                      boxHeight: 18,
                      padding: 20,
                      font: {
                        size: 15
                      }
                    }
                  }
                }
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;