import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Toolbar,
  DateNavigator,
  TodayButton,
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { BackendAPI } from "../api/BackendAPIHandler";

function convertType(type) {
  switch (type) {
    case "happy":
      return "😊";
    case "sad":
      return "😔";
    case "angry":
      return "😡";
    case "in love":
      return "😍";
    case "sleepy":
      return "😴";
    default:
      return "";
  }
}

function Calendar() {
  const [data, setData] = useState();
  const [currentDate, setCurrentDate] = useState();

  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    (async () => {
      const data = await backendAPIInstance.getMoods();
      const convertedData = data.moods.map((mood) => {
        return {
          id: mood._id,
          title: convertType(mood.title),
          startDate: new Date(mood.timestamp),
          endDate: new Date(mood.timestamp).setHours(0, 30, 0, 0),
        };
      });
      console.log(convertedData);
      setData(convertedData);
    })();
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    let currentData = data;
    if (added) {
      const startingAddedId =
        currentData.length > 0 ? currentData[currentData.length - 1].id + 1 : 0;
      currentData = [...currentData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      currentData = currentData.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      currentData = currentData.filter(
        (appointment) => appointment.id !== deleted
      );
    }
    setData(currentData);
  };

  return (
    <div>
      <div className="calendar-container">
        <Paper>
          <Scheduler data={data} height={600}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={(newDate) => setCurrentDate(newDate)}
            />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
          </Scheduler>
        </Paper>
      </div>
    </div>
  );
}

export default Calendar;
