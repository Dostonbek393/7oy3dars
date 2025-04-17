import style from "./Login.module.scss";

function Login() {
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
          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
            <button type="submit">Login</button>
            <p>
              Need to create an account? <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
