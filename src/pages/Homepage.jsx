import { useEffect, useState } from "react";
import { BoredAPI } from "../api/BoredAPIHandler";
import Preview from "../component/Preview";
import CalenderPreview from "../assets/calendar-example.png";

function HomePage() {
  const [activity, setActivity] = useState("");
  const boredAPIInstance = new BoredAPI();

  useEffect(() => {
    getActivityData();
  }, []);

  const getActivityData = async () => {
    const data = await boredAPIInstance.getActivity();
    setActivity(data);
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
            <h2>"{activity.activity}"</h2>
          </div>
          <button className="signup-button">Sign up!</button>
        </div>
      </div>
      <Preview />
    </div>
  );
}

export default HomePage;
