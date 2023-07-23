import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";

function AddText({ fetchEntriesByDate, selectedDate }) {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [showTextSection, setShowTextSection] = useState(false);
  const [text, setText] = useState("");

  const handleAddText = async (event) => {
    event.preventDefault();
    const currentDay = new Date(selectedDate).setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveEntry(text, currentDay);
      await fetchEntriesByDate();
      setText("");
      setShowTextSection(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-text-container">
      {!showTextSection && (
        <button className="button-add" onClick={() => setShowTextSection(true)}>
          + Add a new note
        </button>
      )}
      {showTextSection && (
        <div>
          <h2>Your note</h2>
          <div className="new-text-container">
            <form onSubmit={handleAddText}>
              <input
                type="text"
                name="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <button className="button-add" type="submit">
                save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddText;
