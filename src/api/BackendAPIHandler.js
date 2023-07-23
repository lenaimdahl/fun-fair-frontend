import axios from "axios";
import { API_URL } from "../config/config.index";

export class BackendAPI {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  async getUserData() {
    const { data } = await this.api.get("/api/user");
    return data;
  }

  async getNonFriends() {
    const { data } = await this.api.get("/api/nonfriends");
    return data;
  }

  async getFriends() {
    const { data } = await this.api.get("/api/friends");
    return data;
  }

  async addFriendToUser(userId) {
    const { data } = await this.api.post("/api/addFriend", {
      userId,
    });
    return data;
  }

  async saveMood(type, timestamp) {
    try {
      const { data } = await this.api.post("/api/mood", {
        title: type,
        timestamp: timestamp,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getMoodForDay(timestamp) {
    try {
      const { data } = await this.api.get(`/api/mood/${timestamp}`);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getMoods() {
    const { data } = await this.api.get("/api/moods");
    return data;
  }

  async saveActivity(activity) {
    const { data } = await this.api.post("/activity", {
      title: activity,
    });
    return data;
  }

  async getEventsInCalendar() {
    const { data } = await this.api.get("/api/events-calendar");
    return data;
  }

  //saves existing event in a calendar of a given user
  async addEventToCalendar(eventToAdd) {
    const { data } = await this.api.post("/api/meeting", eventToAdd);
    return data;
  }

  //fetches all the events from DB to populate select menu
  async getEvents() {
    const { data } = await this.api.get("/api/events");
    return data;
  }

  async getMeetingsByUser() {
    const { data } = await this.api.get("/api/meetings-calendar");
    return data;
  }

  //saves a new event from new event form in general events DB
  async saveEvent(newEvent) {
    const { data } = await this.api.post("/api/new-event", newEvent);
    return data;
  }

  async saveEntry(entryText, currentDay) {
    try {
      const { data } = await this.api.post("/api/entry", {
        text: entryText,
        timestamp: currentDay,
      });
      return data;
    } catch (err) {
      console.error("ERROR while saving entry to db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async searchEntries(startDate) {
    try {
      const { data } = await this.api.post("/api/entry/search", { startDate });
      return data;
    } catch (err) {
      console.error("ERROR while fetching all meetings from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async deleteEntry(id) {
    try {
      return this.api.delete(`/api/entry/${id}`);
    } catch (err) {
      console.error("ERROR while deleting entry from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async updateEntry(id, entryText) {
    try {
      return this.api.patch(`/api/entry/${id}`, { text: entryText });
    } catch (err) {
      console.error("ERROR while updating entry in db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async deleteMeeting(id) {
    try {
      return this.api.delete(`/api/meeting/${id}`);
    } catch (err) {
      console.error("ERROR while deleting meeting from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async updateGoal(weeklyGoal) {
    try {
      return this.api.patch(`/api/newGoal`, { weeklyGoal });
    } catch (err) {
      console.error("ERROR while fetching all events from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async verifyUser(token) {
    try {
      const { data } = await this.api.get("/auth/verify", {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      console.error("ERROR while fetching all events from db:", err);
      throw new Error("Internal Server Error");
    }
  }
}
