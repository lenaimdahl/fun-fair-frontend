import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddEvent() {
  const [allEvents, setAllEvents] = useState([]);
  const backendAPIInstance = new BackendAPI();

  const fetchAllEvents = async () => {
    const fetchedEvents = await backendAPIInstance.getEvents();
    console.log("All events from DB", fetchedEvents);
    const fetchedEventsArray = fetchedEvents.allEvents;
    setAllEvents(fetchedEventsArray);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleAddToCalendar = async (e) => {
    e.preventDefault();

    console.log(e.target[0])

    const currentDay = new Date().setHours(0, 0, 0, 0);

    const selectEl = e.target[0].options[e.target[0].selectedIndex];

    try {
      let eventToAdd = {
        title: selectEl.getAttribute("title"),
        image: selectEl.getAttribute("image"),
        points: selectEl.getAttribute("points"),
        timestamp: currentDay,
      };

      console.log("EVENT TO ADD TO CAL", eventToAdd);

      await backendAPIInstance.addEventToCal(eventToAdd);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-event-box">
      <h2>Add an Event for today</h2>
      <form onSubmit={handleAddToCalendar} className="add-event-today-form"> 
        <label>events: </label>
       {/* these need to be populated from our database */}
        <select id="event" name="event">
          {allEvents.map((oneEvent) => {
            return (
              <option key={oneEvent.value} value={oneEvent.value} points={oneEvent.points} title={oneEvent.title} image={oneEvent.image} >
                {oneEvent.image} {oneEvent.title} {oneEvent.points} points
              </option>
            );
          })}
        </select>
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddEvent;
