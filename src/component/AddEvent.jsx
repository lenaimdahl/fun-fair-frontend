import { useEffect, useState } from "react";
import NewEvent from "./NewEvent";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddEvent() {
  const [allEvents, setAllEvents] = useState([]);
  const backendAPIInstance = new BackendAPI();

  const fetchAllEvents = async () => {
    const fetchedEvents = await backendAPIInstance.getEvents();
    console.log("All events from DB", fetchedEvents);
    const eventsArray = fetchedEvents.events;
    setAllEvents(eventsArray);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="add-event-box">
      <h2>Add an Event for today</h2>
      {/* <form onSubmit={handleAddEvent}> */}
      <form className="add-event-today-form"> 
        <label>events: </label>
       {/* these need to be populated from our database */}
        <select id="event" name="event">
          {allEvents.map((oneEvent) => {
            return (
              <option key={oneEvent.value} value={oneEvent.value}>
                {oneEvent.image} {oneEvent.title} {oneEvent.points} points
              </option>
            );
          })}
        </select>
        <button type="submit">+</button>
      </form>

      <NewEvent />
    </div>
  );
}

export default AddEvent;
