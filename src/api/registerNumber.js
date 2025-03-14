import API from "./api"
import { RegisterNumber } from "./endpoints"

export const saveRegisterNumber = (data) => {
    return API.post(`${RegisterNumber}`, data)
}

export const getallRegisterNumber = () => {
    return API.get(`${RegisterNumber}/`)
}

export const getSingleRegisterNumber = (data) => {
    return API.get(`${RegisterNumber}/getSingleUpload`, { params: { _id: data } });
  };
  export const deleteRegisterNumber = (data) => {
    return API.delete(`${RegisterNumber}`, { params: { _id: data } });
  };
  export const updateRegisterNumber = (data) => {
    return API.put(`${RegisterNumber}`, data);
  };

  export const getFilterRegisterNumber = (data) => {
    return API.put(`${RegisterNumber}/getFilterFile`, data);
  };