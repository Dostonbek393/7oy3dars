import style from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div>
        <img src="/logo-large.svg" alt="logo" className={style.logo} />
        <ul className={style.menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${style.item} ${style.active}` : style.item
              }
            >
              <img src="/icon-nav-overview.svg" alt="Overview" />
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? `${style.item} ${style.active}` : style.item
              }
            >
              <img src="/icon-nav-transactions.svg" alt="Transactions" />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budgets"
              className={({ isActive }) =>
                isActive ? `${style.item} ${style.active}` : style.item
              }
            >
              <img src="/icon-nav-budgets.svg" alt="Budgets" />
              <span>Budgets</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? `${style.item} ${style.active}` : style.item
              }
            >
              <img src="/icon-nav-pots.svg" alt="Pots" />
              <span>Pots</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recurringBills"
              className={({ isActive }) =>
                isActive ? `${style.item} ${style.active}` : style.item
              }
            >
              <img src="/icon-nav-recurring-bills.svg" alt="Recurring Bills" />
              <span>Recurring Bills</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.register}>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${style.item} ${style.active}` : style.item
            }
          >
            <img src="/icon-minimize-menu.svg" alt="Minimeze Menu" />
            <span>Minimize Menu</span>
          </NavLink>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
