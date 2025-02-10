
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ProgressDashboard from "@/components/ProgressDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const isProgressRoute = location.pathname === "/dashboard/progress";

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navigation />
          <main className="pt-16">
            {isProgressRoute ? <ProgressDashboard /> : <Dashboard />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
