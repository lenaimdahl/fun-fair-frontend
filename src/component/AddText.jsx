import { useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddText({ fetchEntriesByDate }) {
  const [showTextSection, setShowTextSection] = useState(false);
  const [text, setText] = useState("");
  const backendAPIInstance = new BackendAPI();

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleText = (event) => setText(event.target.value);

  const handleAddText = async (event) => {
    event.preventDefault();
    const currentDay = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveEntry(text, currentDay);
      setText("");
      setShowTextSection(false);
      await fetchEntriesByDate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-text-container">
      {!showTextSection && (
        <button className="button-add" onClick={handleAddTextClick}>
          + Add a new note
        </button>
      )}
      {showTextSection && (
        <div>
          <div>
            <h2>Your note</h2>
            <div className="new-text-container">
              <form onSubmit={handleAddText}>
                <input
                  type="text"
                  name="text"
                  value={text}
                  onChange={handleText}
                />
                <button className="button-add" type="submit">
                  save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddText;
