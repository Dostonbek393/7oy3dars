import { useCollectionsData } from "../../hooks/useCollectionsData";
import style from "./Posts.module.scss";
import { useState } from "react";
import AddPotmodal from "../../components/modal/AddPotmodal";

function Posts() {
  const { data, isPending, mutate } = useCollectionsData();
  const [showModal, setShowModal] = useState(false);
  console.log(data);

  const handleAddBudget = (newPots) => {
    console.log("New pots:", newPots);
    mutate({
      ...data,
      pots: [...data.pots, { ...newPots, id: Date.now() }],
    });
  };

  if (isPending || !data || !data.pots) {
    return <div>Loading...</div>;
  }

  const { pots } = data;

  return (
    <div className={style.pots}>
      <div className={style.pots__title}>
        <h2 className={style.pots__text}>Pots</h2>
        <button
          className={style.pots__buttonAdd}
          onClick={() => setShowModal(true)}
        >
          + Add New Pot
        </button>
      </div>

      {showModal && (
        <AddPotmodal
          onClose={() => setShowModal(false)}
          onAddBudget={handleAddBudget}
        />
      )}

      <div className={style.pots__cart}>
        {pots.map((p) => {
          const percentage = (p.total / p.target) * 100;
          return (
            <div className={style.pots__card} key={p.id}>
              <div className={style.pots__image}>
                <div className={style.pots__list}>
                  <span
                    className={style.pots__theme}
                    style={{ backgroundColor: p.theme }}
                  ></span>
                  <h3 className={style.pots__name}>{p.name}</h3>
                </div>
                <img src="/icon-ellipsis.svg" alt={p.name} />
              </div>
              <div className={style.pots__total}>
                <h3 className={style.pots__texts}>Total Saved</h3>
                <span className={style.pots__target}>${p.total}</span>
              </div>
              <div className={style.pots__progress}>
                <div
                  className={style.pots__progressBar}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: p.theme,
                  }}
                ></div>
              </div>
              <div className={style.pots__saved}>
                <span className={style.pots__percentage}>
                  {percentage.toFixed(1)}%
                </span>
                <p className={style.pots__totals}>Target of ${p.target}</p>
              </div>
              <div className={style.pots__buttons}>
                <button className={style.pots__button}>+ Add Money</button>
                <button className={style.pots__button}>Withdraw</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
