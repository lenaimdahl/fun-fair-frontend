import { useEffect, useState } from "react";
import { BoredAPI } from "../api/BoredAPIHandler";
import { BackendAPI } from "../api/BackendAPIHandler";
import Preview from "../component/Preview";
import CalenderPreview from "../assets/calendar-example.png";

function HomePage() {
  const [activity, setActivity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    try {
      const payload = {
        title: activity,
      };

      await backendAPIInstance.saveActivity(payload);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
          <button className="signup-button">Sign up!</button>
        </div>
      </div>
      <Preview />
    </div>
  );
}

export default HomePage;
