import axios from "axios";

const endpoint = "http://34.202.164.1/api/v1";

export const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginApi = (data) => {
  return axios.post(`${endpoint}/user/login`, data);
};

export const signUpApi = (data) => {
  return axios.post(`${endpoint}/user/register`, data);
};

export const getLaborers = () => {
  return axios.get(`${endpoint}/labourers/list`);
};

export const addLaborer = (data) => {
  return axios.post(`${endpoint}/labourers/labourer`, data);
};

export const fetchIntraDayStats = (id) => {
  return axios.get(`${endpoint}/labourers/labour/${id}`);
};

export const fetchLaborerStats = (id, start, end) => {
  return axios.get(
    `${endpoint}/labourers/labour/range/${id}/fromdate/${start}/enddate/${end}`
  );
};
