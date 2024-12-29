import React, { useEffect, useState } from "react";
import axios from "axios";

function Statistics({ month }) {
  const [stats, setStats] = useState({ totalSale: 0, soldItems: 0, unsoldItems: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/statistics", { params: { month } }).then((response)=>{
        setStats(response.data);
    }).catch((error)=>{console.log(error)})
  }, [month]);
  
  return (
    <div>
      <h2 className="stat-heading">Statistics</h2>
      <div className="d-flex justify-content-between">
        <p><b>Total Sale Amount</b>: ${stats.totalSale}</p>
        <p><b>Total Sold Items</b>: {stats.soldItems}</p>
        <p><b>Total Unsold Items</b>: {stats.unsoldItems}</p>
      </div>
    </div>
  );
}

export default Statistics;
