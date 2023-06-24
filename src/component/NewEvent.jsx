import { useState } from "react";

function NewEvent() {
    // const [title, setTitle] = useState("");
    // const [image, setImage] = useState("");
    // const [points, setPoints] = useState("");

    // const handleTitle = (event) => setTitle(event.target.value);
    // const handleImage = (event) => setImage(event.target.value);
    // const handlePoints = (event) => setPoints(event.target.value);

    return (
      <div className="new-event-box">
        <h2>Create a new Event</h2>
        {/* <form onSubmit={handleNewEvent}> */}
        {/* <form>
        <label>title:</label>
        <input
          type="title"
          name="title"
          value={title}
          onChange={handleTitle}
        />
          <label>emoji:</label>
        <input
          type="image"
          name="image"
          value={image}
          onChange={handleImage}
        />
        
        <label>points:</label>
        <input
          type="points"
          name="points"
          value={points}
          onChange={handlePoints}
        />
        <button type="submit">Add!</button>
        </form> */}
      </div>
    );
  }
  
  export default NewEvent;