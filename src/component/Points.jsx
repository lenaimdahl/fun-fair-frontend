import React, { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function Points() {
  const [events, setEvents] = useState([]);
  const [weekPoints, setWeekPoints] = useState("");
  const [value, setValue] = useState(0);
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



  //   let initialPointCount= 0;
  //   let weekPointsSum = 0 + weekPointsfromEvents;

  // useEffect(() => {
  //   setWeekPoints(sumOfPoints);
  // }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(parseInt(e.target.value));
  };

  // const inputValue = document.getElementById("input-points").value;
  // console.log("log of input value", inputValue);

  return (
    <div className="points-box">
      <div>
        <p>Your score: {weekPoints}</p>
        <p>
          Your weekly goal:{" "}
          <input
            id="input-points"
            type="number"
            value={value}
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="points-image">
        {/* {{ weekPoints } > { inputValue } ? <p>🥳</p> : <p>🥴</p>} */}
      </div>
    </div>
  );
}

export default Points;
