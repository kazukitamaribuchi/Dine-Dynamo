import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

export const InstagramFollowerGraph = () => {
  const data = [
    { name: "2023/08/01", follower: 1000 },
    { name: "2023/08/02", follower: 1010 },
    { name: "2023/08/03", follower: 1600 },
    { name: "2023/08/04", follower: 1700 },
    { name: "2023/08/05", follower: 2800 },
    { name: "2023/08/06", follower: 2900 },
    { name: "2023/08/07", follower: 3000 },
    { name: "2023/08/08", follower: 3100 },
    { name: "2023/08/09", follower: 3200 },
    { name: "2023/08/10", follower: 3300 },
    { name: "2023/08/11", follower: 3300 },
    { name: "2023/08/12", follower: 3340 },
    { name: "2023/08/13", follower: 3350 },
    { name: "2023/08/14", follower: 3700 },
    { name: "2023/08/15", follower: 3800 },
    { name: "2023/08/16", follower: 3800 },
    { name: "2023/08/17", follower: 3810 },
    { name: "2023/08/18", follower: 3813 },
    { name: "2023/08/19", follower: 3990 },
    { name: "2023/08/20", follower: 4300 },
    { name: "2023/08/21", follower: 4300 },
    { name: "2023/08/22", follower: 4600 },
    { name: "2023/08/23", follower: 4600 },
    { name: "2023/08/24", follower: 4700 },
    { name: "2023/08/25", follower: 4800 },
    { name: "2023/08/26", follower: 4900 },
    { name: "2023/08/27", follower: 5000 },
    { name: "2023/08/28", follower: 6100 },
    { name: "2023/08/29", follower: 10200 },
    { name: "2023/08/30", follower: 12300 },
    { name: "2023/08/31", follower: 20400 }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <defs>
          <linearGradient
            id="gradationColor"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="follower"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#gradationColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
