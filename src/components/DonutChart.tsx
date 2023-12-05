import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
} from "recharts";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import RadialSeparators from "./RadialSeparators";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";

interface DonutChartProps {
  data: any[]; // The data format will depend on your chart data
}

const COLORS = ["#FFFF00", "#0088FE"];

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const [propData, setPropData] = useState(data);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setPropData(data);
  }, [data]);

  const circleSize = 150;

  return (
    <>
      {isClient && (
        <ResponsiveContainer width="100%" height={130} maxHeight={130} style={{maxWidth: 130, margin: '15px auto'}} >
          {/* <PieChart>
            <Pie
              data={propData}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="80%"
              fill="#8884d8"
            >
              <Label
                value={data[1].value}
                position="center"
                className="label-top"
                fontSize="27px"
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
              </PieChart> */}
          <CircularProgressbarWithChildren
            value={propData[1].value}
            text={`${propData[1].value}%`}
            strokeWidth={10}
            styles={buildStyles({
              strokeLinecap: "butt",
              textColor: "#eee",
              pathColor: "yellow",
              trailColor: "rgb(55, 48, 163)"
            })}
          >
            <RadialSeparators
              count={12}
              style={{
                background: "rgb(15 23 42)",
                width: "4px",
                // This needs to be equal to props.strokeWidth
                height: `${10}%`,
              }}
            />
          </CircularProgressbarWithChildren>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default DonutChart;
