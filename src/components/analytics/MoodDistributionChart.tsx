
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#6b7280'];

interface MoodTrends {
  great: number;
  good: number;
  okay: number;
  difficult: number;
  struggling: number;
}

interface MoodDistributionChartProps {
  moodTrends: MoodTrends;
}

export const MoodDistributionChart = ({ moodTrends }: MoodDistributionChartProps) => {
  const moodTrendsData = Object.entries(moodTrends).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Mood Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={moodTrendsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {moodTrendsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
