import axios from "axios";
import { useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function NewText() {
  const [text, setText] = useState("");

  const handleText = (event) => setText(event.target.value);

  const backendAPIInstance = new BackendAPI();

  const handleAddText = async (e) => {
    e.preventDefault();

    const currentDay = new Date().setHours(0, 0, 0, 0);

    try {
      let newText = {
        text,
        timestamp: currentDay,
      };

      await backendAPIInstance.saveText(newText);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add you text </h2>
      <div className="new-text-box">
        <form onSubmit={handleAddText}>
          <label>text:</label>
          <input type="text" name="text" value={text} onChange={handleText} />
          <button className="button" type="submit">
            Add!
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewText;
