import axios, { AxiosInstance } from "axios";

const client: (token: string | undefined) => AxiosInstance = function(
  token?: string | undefined
) {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
    headers: token ? { Authorization: `Bearer ${token}` } : null
  });
};

export default client;
