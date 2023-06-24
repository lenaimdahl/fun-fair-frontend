import axios from "axios";

export class BoredAPI {
  constructor() {
    this.BASE_URL = "https://www.boredapi.com/api";
  }
  async getActivity() {
    const { data } = await axios.get(`${this.BASE_URL}/activity`);
    return data;
  }
}