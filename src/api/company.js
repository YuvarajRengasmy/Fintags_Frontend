import API from "./api"
import { Company } from "./endpoints"


export const RegisterPage = (data)=>{
    return API.post(`${Company}`,data)
}

export const forgotPassword = (data) => {
    return API.put(`${Company}/forgotPassword`, data);
  };


  export const resetPassword = (data) => {
    return API.put(`${Company}/resetPassword`, data);
  };

