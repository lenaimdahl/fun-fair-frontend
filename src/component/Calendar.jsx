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
      const data = await backendAPIInstance.getEventsByUser();
      const convertedData = data.events.map((event) => {
        return {
          id: event._id,
          name: event.name,
          title: event.image,
          startDate: new Date(event.timestamp),
          endDate: new Date(event.timestamp).setHours(0, 30, 0, 0),
        };
      });
      setData(convertedData);
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
    </div>
  );
}

export default Calendar;
