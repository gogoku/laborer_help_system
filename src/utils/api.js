import axios from "axios";

const endpoint = "http://54.157.153.53/api/v1";

// const endpoint = "https://92499b0f76bb.ngrok.io/api/v1";

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

export const addNewCard = (data) =>
  axios.post(`${endpoint}/payments/add/card`, data);

export const getCardsList = () => axios.get(`${endpoint}/payments/cards`);

export const makePayment = (data) =>
  axios.post(`${endpoint}/labourers/payout/labour`, data);

export const getTipHistory = (labour_id) =>
  axios.get(`${endpoint}/labourers/labour/tip/history/${labour_id}`);

export const getFinanceReport = (start, end) => {
  return axios.get(
    `${endpoint}/labourers/transaction/start_date/${start}/end_date/${end}`
  );
};

export const settleBalance = () =>
  axios.post(`${endpoint}/labourers/clear/payments`);

export const getBalance = () => axios.get(`${endpoint}/user/user/balance`);
