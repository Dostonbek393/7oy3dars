import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./UserCard.module.scss";

function UserCard() {
  const user = useSelector((state) => state.user.user);
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    if (user) {
      setShowCard(true);

      const timeout = setTimeout(() => {
        setShowCard(false);
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [user]);

  return (
    user && (
      <div className={`${style.userCard} ${!showCard ? style.hidden : ""}`}>
        <img src={user.photoURL} alt="User Avatar" />
        <p>{user.displayName}</p>
      </div>
    )
  );
}

export default UserCard;
