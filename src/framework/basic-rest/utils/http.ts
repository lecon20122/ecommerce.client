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

export default http;
