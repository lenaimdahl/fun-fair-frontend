import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddEvent() {
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState("");
  const [customPoints, setCustomPoints] = useState(0);
  const [friends, setFriends] = useState([]);

  const backendAPIInstance = new BackendAPI();

  const fetchAllEvents = async () => {
    const fetchedEvents = await backendAPIInstance.getEvents();
    const fetchedEventsArray = fetchedEvents.allEvents.reduce(
      (result, event) => {
        if (!result.find((ev) => ev.title === event.title)) {
          result.push(event);
        }
        return result;
      },
      []
    );

    setAllEvents(fetchedEventsArray);
  };

  const fetchFriends = async () => {
    const { friends } = await backendAPIInstance.getFriends();
    setFriends(friends);
  };

  const handleAddToCalendar = async (event) => {
    event.preventDefault();
    const selectedDateAdMidnight = new Date(selectedDate).setHours(0, 0, 0, 0);

    const selectEl = event.target[0].options[event.target[0].selectedIndex];

    try {
      const eventToAdd = {
        title: selectEl.getAttribute("title"),
        image: selectEl.getAttribute("image"),
        points: customPoints,
        timestamp: selectedDateAdMidnight,
        friend: selectedFriend,
      };
      if (selectedFriend) {
        eventToAdd.friend = selectedFriend;
      } else {
        eventToAdd.friend = null; // Set friend to null when no friend is selected
      }
      await backendAPIInstance.addEventToCal(eventToAdd);
      setSelectedFriend("");
      setCustomPoints(0);
      setSelectedDate(new Date());
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

  const handleCustomPointsChange = (event) => {
    console.log(event.target.value);
    const points = parseInt(event.target.value);
    setCustomPoints(points);
  };

  useEffect(() => {
    fetchAllEvents();
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-event-box">
      <h2>Add an Event</h2>

      {/* Date Picker */}
      <div className="add-event-box">
        <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">date: </label>
          <input
            className="add-event-flex-row-item-2"
            type="date"
            value={selectedDate.toISOString().slice(0, 10)} // Convert the date to a string in "YYYY-MM-DD" format
            onChange={(event) => handleDateChange(new Date(event.target.value))}
          />
        </div>

        {/* Add custom points input */}
        <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">points: </label>
          <input
            className="add-event-flex-row-item-2"
            type="number"
            value={customPoints}
            onChange={handleCustomPointsChange}
            min="0"
          />
        </div>

        {/* Friend Selector */}
        <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">with: </label>
          <select className="add-event-flex-row-item-2" value={selectedFriend} onChange={handleFriendChange}>
            <option value="">Select a friend</option>
            {friends.map((friend) => (
              <option key={friend._id} value={friend._id}>
                {friend.username}
              </option>
            ))}
          </select>
        </div>

        {/* Event Selector */}
        <form onSubmit={handleAddToCalendar} className="">
          <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">events: </label>
          {/* these need to be populated from our database */}
          <select className="add-event-flex-row-item-2" id="event" name="event">
            {allEvents.map((oneEvent) => {
              return (
                <option
                  key={oneEvent._id}
                  value={oneEvent.value}
                  title={oneEvent.title}
                  image={oneEvent.image}
                >
                  {oneEvent.image} {oneEvent.title}
                </option>
              );
            })}
          </select>
          </div>
          <br></br>
          <button id="add-event-btn" type="submit">
            +
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
