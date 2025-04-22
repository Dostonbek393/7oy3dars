import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./Overview.module.scss";

function Overview() {
  const { data, isPending } = useCollectionsData();
  console.log(data);

  if (isPending || !data || !data.balance || !data.transactions || !data.pots) {
    return <div>Loading...</div>;
  }

  const { balance, transactions, pots } = data;

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

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
                  <strong className={style.pots__totals}>${pot.total}</strong>
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

          {transactions.map((t) => {
            const formattedDate = new Date(t.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div key={t.id} className={style.transactionRow}>
                <div className={style.transaction__info}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className={style.transaction__avatar}
                  />
                  <strong className={style.transaction__name}>{t.name}</strong>
                </div>
                <div className={style.transaction__infos}>
                  <h3
                    className={`${style.transaction__amount} ${
                      t.amount >= 0
                        ? style.positiveAmount
                        : style.negativeAmount
                    }`}
                  >
                    {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
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
  );
}

export default Overview;
