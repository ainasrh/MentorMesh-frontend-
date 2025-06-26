import React from "react";
import { Outlet } from "react-router-dom";
import { TrainerSideBar } from "./TrainerSideBar";

export function TrainerLayout() {
  return (
    <div className="flex min-h-screen">
      <TrainerSideBar />
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
