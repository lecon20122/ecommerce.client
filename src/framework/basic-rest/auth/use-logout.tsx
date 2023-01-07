import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import Router from "next/router";
import { useMutation } from "react-query";


async function logout() {
  return http.post(API_ENDPOINTS.LOGOUT);
}

export const useLogoutMutation = () => {
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove("modaje_session");
      Cookies.remove("XSRF-TOKEN");
      signOut({ redirect: false })
      Router.push("/");
    },
    onError: (data) => {
      Cookies.remove("modaje_session");
      Cookies.remove("XSRF-TOKEN");
      signOut({ redirect: false  })
      Router.push("/");
    },
  });
};
