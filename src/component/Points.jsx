import React, { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function Points() {
  const [events, setEvents] = useState([]);
  const [weekPoints, setWeekPoints] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    // Fetch events from your data source
    const fetchEvents = async () => {
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - daysUntilMonday); // Start date (Monday) of the week
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // End date (Sunday) of the week

      // Make an API request or retrieve events from a local data store
      const fetchedEvents = await backendAPIInstance.getEventsByUser();
      const fetchedEventsArray = fetchedEvents.events;

      console.log("fetched events by user", fetchedEvents);

      // Filter events for the week (Monday to Sunday)
      const weekEvents = fetchedEventsArray.filter((event) => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= endDate;
      });

      console.log("week events by user", weekEvents);

      setEvents(weekEvents);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const weekPointsfromEvents = events.map((oneEvent) => {
      return Number(oneEvent.points);
    });

    const sumOfPoints = weekPointsfromEvents.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    setWeekPoints(sumOfPoints);
  }, [events]);

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
  }

  const handleUpdateGoal = async () => {
    try {
      const fetchedUser = await backendAPIInstance.getUserData();
      console.log(fetchedUser);
      await backendAPIInstance.updateGoal(props.id, weeklyGoal);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="points-box">
      <p>
        Your score: <br></br>
        <h3 className={weekPoints > weeklyGoal ? "points-green" : "points-red"}>
          {weekPoints}
        </h3>
      </p>

      <div>
        {isEditing ? (
          <p>
            <input type="text" value={weeklyGoal} onChange={handleChangeGoal} />
            <button onClick={handleUpdateGoal}>ok</button>
          </p>
        ) : (
          <p>
            Your weekly goal:<br></br>
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
          </p>
        )}
      </div>
    </div>
  );
}

export default Points;
