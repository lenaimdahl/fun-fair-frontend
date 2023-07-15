import React, { useEffect, useState } from 'react';
import { BackendAPI } from "../api/BackendAPIHandler";

function Points() {

  const [events, setEvents] = useState([]);
  const [weekPoints, setWeekPoints] = useState("");
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
      const weekEvents = fetchedEventsArray.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= endDate;
      });

      console.log("week events by user", weekEvents);

      setEvents(weekEvents);
    };

    fetchEvents();
  }, []);

  const weekPointsfromEvents = events.map( oneEvent => {
    return  Number(oneEvent.points);
  });

  const sumOfPoints = weekPointsfromEvents.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

//   let initialPointCount= 0;
//   let weekPointsSum = 0 + weekPointsfromEvents;

  useEffect(() => {
    setWeekPoints(sumOfPoints);
  },[]);

    return (
      <div>
        <p>Points collected so far: {weekPoints}</p>
     
      </div>
    );
  }
  
  export default Points;