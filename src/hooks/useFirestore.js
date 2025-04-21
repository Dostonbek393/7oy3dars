import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFirestore = (collectionName) => {
  const updateDocument = async (id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } catch (err) {
      console.error("Firestore update error:", err.message);
    }
  };

  return { updateDocument };
};
