import axios from "axios";
export const baseURL='https://upskilling-egypt.com:3005/api'



//public  Dont need Token
export const publicUserAxiosInstance=axios.create({
    baseURL:`${baseURL}`,
})
//private   need Token after login
export const privateUserAxiosInstance=axios.create({
    baseURL:`${baseURL}`,

})


privateUserAxiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



