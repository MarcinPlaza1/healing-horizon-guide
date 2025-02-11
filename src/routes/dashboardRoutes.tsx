
import DailyCheckin from "@/components/DailyCheckin";
import MoodChart from "@/components/MoodChart";
import AddictionTracker from "@/components/AddictionTracker";
import Dashboard from "@/components/Dashboard";
import CalendarDashboard from "@/components/CalendarDashboard";
import { NutritionTracking } from "@/components/nutrition/NutritionTracking";

export const dashboardRoutes = [
  {
    path: "calendar",
    element: <CalendarDashboard />
  },
  {
    path: "nutrition",
    element: (
      <div className="container mx-auto p-6">
        <div className="max-w-[1800px] mx-auto">
          <h2 className="text-3xl font-bold mb-2">Nutrition Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Track your daily nutrition, water intake, and maintain healthy eating habits
          </p>
          <NutritionTracking />
        </div>
      </div>
    )
  },
  {
    path: "daily-checkin",
    element: (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Daily Check-In Dashboard</h2>
        <div className="grid grid-cols-1 gap-6">
          <DailyCheckin />
          <MoodChart />
        </div>
      </div>
    )
  },
  {
    path: "addiction",
    element: (
      <div className="container mx-auto p-6">
        <div className="max-w-[1800px] mx-auto">
          <h2 className="text-3xl font-bold mb-2">Recovery Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Track your progress, celebrate milestones, and stay committed to your recovery journey
          </p>
          <AddictionTracker />
        </div>
      </div>
    )
  },
  {
    path: "*",
    element: <Dashboard />
  }
];
