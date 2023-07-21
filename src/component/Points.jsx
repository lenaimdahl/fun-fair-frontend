import React, { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function Points() {
  const [meetings, setMeetings] = useState([]);
  const [weekPoints, setWeekPoints] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    // Fetch meetings from your data source
    const fetchMeetings = async () => {
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - daysUntilMonday); // Start date (Monday) of the week
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // End date (Sunday) of the week

      // Make an API request or retrieve meetings from a local data store
      const fetchedMeetings = await backendAPIInstance.getMeetingsByUser();
      const fetchedMeetingsArray = fetchedMeetings.meetings;

      console.log("fetched meetings by user", fetchedMeetings);

      // Filter meetings for the week (Monday to Sunday)
      const weekMeetings = fetchedMeetingsArray.filter((meeting) => {
        const meetingDate = new Date(meeting.timestamp);
        return meetingDate >= startDate && meetingDate <= endDate;
      });

      console.log("week meetings by user", weekMeetings);

      setMeetings(weekMeetings);
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    const weekPointsfromMeetings = meetings.map((oneMeeting) => {
      return Number(oneMeeting.points);
    });

    const sumOfPoints = weekPointsfromMeetings.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    setWeekPoints(sumOfPoints);
  }, [meetings]);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await backendAPIInstance.getUserData();
      const usersWeeklyGoal = fetchedUser.user.weeklyGoal;
      console.log("user point goal", usersWeeklyGoal);

      setWeeklyGoal(usersWeeklyGoal);
    };

    fetchUserData();
  }, []);

  const handleChangeGoal = (event) => {
    setWeeklyGoal(event.target.value);
  };

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
          <div className="point-section">
            <p>Your weekly goal:</p><br></br>
            <input type="text" value={weeklyGoal} onChange={handleChangeGoal} />
            <button className="goal-edit-btn" onClick={handleUpdateGoal}>
              ✅
            </button>
          </div>
        ) : (
          <div className="point-section">
            <p>Your weekly goal:</p><br></br>
            <div className="goal-and-btn">
              <button
                className="goal-edit-btn"
                onClick={() => {
                  setIsEditing(true);
                }}
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
