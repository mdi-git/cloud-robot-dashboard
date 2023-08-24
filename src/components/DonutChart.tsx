import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

interface DonutChartProps {
  data: any[]; // The data format will depend on your chart data
}

const COLORS = ["#fe1c00", "#0088FE"];

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const [propData, setPropData] = useState(data);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setPropData(data);
  }, [data]);
  return (
    <>
      {isClient && (
        <ResponsiveContainer width="100%" height={230} minWidth={200}>
          <PieChart>
            <Pie
              data={propData}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="80%"
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default DonutChart;
