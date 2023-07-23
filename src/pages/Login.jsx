import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { GlobalContext } from "../context/global.context";

function Login() {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { setToken, authenticateUser, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = { email, password };
      const { authToken } = await backendAPIInstance.login(userToLogin);
      setToken(authToken);
      authenticateUser();
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>email</label>
        <input
          type="email"
          name="email"
          value={email}
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="log-in-bottom">
        <p>Don't have an account yet?</p>
        <button>
          <Link to={"/"} className="log-in-page-link">
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Login;
