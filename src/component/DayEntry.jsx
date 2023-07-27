import { useContext, useState } from "react";
import { GlobalContext } from "../context/global.context";

function DayEntry({ fetchEntriesByDate, id, text }) {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleUpdateEntry = async () => {
    try {
      await backendAPIInstance.updateEntry(id, newText);
      await fetchEntriesByDate();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteText = async () => {
    try {
      await backendAPIInstance.deleteEntry(id);
      await fetchEntriesByDate();
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancelEditing() {
    setNewText(text);
    setIsEditing(false);
  }

  return isEditing ? (
    <>
      <div className="diary-edit-box">
        <div>
          <input
            className="diary-edit-input"
            type="text"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
        </div>
        <div>
          <button onClick={handleUpdateEntry} className="diary-edit-btn">
            ✅
          </button>
          <button onClick={handleCancelEditing} className="diary-edit-btn">
            ✖️
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="single-entry-box">
      <div className="entry-text">{text}</div>
      <div className="entry-edit-buttons">
        <button className="button-edit" onClick={() => setIsEditing(true)}>
          ✎
        </button>
        <button className="button-delete" onClick={handleDeleteText}>
          ✖️
        </button>
      </div>
    </div>
  );
}

export default DayEntry;
