import { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function DayEntry(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const backendAPIInstance = new BackendAPI();

  const handleUpdateEntry = async () => {
    try {
      await backendAPIInstance.updateEntry(props.id, text);
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
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancelEditing() {
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
        <>
          {text}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Update your entry
          </button>
          <button onClick={handleDeleteText}>delete entry</button>
        </>
      )}
    </>
  );
}

export default DayEntry;
