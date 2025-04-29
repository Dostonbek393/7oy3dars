import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./Overview.module.scss";

function Overview() {
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

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);

  const totalSpent = budgets.reduce((sum, b) => {
    const spentInCategory = transactions
      .filter((t) => t.category === b.category)
      .reduce((catSum, t) => catSum + Math.abs(t.amount), 0);

    return sum + spentInCategory;
  }, 0);

  return (
    <div className={style.overview}>
      <h2 className={style.overview__text}>Overview</h2>
      <div className={style.cards}>
        <div className={`${style.card} ${style.balance}`}>
          <small className={style.overview__texts}>Current Balance</small>
          <h3 className={style.overview__title}>
            ${balance.current.toFixed(2)}
          </h3>
        </div>
        <div className={style.card}>
          <small className={style.overview__texts}>Income</small>
          <h3 className={style.overview__title}>${income.toFixed(2)}</h3>
        </div>
        <div className={style.card}>
          <small className={style.overview__texts}>Expenses</small>
          <h3 className={style.overview__title}>${expenses.toFixed(2)}</h3>
        </div>
      </div>

      <div className={style.rowSection}>
        <div>
          <div className={style.pots}>
            <div className={style.potsHeader}>
              <h3 className={style.pots__text}>Pots</h3>
              <span className={style.pots__link}>
                See Details
                <img
                  src="/icon-caret-right.svg"
                  alt="caret"
                  className={style.pots__icon}
                />
              </span>
            </div>

            <div className={style.potsContent}>
              <div className={style.totalSaved}>
                <div className={style.icon}>
                  <img src="/icon-pot.svg" alt="pot icon" />
                </div>
                <div>
                  <small className={style.pots__total}>Total Saved</small>
                  <h3 className={style.pots__totals}>${totalSaved}</h3>
                </div>
              </div>

              <div className={style.potItems}>
                {pots.slice(0, 4).map((pot) => (
                  <div key={pot.id} className={style.potItem}>
                    <span
                      className={style.colorBar}
                      style={{ backgroundColor: pot.theme }}
                    ></span>
                    <div>
                      <small className={style.pots__name}>{pot.name}</small>
                      <strong className={style.pots__totals}>
                        ${pot.total}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.transactions}>
            <div className={style.transactionCard}>
              <div className={style.transaction__title}>
                <h2 className={style.transaction__text}>Transactions</h2>
                <span className={style.transaction__link}>
                  View All
                  <img
                    src="/icon-caret-right.svg"
                    alt="caret"
                    className={style.transaction__icon}
                  />
                </span>
              </div>

              {transactions.slice(0, 5).map((t) => {
                const formattedDate = new Date(t.date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <div key={t.id} className={style.transactionRow}>
                    <div className={style.transaction__info}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className={style.transaction__avatar}
                      />
                      <strong className={style.transaction__name}>
                        {t.name}
                      </strong>
                    </div>
                    <div className={style.transaction__infos}>
                      <h3
                        className={`${style.transaction__amount} ${
                          t.amount >= 0
                            ? style.positiveAmount
                            : style.negativeAmount
                        }`}
                      >
                        {t.amount < 0 ? "-" : "+"}$
                        {Math.abs(t.amount).toFixed(2)}
                      </h3>
                      <small className={style.transaction__date}>
                        {formattedDate}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className={style.budgets}>
            <div className={style.budgetsHeader}>
              <h3 className={style.budgets__text}>Budgets</h3>
              <span className={style.budgets__link}>
                See Details
                <img
                  src="/icon-caret-right.svg"
                  alt="caret"
                  className={style.budgets__icon}
                />
              </span>
            </div>

            <div className={style.budgets__icons}>
              <div className={style.budgetChart}>
                <svg
                  width="24.7rem"
                  height="24.9rem"
                  viewBox="0 0.5 37 36"
                  className={style.donutChart}
                >
                  {budgets.map((budget, index) => {
                    const totalLimit = budgets.reduce(
                      (sum, b) => sum + b.maximum,
                      0
                    );
                    const offset = budgets
                      .slice(0, index)
                      .reduce(
                        (sum, b) => sum + (b.maximum / totalLimit) * 100,
                        0
                      );
                    const dash = (budget.maximum / totalLimit) * 100;

                    return (
                      <circle
                        key={budget.id}
                        className={style.donutSegment}
                        r="15.9155"
                        cx="18"
                        cy="18"
                        fill="transparent"
                        stroke={budget.theme}
                        strokeWidth="5"
                        strokeDasharray={`${dash} ${100 - dash}`}
                        strokeDashoffset={25 - offset}
                        transform="rotate(-90 18 18)"
                      />
                    );
                  })}
                  <text
                    x="18"
                    y="17"
                    textAnchor="middle"
                    className={style.donutTextTop}
                  >
                    ${totalSpent.toFixed(0)}
                  </text>
                  <text
                    x="18"
                    y="21"
                    textAnchor="middle"
                    className={style.donutTextBottom}
                  >
                    of ${totalBudgetLimit.toFixed(0)} limit
                  </text>
                </svg>
              </div>

              <div className={style.budgetList}>
                {budgets.map((b) => (
                  <div key={b.id} className={style.budgetItem}>
                    <span
                      className={style.budgetColor}
                      style={{ backgroundColor: b.theme }}
                    ></span>
                    <div className={style.budgetItems}>
                      <span className={style.budget__texts}>{b.category}</span>
                      <span className={style.budget__total}>
                        ${b.maximum.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.bills}>
            <div className={style.bills__details}>
              <h2 className={style.bills__text}>Recurring Bills</h2>
              <span className={style.budgets__link}>
                See Details
                <img
                  src="/icon-caret-right.svg"
                  alt="caret"
                  className={style.budgets__icon}
                />
              </span>
            </div>

            <div className={style.bills__cards}>
              <div
                className={style.bills__card}
                style={{ borderLeft: "4px solid #16a34a" }}
              >
                <div className={style.bills__info}>
                  <span className={style.bills__label}>Paid Bills</span>
                  <span className={style.bills__amount}>$190.00</span>
                </div>
              </div>
              <div
                className={style.bills__card}
                style={{ borderLeft: "4px solid #fb923c" }}
              >
                <div className={style.bills__info}>
                  <span className={style.bills__label}>Total Upcoming</span>
                  <span className={style.bills__amount}>$194.98</span>
                </div>
              </div>
              <div
                className={style.bills__card}
                style={{ borderLeft: "4px solid #06b6d4" }}
              >
                <div className={style.bills__info}>
                  <span className={style.bills__label}>Due Soon</span>
                  <span className={style.bills__amount}>$59.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
