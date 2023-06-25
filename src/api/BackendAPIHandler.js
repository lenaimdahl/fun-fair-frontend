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
}
