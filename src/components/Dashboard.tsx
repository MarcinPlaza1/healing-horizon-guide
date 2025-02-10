
import DailyInspiration from "@/components/DailyInspiration";
import ProgressPreview from "@/components/ProgressPreview";
import DailyCheckin from "@/components/DailyCheckin";

const Dashboard = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DailyCheckin />
          <div className="space-y-8">
            <DailyInspiration />
            <ProgressPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
