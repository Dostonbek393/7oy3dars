import style from "./Register.module.scss";

function Register() {
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
          <form>
            <label>Name</label>
            <input type="name" placeholder="Enter your name" />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
            <label>Create Password</label>
            <input type="password" placeholder="Enter your password" />
            <span>Passwords must be at least 8 characters</span>
            <button type="submit">Create Account</button>
            <p>
              Need to create an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
