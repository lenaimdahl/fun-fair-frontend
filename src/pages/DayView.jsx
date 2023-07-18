import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackendAPI } from "../api/BackendAPIHandler";
import AddText from "../component/AddText";
import DayEntry from "../component/DayEntry";

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
          {events.length > 0 ? (
            events.map((event) => (
              <p key={event._id}>
                {event.image} {event.title}
              </p>
            ))
          ) : (
            <p>No events to display</p>
          )}
        </div>
        <div className="day-entries">
          <h3>Your entries</h3>
          {entries.length > 0 ? (
            <p>
              {entries.map((entry) => (
                <div>
                  <li key={entry._id}>
                    <DayEntry text={entry.text} id={entry._id} />
                  </li>
                </div>
              ))}
            </p>
          ) : (
            <p>No entries to display</p>
          )}
        </div>
        <div></div>
      </div>
      <AddText />
    </div>
  );
}

export default DayView;
