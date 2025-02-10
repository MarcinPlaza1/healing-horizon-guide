
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";

interface MilestoneCounts {
  weekly: number;
  monthly: number;
  quarterly: number;
  yearly: number;
}

interface MilestoneProgressChartProps {
  milestoneCounts: MilestoneCounts;
}

const MILESTONE_LABELS = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly"
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 p-2 shadow rounded border">
        <p className="font-medium">{MILESTONE_LABELS[label as keyof MilestoneCounts]}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value} milestones reached
        </p>
      </div>
    );
  }
  return null;
};

export const MilestoneProgressChart = ({ milestoneCounts }: MilestoneProgressChartProps) => {
  const milestoneData = Object.entries(milestoneCounts).map(([period, count]) => ({
    name: period,
    count,
  }));

  const total = Object.values(milestoneCounts).reduce((acc, curr) => acc + curr, 0);

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Milestone Progress</h3>
        <p className="text-sm text-muted-foreground">
          {total} total milestones achieved
        </p>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={milestoneData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="name" 
              tickFormatter={(value) => MILESTONE_LABELS[value as keyof MilestoneCounts]}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
