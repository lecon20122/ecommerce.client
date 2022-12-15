import axios from "axios";
import Cookies from "js-cookie";
import { signOut } from 'next-auth/react'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// http.interceptors.response.use(
//   function (response) {
//     // Call was successful, don't do anything special.
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       signOut({ redirect: false })
//       Cookies.remove("modaje_session");
//       Cookies.remove("XSRF-TOKEN");
//     }
//     return Promise.reject(error);
//   });



export default http;
