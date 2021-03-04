import http from "../helpers/http";
import qs from "querystring";

// * AUTH API
export const login = (data) => {
  return http().post("auth/login", qs.stringify(data));
};

export const registerWorker = (data) => {
  return http().post("auth/signup/2", qs.stringify(data));
};

export const registerRecruiter = (data) => {
  return http().post("auth/signup/3", qs.stringify(data));
};

export const forgotPassword = (data) => {
  return http().post("auth/reset/password", qs.stringify(data));
};

export const resetPassword = (id, data) => {
  return http().put(`auth/reset/password/${id}`, qs.stringify(data));
};

// * HOME API
export const getHome = (
  token,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "DESC"
) => {
  return http(token).get(
    `home?page=${page}&&limit=${limit}&&sortBy=${sortBy}&&sortType=${sortType}`
  );
};

export const getDetailsUser = (token, id) => {
  return http(token).get(`/home/${id}`);
};

// * MESSAGE API
export const getRecipientProfile = (token, id) => {
  return http(token).get("home/" + id);
};

export const getAllList = (token, page) => {
  return http(token).get("message/list/person?" + qs.stringify({page}));
};

export const getPrivateMessage = (token, id, page) => {
  return http(token).get("message/list/chat/" + id + "?" + qs.stringify({page}));
};

export const sendChat = (token, id, message) => {
  return http(token).post("message/chat/" + id, qs.stringify({ message }));
};

export const readChat = (token, id) => {
  return http(token).patch("message/read/" + id);
};
