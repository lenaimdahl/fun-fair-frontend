import { useEffect, useState } from "react";
import { BoredAPI } from "../api/BoredAPIHandler";
import { BackendAPI } from "../api/BackendAPIHandler";
import { Link } from "react-router-dom";
import CalenderPreview from "../assets/calendar-example.png";

function HomePage() {
  const [activity, setActivity] = useState("");

  const boredAPIInstance = new BoredAPI();
  const backendAPIInstance = new BackendAPI();

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
    sendActivityToBackend(activity);
  };

  const sendActivityToBackend = async (activity) => {
    try {
      await backendAPIInstance.saveActivity(activity);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="calendar-flex">
        <img
          className="calendar-container"
          src={CalenderPreview}
          alt="Calender preview"
          style={{ width: "600px" }}
        />

        <div className="activity-container">
          <div>
            <h1>Activity tip of the day:</h1>
            <h2>"{activity}"</h2>
          </div>
          <button className="signup-button">
            <Link to={"/signup"}>Sign up!</Link>
          </button>
          <p>Already have an account?</p>
          <button className="signup-button">
            <Link to={"/login"} className="signup-page-link">
              Log in
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
