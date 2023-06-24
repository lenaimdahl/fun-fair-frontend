import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleusername = (e) => setusername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();

  const { setToken, authenticateUser, setIsLoggedIn } = useContext(AuthContext);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = { username, password };
      const { data } = await axios.post(
        `http://localhost:5005/auth/login`,
        userToLogin
      );
      const actualToken = data.authToken;
      setToken(actualToken);
      authenticateUser();
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>username:</label>
        <input
          type="username"
          name="username"
          value={username}
          autoComplete="username"
          onChange={handleusername}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account yet?</p>
      <Link to={"/"}> Sign Up</Link>
    </div>
  );
}

export default Login;
