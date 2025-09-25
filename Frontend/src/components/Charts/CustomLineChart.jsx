import React from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data }) => { 

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
    <div className="bg-white mt-6" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#555" }} stroke="#ccc" interval={0} padding={{ left: 20, right: 20 }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
