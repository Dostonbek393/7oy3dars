import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../app/features/userSlice";
import { useFirestore } from "../hooks/useFirestore";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const { updateDocument } = useFirestore("users");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      setIsPending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);
      const user = req.user;

      await updateDocument(user.uid, {
        online: true,
      });

      dispatch(loginAction(user));
      toast.success(`Welcome back, ${user.displayName}`);
      setData(user);

      navigate("/");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, login };
};
