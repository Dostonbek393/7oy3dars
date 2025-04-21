import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import UserCard from "../components/usercard/UserCard";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <UserCard />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default MainLayout;
