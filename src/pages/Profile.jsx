import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
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
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "../data/appointments";
import { BackendAPI } from "../api/BackendAPIHandler";

function Profile() {
  const { logOutUser, user } = useContext(AuthContext);
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState();
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const backendAPIInstance = new BackendAPI();

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

  const handleMoodSelection = async (emoji) => {
    setSelectedEmoji(emoji);
    const today = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveMood(emoji, today);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user && user.email}
      <div className="calendar-flex">
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
              <AppointmentForm />
            </Scheduler>
          </Paper>
        </div>
        <div className="right-side-menu">
          <div id="mood-selection">
            <h2>Select your mood</h2>
            <div className="mood-container">
              <span
                className={`emoji ${selectedEmoji === "😊" ? "selected" : ""}`}
                onClick={() => handleMoodSelection("😊")}
              >
                😊
              </span>
              <span
                className={`emoji ${selectedEmoji === "😔" ? "selected" : ""}`}
                onClick={() => handleMoodSelection("😔")}
              >
                😔
              </span>
              <span
                className={`emoji ${selectedEmoji === "😡" ? "selected" : ""}`}
                onClick={() => handleMoodSelection("😡")}
              >
                😡
              </span>
              <span
                className={`emoji ${selectedEmoji === "😍" ? "selected" : ""}`}
                onClick={() => handleMoodSelection("😍")}
              >
                😍
              </span>
              <span
                className={`emoji ${selectedEmoji === "😴" ? "selected" : ""}`}
                onClick={() => handleMoodSelection("😴")}
              >
                😴
              </span>
            </div>
          </div>
          <div>
            <h2>Add an activity</h2>
          </div>
        </div>
      </div>

      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default Profile;