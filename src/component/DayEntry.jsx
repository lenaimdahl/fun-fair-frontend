import { useContext, useState } from "react";
import { APIContext } from "../context/api.context";

function DayEntry(props) {
  const { backendAPIInstance } = useContext(APIContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const handleUpdateEntry = async () => {
    try {
      await backendAPIInstance.updateEntry(props.id, text);
      await props.fetchEntriesByDate();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleDeleteText = async () => {
    try {
      await backendAPIInstance.deleteEntry(props.id);
      await props.fetchEntriesByDate();
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancelEditing() {
    setText(props.text);
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <>
          <input type="text" value={text} onChange={handleChangeText} />
          <button onClick={handleUpdateEntry}>ok</button>
          <button onClick={handleCancelEditing}>cancel</button>
        </>
      ) : (
        <div className="single-entry-box">
          <div className="entry-text">{text}</div>
          <div className="entry-edit-buttons">
            <button
              className="button-edit"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              ✎
            </button>
            <button className="button-delete" onClick={handleDeleteText}>
              ✖️
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DayEntry;
