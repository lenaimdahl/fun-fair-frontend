import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { GlobalContext } from "../context/global.context";

function Points() {
  const { meetings, backendAPIInstance } = useContext(GlobalContext);
  const [weekPoints, setWeekPoints] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const monday = moment().startOf("isoWeek");
    const sunday = moment().endOf("isoWeek");

    // Filter meetings for the week (Monday to Sunday)
    const weekMeetings = meetings.filter((meeting) => {
      const meetingDate = moment(meeting.timestamp);
      return meetingDate.isBetween(monday, sunday);
    });

    const sumOfPoints = weekMeetings
      .map((meeting) => meeting.points)
      .reduce((result, points) => result + points, 0);

    setWeekPoints(sumOfPoints);
  }, [meetings]);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await backendAPIInstance.getUserData();
      const usersWeeklyGoal = fetchedUser.user.weeklyGoal;
      setWeeklyGoal(usersWeeklyGoal);
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateGoal = async () => {
    try {
      await backendAPIInstance.updateGoal(weeklyGoal);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="points-box">
      <div className="point-section">
        <p>Your score: </p>
        <br></br>
        <h3 className={weekPoints > weeklyGoal ? "points-green" : "points-red"}>
          {weekPoints}
        </h3>
      </div>
      <div>
        {isEditing ? (
          <div className="">
            <p>Your weekly goal:</p>
            <br></br>
            <div className="points-edit">
            <input
              type="text"
              value={weeklyGoal}
              onChange={(event) => setWeeklyGoal(event.target.value)}
            />
            <button className="goal-edit-btn" onClick={handleUpdateGoal}>
              ✅
            </button>

            </div>
            
          </div>
        ) : (
          <div className="point-section">
            <p>Your weekly goal:</p>
            <br></br>
            <div className="goal-and-btn">
              <button
                className="goal-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✎
              </button>
              <h3 className="points-highlighter">{weeklyGoal}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Points;
