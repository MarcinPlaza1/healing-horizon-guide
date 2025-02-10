
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { dashboardRoutes } from "@/routes/dashboardRoutes";

const DashboardPage = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default DashboardPage;

