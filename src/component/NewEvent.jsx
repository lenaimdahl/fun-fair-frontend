import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";

function NewEvent({ fetchAllEvents }) {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [showEventForm, setShowEventForm] = useState(false);

  const handleAddEvent = async (event) => {
    event.preventDefault();
    const currentDay = new Date().setHours(0, 0, 0, 0);

    try {
      const newEvent = {
        title,
        image,
        timestamp: currentDay,
      };
      await backendAPIInstance.saveEvent(newEvent);
      await fetchAllEvents();
      setTitle("");
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-event-box">
      <div className="event-form-head">
        <h2>Create a new Event</h2>
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="btn-show-form"
        >
          V
        </button>
      </div>
      {showEventForm && (
        <form onSubmit={handleAddEvent} className="new-event-form">
          <label>title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>emoji</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          <button type="submit">+</button>
        </form>
      )}
    </div>
  );
}

export default NewEvent;
