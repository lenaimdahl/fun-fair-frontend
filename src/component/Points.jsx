import React, { useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

function Points() {
  const [meetings, setMeetings] = useState([]);
  const [weekPoints, setWeekPoints] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    // Fetch meetings from your data source
    const fetchMeetings = async () => {
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - daysUntilMonday); // Start date (Monday) of the week
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // End date (Sunday) of the week

      // Make an API request or retrieve meetings from a local data store
      const fetchedMeetings = await backendAPIInstance.getMeetingsByUser();
      const fetchedMeetingsArray = fetchedMeetings.meetings;

      console.log("fetched meetings by user", fetchedMeetings);

      // Filter meetings for the week (Monday to Sunday)
      const weekMeetings = fetchedMeetingsArray.filter((meeting) => {
        const meetingDate = new Date(meeting.timestamp);
        return meetingDate >= startDate && meetingDate <= endDate;
      });

      console.log("week meetings by user", weekMeetings);

      setMeetings(weekMeetings);
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    const weekPointsfromMeetings = meetings.map((oneMeeting) => {
      return Number(oneMeeting.points);
    });

    const sumOfPoints = weekPointsfromMeetings.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    setWeekPoints(sumOfPoints);
  }, [meetings]);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await backendAPIInstance.getUserData();
      const usersWeeklyGoal = fetchedUser.user.weeklyGoal;
      console.log("user point goal", usersWeeklyGoal);

      setWeeklyGoal(usersWeeklyGoal);
    };

    fetchUserData();
  }, []);

  return (
    <div className="points-box">
      <p>
        Your score: <br></br>
        <h3 className={weekPoints > weeklyGoal ? "points-green" : "points-red"}>
          {weekPoints}
        </h3>
      </p>
      <p>
        Your weekly goal: <br></br>
        <h3 className="points-highlighter">{weeklyGoal}</h3>
      </p>
    </div>
  );
}

export default Points;
