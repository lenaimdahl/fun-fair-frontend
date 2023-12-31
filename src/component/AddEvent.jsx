import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global.context";

function AddEvent({ friends, fetchAllEvents, allEvents }) {
  const { backendAPIInstance, meetings, setMeetings } =
    useContext(GlobalContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState("");
  const [customPoints, setCustomPoints] = useState(0);

  const handleAddToCalendar = async (event) => {
    event.preventDefault();
    const selectedDateAdMidnight = new Date(selectedDate).setHours(0, 0, 0, 0);

    const selectElement =
      event.target[0].options[event.target[0].selectedIndex];

    try {
      const eventToAdd = {
        title: selectElement.getAttribute("title"),
        image: selectElement.getAttribute("image"),
        points: customPoints,
        timestamp: selectedDateAdMidnight,
        friend: selectedFriend || null,
      };
      const { newMeeting } = await backendAPIInstance.addEventToCalendar(
        eventToAdd
      );
      newMeeting.title = `${newMeeting.image} ${newMeeting.title}`;
      setSelectedFriend("");
      setCustomPoints(0);
      setSelectedDate(new Date());
      setMeetings([...meetings, newMeeting]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCustomPointsChange = (event) => {
    const points = parseInt(event.target.value);
    setCustomPoints(points);
  };

  useEffect(() => {
    fetchAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-event-box">
      <h2>Add an Event</h2>
      <div className="add-event-box">
        <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">date: </label>
          <input
            className="add-event-flex-row-item-2"
            type="date"
            value={selectedDate.toISOString().slice(0, 10)} // Convert the date to a string in "YYYY-MM-DD" format
            onChange={(event) => setSelectedDate(new Date(event.target.value))}
          />
        </div>

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

        <div className="add-event-flex-row">
          <label className="add-event-flex-row-item-1">with: </label>
          <select
            className="add-event-flex-row-item-2"
            value={selectedFriend}
            onChange={(event) => setSelectedFriend(event.target.value)}
          >
            <option value="">Select a friend</option>
            {friends.map((friend) => (
              <option key={friend._id} value={friend._id}>
                {friend.username}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleAddToCalendar}>
          <div className="add-event-flex-row">
            <label className="add-event-flex-row-item-1">events: </label>
            {/* these need to be populated from our database */}
            <select
              className="add-event-flex-row-item-2"
              id="event"
              name="event"
            >
              {allEvents.map((oneEvent) => (
                <option
                  key={oneEvent._id}
                  value={oneEvent.value}
                  title={oneEvent.title}
                  image={oneEvent.image}
                >
                  {oneEvent.image} {oneEvent.title}
                </option>
              ))}
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
