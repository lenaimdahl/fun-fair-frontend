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

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // checks if the user is logged in
        if (error.response.status === 401) {
          window.util.logout();
        } else {
          throw error;
        }
      }
    );
  }

  async login(loginData) {
    try {
      const { data } = await this.api.post("/auth/login", loginData);
      return data;
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  }

  async getUserData() {
    try {
      const { data } = await this.api.get("/api/user");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getNonFriends() {
    try {
      const { data } = await this.api.get("/api/nonfriends");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getFriends() {
    try {
      const { data } = await this.api.get("/api/friends");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async addFriendToUser(userId) {
    try {
      const { data } = await this.api.post("/api/addFriend", {
        userId,
      });
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async saveMood(type, timestamp) {
    try {
      const { data } = await this.api.post("/api/mood", {
        title: type,
        timestamp: timestamp,
      });
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getMoodForDay(timestamp) {
    try {
      const { data } = await this.api.get(`/api/mood/${timestamp}`);
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getMoods() {
    try {
      const { data } = await this.api.get("/api/moods");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async saveActivity(activity) {
    try {
      const { data } = await this.api.post("/activity", {
        title: activity,
      });
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getEventsInCalendar() {
    try {
      const { data } = await this.api.get("/api/events-calendar");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  //saves existing event in a calendar of a given user
  async addEventToCalendar(eventToAdd) {
    try {
      const { data } = await this.api.post("/api/meeting", eventToAdd);
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  //fetches all the events from DB to populate select menu
  async getEvents() {
    try {
      const { data } = await this.api.get("/api/events");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  async getMeetingsByUser() {
    try {
      const { data } = await this.api.get("/api/meetings-calendar");
      return data;
    } catch (error) {
      console.error("Error while :", error);
    }
  }

  //saves a new event from new event form in general events DB
  async saveEvent(newEvent) {
    try {
      const { data } = await this.api.post("/api/new-event", newEvent);
      return data;
    } catch (error) {
      console.error("ERROR while saving meetings from db:", error);
      throw error;
    }
  }

  async saveEntry(entryText, currentDay) {
    try {
      const { data } = await this.api.post("/api/entry", {
        text: entryText,
        timestamp: currentDay,
      });
      return data;
    } catch (error) {
      console.error("Error while saving entry:", error);
    }
  }

  async searchEntries(startDate) {
    try {
      const { data } = await this.api.post("/api/entry/search", { startDate });
      return data;
    } catch (error) {
      console.error("Error while searching entries:", error);
    }
  }

  async deleteEntry(id) {
    try {
      await this.api.delete(`/api/entry/${id}`);
    } catch (error) {
      console.error("Error while deleting entries:", error);
    }
  }

  async updateEntry(id, entryText) {
    try {
      await this.api.patch(`/api/entry/${id}`, { text: entryText });
    } catch (error) {
      console.error("Error while updating entry:", error);
    }
  }

  async deleteMeeting(id) {
    try {
      await this.api.delete(`/api/meeting/${id}`);
    } catch (error) {
      console.error("Error while deleting meeting:", error);
    }
  }

  async updateGoal(weeklyGoal) {
    try {
      await this.api.patch(`/api/newGoal`, { weeklyGoal });
    } catch (error) {
      console.error("Error while updating goal:", error);
    }
  }

  async verifyUser(token) {
    try {
      const { data } = await this.api.get("/auth/verify", {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error while verifying user:", error);
    }
  }

  async signup(requestBody) {
    try {
      await this.api.post("/auth/signup", requestBody);
    } catch (error) {
      console.error("Error while signing up:", error);
    }
  }
}
