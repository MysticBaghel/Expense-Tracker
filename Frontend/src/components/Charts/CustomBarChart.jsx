import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Purple + light purple
const getBarColor = (index) => (index % 2 === 0 ? "#875CF5" : "#E9D5FF");

const CustomBarChart = ({ data }) => { 

    const chartData = Array.isArray(data) ? data : [];
  // make sure dates are safe
  const formattedData = chartData.map((item, idx) => {
    const d = new Date(item.date || item.day);
    return {
      ...item,
      day: !isNaN(d)
        ? d.toLocaleDateString("en-US", { day: "numeric", month: "short" })
        : item.day || `Day ${idx + 1}`,
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { day, categories = [], amount } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-700 mb-1">{day}</p>
          {categories.map((cat, i) => (
            <p key={i} className="text-sm text-gray-600">
              {cat.category}:{" "}
              <span className="text-sm font-medium text-gray-900">
                ₹{cat.amount.toLocaleString("en-IN")}
              </span>
            </p>
          ))}
          <p className="mt-1 text-xs font-bold text-gray-800">
            Total: ₹{amount?.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 flex-1">
      <ResponsiveContainer width = "100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;