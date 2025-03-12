import API from "./api"
import { FileUpload } from "./endpoints"

export const saveFileUpload = (data) => {
    return API.post(`${FileUpload}/save`, data)
}

export const getallFileUpload = () => {
    return API.get(`${FileUpload}/`)
}

export const getSingleFileUpload = (data) => {
    return API.get(`${FileUpload}/getSingleFileUpload`, { params: { _id: data } });
  };
  export const deleteFileUpload = (data) => {
    return API.delete(`${FileUpload}`, { params: { _id: data } });
  };
  export const updateFileUpload = (data) => {
    return API.put(`${FileUpload}`, data);
  };

  export const getFilterFileUpload = (data) => {
    return API.put(`${FileUpload}/getFilterFileUpload`, data);
  };