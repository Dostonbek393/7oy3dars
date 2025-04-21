import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { login } from "../app/features/userSlice";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const register = async (displayName, email, password) => {
    try {
      setIsPending(true);
      const req = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: `https://api.dicebear.com/9.x/adventurer/svg?seed=${displayName}`,
      });

      const user = req.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        online: true,
      });

      dispatch(login(user));
      toast.success(`Welcome, ${displayName}`);
      setData(user);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log("Register Error:", error.code, error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, register };
};
