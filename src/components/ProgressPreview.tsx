
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressPreview = () => {
  return (
    <Card className="p-6 glass-card fade-in">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Daily Check-in</span>
            <span className="text-sm text-primary">7/7 days</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Mindful Minutes</span>
            <span className="text-sm text-primary">45/60 min</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </div>
    </Card>
  );
};

export default ProgressPreview;
