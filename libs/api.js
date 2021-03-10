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
export const getHome = async (
  token,
  page = 1,
  sortBy = "createdAt",
  sortType = "DESC",
  search = ""
) => {
  const { data } = await http(token).get(
    `home?page=${page}&&sortBy=${sortBy}&&sortType=${sortType}&&search[name]=${search}`
  );

  return data;
};
export const getDetailsUser = async (token, id) => {
  const {data} = await http(token).get(`/home/${id}`);
  return data;
};

// * PROFILE WORKER API
export const getProfileWorker = async (token) => {
  const { data } = await http(token).get("worker/account");
  return data;
};
export const getProfileRecruiter = async (token) => {
  const { data } = await http(token).get("recruiter/account");
  return data;
};
export const updateProfile = (token, data) => {
  return http(token).patch("worker/account", qs.stringify(data));
};
export const updateImageProfile = (token, data) => {
  return http(token).patch("worker/account", data);
};

// * PROFILE COMPANY API
export const getCompany = async (token) => {
  const { data } = await http(token).get("recruiter/company/self");
  return data;
};
export const updateCompany = (token, data) => {
  return http(token).patch("recruiter/company", qs.stringify(data));
};
export const updateImageCompany = (token, data) => {
  return http(token).patch("recruiter/company", data);
};

// * PORTFOLIO API
export const getPortfolioDetail = async (token, id) => {
  const { data } = await http(token).get(`worker/portofolio/${id}`);
  return data;
};
export const addPortfolio = (token, data) => {
  return http(token).post("worker/portofolio", data);
};
export const updatePortfolio = (token, id, data) => {
  return http(token).patch(`worker/portofolio/${id}`, data);
};
export const deletePortfolio = (token, id) => {
  return http(token).delete(`worker/portofolio/${id}`);
};

// * WORKEXP API
export const getWorkerExpDetail = async (token, id) => {
  const { data } = await http(token).get("/worker/experience" + id);
  return data;
};
export const addWorkerExp = (token, data) => {
  return http(token).post("worker/experience", qs.stringify(data));
};
export const updateWorkerExp = (token, id, data) => {
  return http(token).patch(`worker/experience/${id}`, qs.stringify(data));
};
export const deleteWorkerExp = (token, id) => {
  return http(token).delete(`worker/experience/${id}`);
};

// * MESSAGE API
export const getRecipientProfile = (token, id) => {
  return http(token).get("home/" + id);
};
export const getAllList = async (token) => {
  const {data} = await http(token).get("message/list/person?limit=30");
  return data;
};
export const getPrivateMessage = async (token, id, page) => {
  const {data} = await http(token).get(`message/list/chat/${id}?page=${page}`);
  return data;
};
export const sendChat = (token, id, message) => {
  return http(token).post("message/chat/" + id, qs.stringify({ message }));
};
export const readChat = (token, id) => {
  return http(token).patch("message/read/" + id);
};
