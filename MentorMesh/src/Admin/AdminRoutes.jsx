import { Route } from "react-router-dom";
import { AllUsers } from "./AllUsers";
import { AdminLayout } from "./AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { AllCourses } from "./allCourses";

const AdminRoutes = (
  <Route path="/admin/" element={<AdminLayout />}>
    <Route path="" element={<AdminDashboard />} />
    <Route path="users/" element={<AllUsers />} />
    <Route path="courses/" element={<AllCourses />} />

  </Route>
);

export default AdminRoutes;
