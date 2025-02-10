
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

export const MilestoneProgressChart = ({ milestoneCounts }: MilestoneProgressChartProps) => {
  const milestoneData = Object.entries(milestoneCounts).map(([period, count]) => ({
    name: period.charAt(0).toUpperCase() + period.slice(1),
    count,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Milestone Progress</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={milestoneData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
