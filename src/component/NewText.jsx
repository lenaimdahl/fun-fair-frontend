import axios from "axios";
import { useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function NewText() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitle = (event) => setTitle(event.target.value);
  const handleText = (event) => setText(event.target.value);

  const backendAPIInstance = new BackendAPI();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const currentDay = new Date().setHours(0, 0, 0, 0);

    try {
      let newEvent = {
        title,
        text,
        timestamp: currentDay,
      };

      await backendAPIInstance.saveEvent(newEvent);
      setTitle("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-event-box">
      <h2>Add you text </h2>
      <form onSubmit={handleAddEvent}>
        <label>title:</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label>text:</label>
        <input type="text" name="text" value={text} onChange={handleText} />
        <button type="submit">Add!</button>
      </form>
    </div>
  );
}

export default NewText;
