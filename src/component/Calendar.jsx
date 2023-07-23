import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global.context";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Toolbar,
  DateNavigator,
  TodayButton,
  Scheduler,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

function Calendar() {
  const { meetings } = useContext(GlobalContext);

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    const convertedData = meetings.map((meeting, index) => {
      return {
        title: meeting.title,
        id: index,
        startDate: new Date(meeting.timestamp),
        endDate: new Date(new Date(meeting.timestamp).setHours(0, 30, 0, 0)),
      };
    });
    setData(convertedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetings]);

  return (
    <div className="calendar-container">
      <Paper>
        <Scheduler data={data} height={700}>
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
  );
}

export default Calendar;
