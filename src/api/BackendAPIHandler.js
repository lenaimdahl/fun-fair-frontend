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

  async login(loginData) {
    const { data } = await this.api.post("/auth/login", loginData);
    return data;
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
    const { data } = await this.api.post("/api/mood", {
      title: type,
      timestamp: timestamp,
    });
    return data;
  }

  async getMoodForDay(timestamp) {
    const { data } = await this.api.get(`/api/mood/${timestamp}`);
    return data;
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
    const { data } = await this.api.post("/api/entry", {
      text: entryText,
      timestamp: currentDay,
    });
    return data;
  }

  async searchEntries(startDate) {
    const { data } = await this.api.post("/api/entry/search", { startDate });
    return data;
  }

  async deleteEntry(id) {
    return this.api.delete(`/api/entry/${id}`);
  }

  async updateEntry(id, entryText) {
    return this.api.patch(`/api/entry/${id}`, { text: entryText });
  }

  async deleteMeeting(id) {
    return this.api.delete(`/api/meeting/${id}`);
  }

  async updateGoal(weeklyGoal) {
    return this.api.patch(`/api/newGoal`, { weeklyGoal });
  }

  async verifyUser(token) {
    const { data } = await this.api.get("/auth/verify", {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  }

  async signup(requestBody) {
    await this.api.post("/auth/signup", requestBody);
  }
}
