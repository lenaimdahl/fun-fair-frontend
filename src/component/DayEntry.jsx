import { useState } from "react";

function DayEntry(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const handleUpdateEntry = () => {
    setIsEditing(false);
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input type="text" value={text} onChange={handleChangeText} />
          <button onClick={handleUpdateEntry}>ok</button>
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
        </>
      )}
    </>
  );
}

export default DayEntry;
