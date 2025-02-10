import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProgressDashboard from "@/components/ProgressDashboard";
import WellnessSection from "@/components/WellnessSection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Routes, Route } from "react-router-dom";
import DailyCheckin from "@/components/DailyCheckin";
import MindfulnessTracker from "@/components/MindfulnessTracker";
import HealthSummary from "@/components/HealthSummary";
import MoodChart from "@/components/MoodChart";

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
              <Route path="wellness" element={
                <div className="container mx-auto p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Wellness Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DailyCheckin />
                    <MindfulnessTracker />
                    <HealthSummary />
                    <MoodChart />
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
