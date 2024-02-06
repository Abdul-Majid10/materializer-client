import axios from "axios";

export const BASE_URL = "https://materializer-server.vercel.app/api/";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  return currentUser?.token;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = () => {
  const token = getToken();
  return axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${token}` },
  });
};