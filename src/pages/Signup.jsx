import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleusername = (event) => setusername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleSignup = (event) => {
    event.preventDefault();
    const requestBody = { username, password };

    axios
      .post(`http://localhost:5005/auth/signup`, requestBody)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>username:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleusername}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Sign up!</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default Signup;