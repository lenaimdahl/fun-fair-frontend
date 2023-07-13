import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackendAPI } from "../api/BackendAPIHandler";
import AddText from "../component/AddText";

function DayView() {
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const backendAPIInstance = new BackendAPI();

  const handleDateChange = async (date) => {
    const dateAtMidnight = new Date(date);
    dateAtMidnight.setHours(0, 0, 0, 0);
    setSelectedDate(dateAtMidnight);
    const { allEvents, allEntries } = await backendAPIInstance.searchEvents(
      dateAtMidnight
    );
    setEvents(allEvents);
    setEntries(allEntries);
  };

  useEffect(() => {
    handleDateChange(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="day-view-flex">
      <div className="day-view-container">
        <div className="date-picker-div">
          <h3>Pick a date</h3>
          <DatePicker
            showIcon
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="day-entries">
          <h3>Your events</h3>
          <p>
            {events.map((event) => (
              <div key={event._id}>
                {event.image} {event.title}
              </div>
            ))}
          </p>
        </div>
        <div className="day-entries">
          <h3>Your entries</h3>
          <p>
            <ul>
              {entries.map((entry) => (
                <li key={entry._id}>{entry.text}</li>
              ))}
            </ul>
          </p>
        </div>
      </div>
      <AddText />
    </div>
  );
}

export default DayView;
