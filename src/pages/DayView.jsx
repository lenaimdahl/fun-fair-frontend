import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackendAPI } from "../api/BackendAPIHandler";
import AddText from "../component/AddText";
import DayEntry from "../component/DayEntry";
import DeleteMeetings from "../component/DeleteMeetings";
import { GlobalContext } from "../context/global.context";

function DayView() {
  const { meetings } = useContext(GlobalContext);
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredMeetings, setFilteredMeetings] = useState(meetings);

  const backendAPIInstance = new BackendAPI();

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const fetchEntriesByDate = async () => {
    const dateAtMidnight = new Date(selectedDate);
    dateAtMidnight.setHours(0, 0, 0, 0);
    const { allEntries } = await backendAPIInstance.searchEntries(
      dateAtMidnight
    );
    setEntries(allEntries);
  };

  useEffect(() => {
    const dateAtMidnight = new Date(selectedDate);
    dateAtMidnight.setHours(0, 0, 0, 0);
    const meetingsByDay = meetings.filter((meeting) => {
      return new Date(meeting.timestamp).getTime() === dateAtMidnight.getTime();
    });
    setFilteredMeetings(meetingsByDay);
  }, [meetings, selectedDate]);

  useEffect(() => {
    fetchEntriesByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div className="day-view-page">
      <div className="date-picker-div">
        <h3>Pick a date</h3>
        <DatePicker
          showIcon
          selected={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="events-and-diary">
        <div className="events-box">
          <h3>Your events</h3>
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <p key={meeting.id}>
                {meeting.image} {meeting.title}
                <DeleteMeetings id={meeting.id} />
              </p>
            ))
          ) : (
            <p>No meetings to display</p>
          )}
        </div>
        <div className="diary-box">
          <h3>Your diary</h3>
          {entries.length > 0 ? (
            <p>
              {entries.map((entry) => (
                <div className="single-diary-entry">
                  <li key={entry._id}>
                    <DayEntry text={entry.text} id={entry._id} />
                  </li>
                </div>
              ))}
            </p>
          ) : (
            <p>No entries to display</p>
          )}
          <AddText fetchEntriesByDate={fetchEntriesByDate} />
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default DayView;
