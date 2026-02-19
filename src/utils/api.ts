import axios from "axios";
import { ApiError } from "./ApiError";

const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
const PROD_BACKEND = import.meta.env.VITE_PROD_BACKEND;

const api = axios.create({
  baseURL: LOCAL_BACKEND || PROD_BACKEND,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (request) => {
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    console.log("RESPONSE ERROR", data ?? error);
    const message = data?.message ?? error.message ?? "알 수 없는 오류";
    const isUserError = data?.isUserError ?? false;
    return Promise.reject(new ApiError(message, isUserError));
  }
);

export default api;
