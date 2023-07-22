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
      const { data } = await this.api.get("/api/moods", {
        params: { timestamp },
      });
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
    const { data } = await this.api.post("/api/activity", {
      title: activity,
    });
    return data;
  }

  async getEventsInCalendar() {
    const { data } = await this.api.get("/api/events-calendar");
    return data;
  }

  //saves existing event in a calendar of a given user
  async addEventToCal(eventToAdd) {
    const { data } = await this.api.post("/api/meetings", eventToAdd);
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

  async saveText(text, currentDay) {
    const { data } = await this.api.post("/api/text", {
      text,
      timestamp: currentDay,
    });
    return data;
  }

  async searchMeetings(startDate) {
    try {
      const { data } = await this.api.post(`/api/search`, { startDate });
      return data;
    } catch (err) {
      console.error("ERROR while fetching all meetings from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async deleteEntry(id) {
    try {
      return this.api.delete(`/api/text/${id}`);
    } catch (err) {
      console.error("ERROR while fetching all events from db:", err);
      throw new Error("Internal Server Error");
    }
  }

  async updateEntry(id, text) {
    try {
      return this.api.patch(`/api/text/${id}`, { text });
    } catch (err) {
      console.error("ERROR while fetching all events from db:", err);
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
}
