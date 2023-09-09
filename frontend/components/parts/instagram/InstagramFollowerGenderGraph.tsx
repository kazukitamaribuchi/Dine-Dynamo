import { name } from "postcss";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";

// 男女比率
const gender_ratio = [
  { name: "male", value: 13000 },
  { name: "female", value: 7000 },
  { name: "other", value: 400 }
];

// 男女比率の詳細
const gender_ratio_detail = [
  { name: "M.18-24", value: 2000 },
  { name: "M.25-34", value: 8000 },
  { name: "M.35-44", value: 1500 },
  { name: "M.45-54", value: 1500 },
  { name: "F.18-24", value: 3000 },
  { name: "F.25-34", value: 3000 },
  { name: "F.55-64", value: 1000 },
  { name: "U.13-17", value: 200 },
  { name: "U.18-24", value: 200 }
];

// const MALE_COLOR = "#44bfff";
const MALE_COLOR = "#8884d8";
// const FEMALE_COLOR = "#ffbbff";
const FEMALE_COLOR = "#82ca9d";
const OTHER_COLOR = "#00ff7f";

const COLORS = [MALE_COLOR, FEMALE_COLOR, OTHER_COLOR];
const GENDER_COLORS = {
  M: MALE_COLOR,
  F: FEMALE_COLOR,
  U: OTHER_COLOR
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  fill,
  innerRadius,
  outerRadius,
  name,
  percent
}) => {
  const radius = 15 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // const dispValue = `${name}: ${(percent * 100).toFixed(0)}%`;
  const dispValue = `${name}`;

  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
  const y2 = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} />
      <text
        x={x}
        y={y}
        fill={GENDER_COLORS[name.charAt(0)]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={13}
      >
        {dispValue}
      </text>
    </>
  );
};

export const InstagramFollowerGenderGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={gender_ratio}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {gender_ratio.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          data={gender_ratio_detail}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          // label={({ name, percent }) =>
          //   `${name} ${(percent * 100).toFixed(2)}%`
          // }
          labelLine={false}
          label={CustomLabel}
        >
          {gender_ratio_detail.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={GENDER_COLORS[entry.name.charAt(0)]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
