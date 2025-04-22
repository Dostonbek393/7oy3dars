import style from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { useState } from "react";

function Register() {
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);
  const { isPending, register } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 8) {
      setIsPasswordTooShort(true);
      return;
    } else {
      setIsPasswordTooShort(false);
    }

    register(displayName, email, password);
    e.target.reset();
  };

  return (
    <div className={style.loginWrapper}>
      <div className={style.finance}>
        <img src="/logo-large.svg" alt="Finance logo" className={style.logo} />
      </div>
      <div className={style.left}>
        <img src="/logo-large.svg" alt="Finance logo" className={style.logo} />
        <div className={style.textContent}>
          <h2>Keep track of your money and save for your future</h2>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.card}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="name"
              label="Display Name:"
              name="displayName"
              placeholder="Enter your name"
            />
            <label>Email</label>
            <input
              type="email"
              label="Email:"
              name="email"
              placeholder="Enter your email"
            />
            <label>Create Password</label>
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />
              <img
                src={
                  showPassword
                    ? "/icon-hide-show.svg"
                    : "/icon-hide-password.svg"
                }
                alt="Toggle visibility"
                className={style.eyeIcon}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
            <span style={{ color: isPasswordTooShort ? "red" : "inherit" }}>
              Passwords must be at least 8 characters
            </span>
            {!isPending && <button type="submit">Create Account</button>}
            {isPending && (
              <button type="submit" disabled>
                Loading...
              </button>
            )}
            <p>
              Need to create an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
