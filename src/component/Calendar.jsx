import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Toolbar,
  DateNavigator,
  TodayButton,
  Scheduler,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { BackendAPI } from "../api/BackendAPIHandler";

function Calendar() {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    (async () => {
      const data = await backendAPIInstance.getMeetingsByUser();
      const convertedData = data.meetings.map((meeting, index) => {
        return {
          id: index,
          title: meeting.image,
          startDate: new Date(meeting.timestamp),
          endDate: new Date(new Date(meeting.timestamp).setHours(0, 30, 0, 0)),
        };
      });
      setData(convertedData);
      console.log("data", convertedData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="calendar-container">
        <Paper>
          <Scheduler data={data} height={500}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={(newDate) => setCurrentDate(newDate)}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
      <Link to={"/day-view"}>
        <button className="button">Add a text for today</button>
      </Link>
    </div>
  );
}

export default Calendar;
