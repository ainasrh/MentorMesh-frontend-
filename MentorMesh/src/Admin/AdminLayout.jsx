import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSideBar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
