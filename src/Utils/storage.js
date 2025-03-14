import CryptoJS from "crypto-js";


export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem('loginType', CryptoJS.AES.encrypt((data?.loginType), 'fintags').toString())

  if (data?.loginType === 'company') {
    localStorage.setItem('companyId', CryptoJS.AES.encrypt((data?.companyId), 'fintags').toString())
  }
 
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCompanyId = () => {
  const adminId = localStorage.getItem('companyId')
  return CryptoJS.AES.decrypt(adminId, 'fintags').toString(CryptoJS.enc.Utf8)
};

export const getLoginType = () => {
  const loginType = localStorage.getItem('loginType')
  return CryptoJS.AES.decrypt(loginType, 'fintags').toString(CryptoJS.enc.Utf8)
};

export const clearStorage = () => {
  localStorage.clear()
};