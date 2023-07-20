import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddEvent() {
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const backendAPIInstance = new BackendAPI();

  const fetchAllEvents = async () => {
    const fetchedEvents = await backendAPIInstance.getEvents();
    const fetchedEventsArray = fetchedEvents.allEvents;
    setAllEvents(fetchedEventsArray);
  };

  const handleAddToCalendar = async (event) => {
    event.preventDefault();

    const currentDay = new Date().setHours(0, 0, 0, 0);
    const selectEl = event.target[0].options[event.target[0].selectedIndex];

    try {
      const eventToAdd = {
        title: selectEl.getAttribute("title"),
        image: selectEl.getAttribute("image"),
        points: selectEl.getAttribute("points"),
        timestamp: selectedDate.getTime(),
        friend: selectedFriend,
      };
      await backendAPIInstance.addEventToCal(eventToAdd);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFriendChange = (event) => {
    setSelectedFriend(event.target.value);
  };

  const fetchFriends = async () => {
    const { friends } = await backendAPIInstance.getFriends();
    setFriends(friends);
  };

  useEffect(() => {
    fetchAllEvents();
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-event-box">
      <h2>Add an Event for today</h2>

      {/* Date Picker */}
      <div>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate.toISOString().slice(0, 10)} // Convert the date to a string in "YYYY-MM-DD" format
          onChange={(event) => handleDateChange(new Date(event.target.value))}
        />
      </div>

      {/* Friend Selector */}
      <div>
        <label>Select Friend: </label>
        <select value={selectedFriend} onChange={handleFriendChange}>
          <option value="">Select a friend</option>
          {friends.map((friend) => (
            <option key={friend._id} value={friend._id}>
              {friend.username}
            </option>
          ))}
        </select>
      </div>

      {/* Event Selector */}
      <form onSubmit={handleAddToCalendar} className="add-event-today-form">
        <label>events: </label>
        {/* these need to be populated from our database */}
        <select id="event" name="event">
          {allEvents.map((oneEvent) => {
            return (
              <option
                key={oneEvent._id}
                value={oneEvent.value}
                points={oneEvent.points}
                title={oneEvent.title}
                image={oneEvent.image}
              >
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
