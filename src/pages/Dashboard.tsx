
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProgressDashboard from "@/components/ProgressDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Routes, Route } from "react-router-dom";
import DailyCheckin from "@/components/DailyCheckin";
import MindfulnessTracker from "@/components/MindfulnessTracker";
import HealthSummary from "@/components/HealthSummary";
import MoodChart from "@/components/MoodChart";
import AddictionTracker from "@/components/AddictionTracker";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="progress" element={<ProgressDashboard />} />
              <Route path="daily-checkin" element={
                <div className="container mx-auto p-6">
                  <h2 className="text-2xl font-bold mb-6">Daily Check-In Dashboard</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <DailyCheckin />
                    <MoodChart />
                  </div>
                </div>
              } />
              <Route path="addiction" element={
                <div className="container mx-auto p-6">
                  <div className="max-w-[1600px] mx-auto">
                    <h2 className="text-3xl font-bold mb-2">Recovery Dashboard</h2>
                    <p className="text-muted-foreground mb-6">
                      Track your progress, celebrate milestones, and stay committed to your recovery journey
                    </p>
                    <AddictionTracker />
                  </div>
                </div>
              } />
              <Route path="stats" element={
                <div className="container mx-auto p-6">
                  <h2 className="text-2xl font-bold mb-6">Health Statistics Dashboard</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <HealthSummary />
                    <MindfulnessTracker />
                  </div>
                </div>
              } />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
