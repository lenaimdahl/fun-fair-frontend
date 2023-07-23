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
      <input
        type="text"
        value={text}
        onChange={(event) => setNewText(event.target.value)}
      />
      <button onClick={handleUpdateEntry}>ok</button>
      <button onClick={handleCancelEditing}>cancel</button>
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
