import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getQuestions = () => API.get("/questions");
export const submitAnswers = (data) => API.post("/questions/submit", data);


export const registerUser = (user) => API.post("/auth/register", user);
export const loginUser = (user) => API.post("/auth/login", user);