import { useCollectionsData } from "../../hooks/useCollectionsData";
import { useState } from "react";
import AddBudgetModal from "../../components/modal/AddBudgetModal";
import style from "./Budgets.module.scss";

function Budgets() {
  const { data, isPending, mutate } = useCollectionsData();
  const [showModal, setShowModal] = useState(false);
  console.log(data);

  const handleAddBudget = (newBudget) => {
    console.log("New budget:", newBudget);
    mutate({
      ...data,
      budgets: [...data.budgets, { ...newBudget, id: Date.now() }],
    });
  };

  if (isPending || !data || !data.transactions || !data.budgets) {
    return <div>Loading...</div>;
  }

  const { transactions, budgets } = data;

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
      <div className={style.budgets__title}>
        <h2 className={style.budgets__text}>Budgets</h2>
        <button
          className={style.budgets__buttonAdd}
          onClick={() => setShowModal(true)}
        >
          + Add New Budgets
        </button>
      </div>

      {showModal && (
        <AddBudgetModal
          onClose={() => setShowModal(false)}
          onAddBudget={handleAddBudget}
        />
      )}

      <div className={style.budgets__Cart}>
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
            {budgets.map((b) => {
              const spentInCategory = transactions
                .filter((t) => t.category === b.category)
                .reduce((catSum, t) => catSum + Math.abs(t.amount), 0);

              return (
                <div key={b.id} className={style.budgets__item}>
                  <div className={style.budgets__itemss}>
                    <span
                      className={style.budgets__color}
                      style={{ backgroundColor: b.theme }}
                    ></span>
                    <span className={style.budgets__category}>
                      {b.category}
                    </span>
                  </div>
                  <div className={style.budgets__items}>
                    <span className={style.budgets__total}>
                      ${spentInCategory.toFixed(2)} of ${b.maximum.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          {budgets.map((b) => {
            const spentInCategory = transactions
              .filter((t) => t.category === b.category)
              .reduce((catSum, t) => catSum + Math.abs(t.amount), 0);

            const remaining = b.maximum - spentInCategory;
            const percentage = (spentInCategory / b.maximum) * 100;

            return (
              <div key={b.id} className={style.budgets__carts}>
                <div className={style.budgets__Image}>
                  <div className={style.budgets__List}>
                    <span
                      className={style.budgets__Theme}
                      style={{ backgroundColor: b.theme }}
                    ></span>
                    <h3 className={style.budgets__Name}>{b.category}</h3>
                  </div>
                  <img src="/icon-ellipsis.svg" alt={b.name} />
                </div>
                <p className={style.budgets__Text}>Maximum of ${b.maximum}</p>
                <div className={style.budgets__progress}>
                  <div
                    className={style.budgets__progressBar}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: b.theme,
                    }}
                  ></div>
                </div>
                <div>
                  <div className={style.budgets__amounts}>
                    <div className={style.budgets__spent}>
                      <span
                        className={style.budgets__colors}
                        style={{
                          backgroundColor: b.theme,
                        }}
                      ></span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "7px",
                          flexDirection: "column",
                        }}
                      >
                        <span>Spent</span>
                        <strong>${spentInCategory.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div className={style.budgets__remaining}>
                      <span className={style.budgets__colorss}></span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "7px",
                          flexDirection: "column",
                        }}
                      >
                        <span>Remaining</span>
                        <strong>${remaining.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.budgets__transaction}>
                  <div className={style.budgets__Title}>
                    <h2 className={style.budgets__Texts}>Latest Spending</h2>
                    <span className={style.budgets__Link}>
                      View All
                      <img
                        src="/icon-caret-right.svg"
                        alt="caret"
                        className={style.budgets__Icon}
                      />
                    </span>
                  </div>
                  {transactions
                    .filter((t) => t.category === b.category && t.amount < 0)
                    .map((t) => {
                      const formattedDate = new Date(t.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      );

                      return (
                        <div key={t.id}>
                          <div className={style.budgets__Titles}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                              }}
                            >
                              <img
                                src={t.avatar}
                                alt={t.name}
                                className={style.budgets__avatar}
                              />
                              <h3 className={style.budgets__names}>{t.name}</h3>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "end",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span className={style.budgets__date}>
                                -${Math.abs(t.amount).toFixed(2)}
                              </span>
                              <span className={style.budgets__date}>
                                {formattedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Budgets;
