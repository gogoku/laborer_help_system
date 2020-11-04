import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import format from "date-fns/format";

export default function HeartRateChart({ heartRateData }) {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <LineChart
          data={heartRateData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            scale="time"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={(tickItem) => format(tickItem, "hh:mm aaaa")}
          />
          <Tooltip
            labelFormatter={(value, name, props) =>
              `Time : ${format(value, "hh:mm aaaa")}`
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            name="Heart Rate"
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
