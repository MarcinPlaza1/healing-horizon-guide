
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProgressDashboard from "@/components/ProgressDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Routes, Route } from "react-router-dom";

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
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
