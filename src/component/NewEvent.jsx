import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendAPI } from "../api/BackendAPIHandler";

function NewEvent() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [points, setPoints] = useState("");

  const handleTitle = (event) => setTitle(event.target.value);
  const handleImage = (event) => setImage(event.target.value);
  const handlePoints = (event) => setPoints(parseInt(event.target.value));

  const navigate = useNavigate();

  const backendAPIInstance = new BackendAPI();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const currentDay = new Date().setHours(0, 0, 0, 0);

    try {
      let newEvent = {
        title,
        image,
        points,
        timestamp: currentDay,
      };

      await backendAPIInstance.saveEvent(newEvent);
      setTitle("");
      setImage("");
      setPoints("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-event-box">
      <h2>Create a new Event</h2>
      <form onSubmit={handleAddEvent}>
        <label>title:</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label>emoji:</label>
        <input type="text" name="image" value={image} onChange={handleImage} />

        <label>points:</label>
        <input
          type="number"
          name="points"
          value={points}
          onChange={handlePoints}
        />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
}

export default NewEvent;
