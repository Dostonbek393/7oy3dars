import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import UserCard from "../components/usercard/UserCard";
import { useState } from "react";

function MainLayout() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div id="root" className={isMinimized ? "collapsed" : ""}>
      <Sidebar isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
      <main>
        <Outlet />
      </main>
      <UserCard />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default MainLayout;
