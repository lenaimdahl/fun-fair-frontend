import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/global.context";

function Signup() {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("100");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const requestBody = { username, password, email, weeklyGoal };

    (async () => {
      try {
        await backendAPIInstance.signup(requestBody);
        navigate("/login");
      } catch (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    })();
  };

  return (
    <div className="signup-page">
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <label>username</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label>email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>weekly points goal</label>
        <input
          type="text"
          name="weeklyGoal"
          value={weeklyGoal}
          onChange={(event) => setWeeklyGoal(event.target.value)}
        />
        <button type="submit">Sign up!</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="signup-bottom">
        <p>Already have an account?</p>
        <button>
          <Link to={"/login"} className="signup-page-link">
            Log in
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Signup;
