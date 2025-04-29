import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./Transactions.module.scss";

function Transactions() {
  const { data, isPending } = useCollectionsData();
  console.log(data);

  if (isPending || !data || !data.transactions) {
    return <div>Loading...</div>;
  }

  const { transactions } = data;

  return (
    <div className={style.transactions}>
      <h2 className={style.transactions__text}>Transactions</h2>
      <div className={style.transactions__cart}>
        <div className={style.transactions__input}>
          <input
            type="text"
            class={style.transactions__searchInput}
            placeholder="Search transaction"
          />
          <div className={style.transactions__discription}>
            <div className={style.transactions__discription1}>
              <h3
                style={{ fontSize: "14px", fontWeight: 400, color: "#696868" }}
              >
                Sort by
              </h3>
              <div class={style.transactions__dropdown}>
                <button class={style.transactions__dropbtn}>Latest</button>
                <div class={style.transactions__dropdowncontent}>
                  <a href="#">Oldest</a>
                  <a href="#">A to Z</a>
                  <a href="#">Z to A</a>
                  <a href="#">Highest</a>
                  <a href="#">Lowest</a>
                </div>
              </div>
            </div>
            <div className={style.transactions__discription2}>
              <h3
                style={{ fontSize: "14px", fontWeight: 400, color: "#696868" }}
              >
                Category
              </h3>
              <div class={style.transactions__dropdown}>
                <button class={style.transactions__dropbtn1}>
                  All Transactions
                </button>
                <div class={style.transactions__dropdowncontent1}>
                  <a href="#">Entertainment</a>
                  <a href="#">Bills</a>
                  <a href="#">Groceries</a>
                  <a href="#">Dining Out</a>
                  <a href="#">Transportation</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.transactions__texts}>
          <h3 className={style.transactions__textss}>Recipient / Sender</h3>
          <div className={style.transactions__title}>
            <p className={style.transactions__textss}>Category</p>
            <p className={style.transactions__textss}>Transaction Date</p>
          </div>
          <h3 className={style.transactions__textss}>Amount</h3>
        </div>

        {transactions.map((t) => {
          const formattedDate = new Date(t.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div key={t.id} className={style.transactions__transaction}>
              <div className={style.transactions__image}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={style.transactions__avatar}
                />
                <strong className={style.transactions__name}>{t.name}</strong>
              </div>
              <div className={style.transactions__time}>
                <small className={style.transactions__category}>
                  {t.category}
                </small>
                <small className={style.transactions__date}>
                  {formattedDate}
                </small>
              </div>
              <h3
                className={`${style.transactions__amount} ${
                  t.amount >= 0 ? style.positiveAmount : style.negativeAmount
                }`}
              >
                {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transactions;
