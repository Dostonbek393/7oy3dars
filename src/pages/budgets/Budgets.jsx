import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./Budgets.module.scss";

function Budgets() {
  const { data, isPending } = useCollectionsData();
  console.log(data);

  if (
    isPending ||
    !data ||
    !data.balance ||
    !data.transactions ||
    !data.pots ||
    !data.budgets
  ) {
    return <div>Loading...</div>;
  }

  const { balance, transactions, pots, budgets } = data;

  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);

  const totalSpent = budgets.reduce((sum, b) => {
    const spentInCategory = transactions
      .filter((t) => t.category === b.category)
      .reduce((catSum, t) => catSum + Math.abs(t.amount), 0);
    return sum + spentInCategory;
  }, 0);

  const budgetsWithChartData = budgets.map((budget, index) => {
    const offset = budgets
      .slice(0, index)
      .reduce((sum, b) => sum + (b.maximum / totalBudgetLimit) * 100, 0);
    const dash = (budget.maximum / totalBudgetLimit) * 100;
    return { ...budget, offset, dash };
  });

  return (
    <div className={style.budgets}>
      <h2 className={style.budgets__text}>Budgets</h2>
      <div className={style.budgets__cart}>
        <div className={style.budgets__chart}>
          <svg width="24.7rem" height="24.9rem" viewBox="0 0.5 37 36">
            {budgetsWithChartData.map((budget) => {
              return (
                <circle
                  key={budget.id}
                  className={style.budgets__segment}
                  r="15.9155"
                  cx="18"
                  cy="18"
                  fill="transparent"
                  stroke={budget.theme}
                  strokeWidth="5"
                  strokeDasharray={`${budget.dash} ${100 - budget.dash}`}
                  strokeDashoffset={25 - budget.offset}
                  transform="rotate(-90 18 18)"
                />
              );
            })}

            <text
              x="18"
              y="17"
              textAnchor="middle"
              className={style.budgets__textTop}
            >
              ${totalSpent.toFixed(0)}
            </text>
            <text
              x="18"
              y="21"
              textAnchor="middle"
              className={style.budgets__textBottom}
            >
              of ${totalBudgetLimit.toFixed(0)} limit
            </text>
          </svg>
        </div>

        <div className={style.budgets__list}>
          <h2 className={style.budgets__title}>Spending Summary</h2>
          {budgets.map((b) => (
            <div key={b.id} className={style.budgets__item}>
              <div className={style.budgets__itemss}>
                <span
                  className={style.budgets__color}
                  style={{ backgroundColor: b.theme }}
                ></span>
                <span className={style.budgets__category}>{b.category}</span>
              </div>
              <div className={style.budgets__items}>
                <span className={style.budgets__total}>
                  ${totalSpent.toFixed(2)} of ${b.maximum.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budgets;
