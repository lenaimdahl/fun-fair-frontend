import { useEffect, useState } from "react";
import { BoredAPI } from "../api/BoredAPIHandler";
import { Link } from "react-router-dom";
import CalenderPreview from "../assets/calendar-example.png";

function HomePage() {
  const [activity, setActivity] = useState("");
  const boredAPIInstance = new BoredAPI();

  useEffect(() => {
    const storedActivity = localStorage.getItem("activity");
    const storedDate = localStorage.getItem("date");
    // Check if stored activity exists and if it was stored within the last 24 hours
    if (storedActivity && storedDate && isWithinLast24Hours(storedDate)) {
      setActivity(storedActivity);
    } else {
      fetchActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWithinLast24Hours = (dateString) => {
    const storedDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - storedDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < 24;
  };

  const fetchActivity = async () => {
    const { activity } = await boredAPIInstance.getActivity();
    setActivity(activity);
    localStorage.setItem("activity", activity);
    localStorage.setItem("date", new Date().toString());
  };

  return (
    <div className="calendar-flex">
      <img
        className="calendar-container"
        src={CalenderPreview}
        alt="Calender preview"
        style={{ width: "600px" }}
      />
      <div className="activity-container">
        <h1>Activity tip of the day:</h1>
        <h2>"{activity}"</h2>
        <br />
        <br />
        <Link className="signup-button" to={"/signup"}>
          Sign up!
        </Link>
        <br />
        <br />
        <p>Already have an account?</p>
        <br />
        <Link className="signup-button" to={"/login"}>
          Log in
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
