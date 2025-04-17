import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import style from "./MainLayout.module.scss";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
