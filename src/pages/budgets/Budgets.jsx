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

  return <div>Budgets</div>;
}

export default Budgets;
