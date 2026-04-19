import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getQuestions = () => API.get("/questions");
export const submitAnswers = (data) => API.post("/questions/submit", data);