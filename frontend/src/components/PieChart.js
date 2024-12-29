import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import axios from "axios";

function CustomPieChart({ month }) {
  const [data, setData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

  useEffect(() => {
    axios.get("http://localhost:5000/api/pie-chart", { params: { month } }).then((response)=>{
        const formattedData = Object.entries(response.data).map(([category, count]) => ({
          name: category,
          value: count,
        }));
        setData(formattedData);
    }).catch((error)=>{console.log(error)});
  }, [month]);

  return (
    <div>
      <h2 className="stat-heading">Pie Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomPieChart;
