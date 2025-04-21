import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {
  Budgets,
  Login,
  Overview,
  Posts,
  RecurringBills,
  Register,
  Transactions,
} from "./pages";

import { ProtectedRoutes } from "./components";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "budgets",
          element: <Budgets />,
        },
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "recurringBills",
          element: <RecurringBills />,
        },
        {
          path: "transactions",
          element: <Transactions />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
