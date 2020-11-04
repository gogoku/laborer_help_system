import axios from "axios";

const endpoint = "https://54.157.153.53/api/v1";

// const endpoint = "https://a5f9d129874c.ngrok.io/api/v1";

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

export const fetchLaborerStats = (id, start) => {
  return axios.get(`${endpoint}/labourers/labour/${id}/date/${start}`);
};

export const addPaymentId = (id) => {
  return axios.post(`${endpoint}`, { id });
};
