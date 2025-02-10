
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = {
  great: '#22c55e',   // Green
  good: '#3b82f6',    // Blue
  okay: '#f59e0b',    // Yellow
  difficult: '#ef4444', // Red
  struggling: '#6b7280' // Gray
};

const MOOD_LABELS = {
  great: "Great",
  good: "Good",
  okay: "Okay",
  difficult: "Difficult",
  struggling: "Struggling"
};

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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];
    return (
      <div className="bg-background/95 p-2 shadow rounded border">
        <p className="font-medium">{MOOD_LABELS[name as keyof MoodTrends]}</p>
        <p className="text-sm text-muted-foreground">Count: {value}</p>
        <p className="text-sm text-muted-foreground">
          {(percent * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export const MoodDistributionChart = ({ moodTrends }: MoodDistributionChartProps) => {
  const moodTrendsData = Object.entries(moodTrends).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  const total = Object.values(moodTrends).reduce((acc, curr) => acc + curr, 0);

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Weekly Mood Distribution</h3>
        <p className="text-sm text-muted-foreground">
          Based on {total} mood entries this week
        </p>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={moodTrendsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {moodTrendsData.map((entry) => (
                <Cell 
                  key={entry.name} 
                  fill={COLORS[entry.name as keyof typeof COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => MOOD_LABELS[value as keyof MoodTrends]}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
