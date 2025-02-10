
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navigation />
          <main className="pt-16">
            <Dashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
