import NewEvent from "./NewEvent";

function AddEvent() {
  return (
    <div className="add-event-box">
      <h2>Add an Event for today</h2>
      {/* <form onSubmit={handleAddEvent}> */}
      <form>
        <label>events: </label>
        {/* these need to be populated from our database */}
        <select id="event" name="event">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
        <button type="submit">Add an event</button>
      </form>
      <NewEvent />
    </div>
  );
}

export default AddEvent;
