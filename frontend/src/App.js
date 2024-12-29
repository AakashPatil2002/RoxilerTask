import React, { useEffect, useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import axios from "axios";

function App() {
  const [month, setMonth] = useState("01");
  const [isInserted, setIsInserted] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/initialize")
      .then((success) => {
        setIsInserted(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      {isInserted ? (
        <>
          <h1 className="heading">Transactions Dashboard</h1>
          <main className="main">
            <div className="container">
              <div className="row py-5">
                <div className="col-md-6 mb-4">
                  <label>Select Month: </label>
                  <select
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {[
                      "01",
                      "02",
                      "03",
                      "04",
                      "05",
                      "06",
                      "07",
                      "08",
                      "09",
                      "10",
                      "11",
                      "12",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {new Date(0, m - 1).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-4">
                  <Statistics month={month} />
                </div>
                <div className="col-md-6 mb-4">
                  <BarChart month={month} />
                </div>
                <div className="col-md-6 mb-4">
                  <PieChart month={month} />
                </div>
                <div className="col-12">
                  <TransactionsTable month={month} />
                </div>
              </div>
            </div>
          </main>
        </>
      ) : <div className="loading">Wait Data is Loading...!</div>}
    </div>
  );
}

export default App;
