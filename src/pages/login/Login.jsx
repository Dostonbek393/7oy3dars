import style from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { data, isPending, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    login(email, password);
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
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" />
            <label>Password</label>
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
            {!isPending ? (
              <button type="submit">Login</button>
            ) : (
              <button disabled>Loading...</button>
            )}
            <p>
              Need to create an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
