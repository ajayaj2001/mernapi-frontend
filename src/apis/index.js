import axios from "axios";
import { baseURL } from "../constant";

//for create new field
export const createField = (values) => {
  return axios
    .post(`${baseURL}/create`, {
      ...values,
    })
    .then((response) => {
      return response.data;
    });
};

//for update particular field
export const updateField = (values) => {
  return axios
    .post(`${baseURL}/update`, {
      ...values,
    })
    .then((response) => {
      return response.data;
    });
};

//to get all field
export const getAllFields = () => {
  return axios.get(`${baseURL}/`).then((response) => {
    return response.data;
  });
};
