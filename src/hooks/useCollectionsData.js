import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

export const useCollectionsData = (names) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    async function fetchMultipleCollections() {
      try {
        const balanceRef = collection(db, "balance");
        const budgetsRef = collection(db, "budgets");
        const potsRef = collection(db, "pots");
        const transactionsRef = collection(db, "transactions");

        const [
          balanceSnapshot,
          budgetsSnapshot,
          potsSnapshot,
          transactionsSnapshot,
        ] = await Promise.all([
          getDocs(balanceRef),
          getDocs(budgetsRef),
          getDocs(potsRef),
          getDocs(transactionsRef),
        ]);

        const balance = {
          id: balanceSnapshot.docs[0].id,
          ...balanceSnapshot.docs[0].data(),
        };

        const budgets = budgetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const pots = potsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const transactions = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData({ budgets, balance, pots, transactions });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setIsPending(false);
      }
    }

    fetchMultipleCollections();
  }, []);

  return { data, isPending };
};
