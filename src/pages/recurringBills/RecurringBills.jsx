import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./RecurringBills.module.scss";

function RecurringBills() {
  const { data, isPending } = useCollectionsData();
  console.log(data);

  if (isPending || !data || !data.transactions) {
    return <div>Loading...</div>;
  }

  const { transactions } = data;

  const recurringBills = transactions.filter(
    (transaction) => transaction.recurring && transaction.amount < 0
  );

  const totalBills = recurringBills.reduce(
    (sum, bill) => sum + Math.abs(bill.amount),
    0
  );
  const postedBills = recurringBills.slice(0, 4);
  const upcomingBills = recurringBills.slice(4);
  const dueSoonBills = upcomingBills.slice(0, 2);

  const postedAmount = postedBills.reduce(
    (sum, bill) => sum + Math.abs(bill.amount),
    0
  );
  const upcomingAmount = upcomingBills.reduce(
    (sum, bill) => sum + Math.abs(bill.amount),
    0
  );
  const dueSoonAmount = dueSoonBills.reduce(
    (sum, bill) => sum + Math.abs(bill.amount),
    0
  );

  const billTitles = [...new Set(recurringBills.map((bill) => bill.name))];

  const billsByDate = recurringBills.reduce((acc, bill) => {
    const date = new Date(bill.date);
    const day = date.getDate();
    if (!acc[day]) acc[day] = [];
    acc[day].push(bill);
    return acc;
  }, {});

  return (
    <div className={style.recurringBills}>
      <h1 className={style.recurringBills__text}>RecurringBills</h1>

      <div className={style.recurringBills__cart}>
        <div className={style.recurringBills__section}>
          <div className={style.recurringBills__total}>
            <img src="./icon-recurring-bills.svg" alt="icon-bills" />
            <h2 className={style.recurringBills__textBills}>Total Bills</h2>
            <p className={style.recurringBills__totalAmount}>
              ${totalBills.toFixed(2)}
            </p>
          </div>

          <div className={style.recurringBills__summary}>
            <h3 className={style.recurringBills__textSummary}>Summary</h3>
            <ul>
              <li className={style.recurringBills__amount}>
                <strong className={style.recurringBills__strong}>
                  Posted Bills
                </strong>{" "}
                {postedBills.length} ($
                {postedAmount.toFixed(2)})
              </li>
              <li className={style.recurringBills__amount}>
                <strong className={style.recurringBills__strong}>
                  Total Upcoming
                </strong>{" "}
                {upcomingBills.length} ($
                {upcomingAmount.toFixed(2)})
              </li>
              <li
                className={style.recurringBills__amount}
                style={{ color: "red" }}
              >
                <strong className={style.recurringBills__strong}>
                  Due Soon
                </strong>{" "}
                {dueSoonBills.length} ($
                {dueSoonAmount.toFixed(2)})
              </li>
            </ul>
          </div>
        </div>

        <section className={style.recurringBills__sortSection}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              class={style.recurringBills__searchInput}
              placeholder="Search transaction"
            />
            <div className={style.recurringBills__discription1}>
              <h3
                style={{ fontSize: "14px", fontWeight: 400, color: "#696868" }}
              >
                Sort by
              </h3>
              <div class={style.recurringBills__dropdown}>
                <button class={style.recurringBills__dropbtn}>Latest</button>
                <div class={style.recurringBills__dropdowncontent}>
                  <a href="#">Oldest</a>
                  <a href="#">A to Z</a>
                  <a href="#">Z to A</a>
                  <a href="#">Highest</a>
                  <a href="#">Lowest</a>
                </div>
              </div>
            </div>
          </div>

          <div className={style.recurringBills__Text}>
            <span className={style.recurringBills__span}>Bill Title</span>
            <div className={style.recurringBills__title}>
              <span className={style.recurringBills__span}>Due Date</span>
              <span className={style.recurringBills__span}>Amount</span>
            </div>
          </div>
          {Object.entries(billsByDate).map(([day, bills]) => (
            <div key={day}>
              {bills.map((bill) => (
                <div key={bill.id} className={style.recurringBills__carts}>
                  <div className={style.recurringBills__image}>
                    <img
                      src={bill.avatar}
                      alt={bill.name}
                      className={style.recurringBills__avatar}
                    />
                    <span className={style.recurringBills__name}>
                      {bill.name}
                    </span>
                  </div>
                  <div className={style.recurringBills__img}>
                    <div className={style.recurringBills__Amounts}>
                      <h3 className={style.recurringBills__monthly}>
                        Monthly: {day}th
                      </h3>
                      <img src="./icon-bill-paid.svg" alt="bill-paid" />
                    </div>
                    <span className={style.recurringBills__amounts}>
                      ${Math.abs(bill.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default RecurringBills;
