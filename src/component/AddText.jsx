import { useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function AddText() {
  const [showTextSection, setShowTextSection] = useState(false);
  const [text, setText] = useState("");
  const backendAPIInstance = new BackendAPI();

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  const handleText = (event) => setText(event.target.value);

  const handleAddText = async (event) => {
    event.preventDefault();
    const currentDay = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveText(text, currentDay);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!showTextSection && (
        <button className="button" onClick={handleAddTextClick}>
          <p>Add a new Text Entry for today</p>
        </button>
      )}
      {showTextSection && (
        <div>
          <div>
            <h2>Add your text</h2>
            <div className="new-text-container">
              <form onSubmit={handleAddText}>
                <input
                  type="text"
                  name="text"
                  value={text}
                  onChange={handleText}
                />
                <button
                  onClick={handleCloseTextClick}
                  className="button"
                  type="submit"
                >
                  Add!
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
