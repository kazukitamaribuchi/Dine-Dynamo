import axios from "axios";

// // TODO envなどからbaseURLを参照するように
const baseURL = "http://localhost:8080";

export const AxiosClient = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
});
