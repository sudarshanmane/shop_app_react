import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="flex justify-between gap-3 h-14 bg-orange-200 items-center px-3 font-semibold">
        <div>Product Manager</div>
        <div></div>
        <div></div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
