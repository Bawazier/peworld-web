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
  const {data: dataUser} = await http(token).get(`/home/${id}`);
  const { data: dataCompany } = await http(token).get("recruiter/company/self");
  const data = {...dataUser.results, ...dataCompany.results};
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
