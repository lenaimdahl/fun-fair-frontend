import axios from "axios";

export class BackendAPI {
  constructor() {
    this.BASE_URL = "https://localhost:5005";
  }
  async saveMood(emoji, timestamp) {
    const { data } = await axios.post(`${this.BASE_URL}/mood`, {
      mood: emoji,
      timestamp: timestamp,
    });
    return data;
  }
}
