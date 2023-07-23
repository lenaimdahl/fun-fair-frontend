import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";

function NewEvent() {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [showEventForm, setShowEventForm] = useState(false);

  const handleTitle = (event) => setTitle(event.target.value);
  const handleImage = (event) => setImage(event.target.value);

  const toggleForm = () => {
    if (showEventForm === true) {
      setShowEventForm(false);
    } else {
      setShowEventForm(true);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const currentDay = new Date().setHours(0, 0, 0, 0);

    try {
      const newEvent = {
        title,
        image,
        timestamp: currentDay,
      };

      await backendAPIInstance.saveEvent(newEvent);
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
        <button onClick={toggleForm} className="btn-show-form">
          V
        </button>
      </div>
      {showEventForm ? (
        <form onSubmit={handleAddEvent} className="new-event-form">
          <label>title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />
          <label>emoji</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleImage}
          />
          <button type="submit">+</button>
        </form>
      ) : null}
    </div>
  );
}

export default NewEvent;
