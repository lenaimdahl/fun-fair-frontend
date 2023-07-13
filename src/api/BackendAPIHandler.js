import axios from "axios";

export class BackendAPI {
  constructor() {
    //instead of writing axios. now always write this.api. to do a post or get... and then the token will always be sent too. if not, we have to send it everytime with:
    // const gotToken = localStorage.getItem("authToken");
    //     const { data } = await axios.get("http://localhost:5005/auth/verify", {
    //       headers: { authorization: `Bearer ${gotToken}` },
    //     });

    // creates a axios client, like a class
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });
    // edits every requests to add the current token
    this.api.interceptors.request.use((config) => {
      // get token from local storage
      const storedToken = localStorage.getItem("authToken");
      // pass stored token to headers
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  async getNonFriends() {
    const { data } = await this.api.get("/api/nonfriends");
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
  //saves existing event in a calendar of a given user
  async addEventToCal(eventToAdd) {
    const { data } = await this.api.post("/api/event", eventToAdd);
    return data;
  }

  //fetches all the events from DB to populate select menu
  async getEvents() {
    const { data } = await this.api.get("/api/events");
    return data;
  }

  async getEventsByUser() {
    const { data } = await this.api.get("/api/events-calendar");
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

  async searchEvents(startDate) {
    try {
      const { data } = await this.api.post(`/api/search`, { startDate });
      return data;
    } catch (err) {
      console.error("ERROR while fetching all events from db:", err);
      throw new Error("Internal Server Error");
    }
  }
}
