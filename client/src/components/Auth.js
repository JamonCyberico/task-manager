import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const switchView = (status) => {
    setIsLogin(status);
    setError(null);
  }

  return (
    <div className="auth">
      <div className="auth-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form>
          <label className="label">Email</label>
          <input  required id="email" type="email" />
          <label className="label">Password</label>
          <input required id="password" type="password" />
          {!isLogin && 
            (<>
            <label className="label">Confirm Password</label>
            <input required id="confirm-password" type="password" />
            </>
          )}
          <button type="submit" className="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <span onClick={() => switchView(!isLogin)}>{ isLogin ? "Login" : "Sign Up" }</span>
        <p className="error">{error}</p>
      </div>
    </div>
  );
}

export default Auth;
