import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface LoginInputType {
  type: "third-party" | "credentials",
  provider?: "google" | "facebook",
  email?: string;
  password?: string;
  remember_me?: boolean;
  accessToken?: string,
}



async function login(input: LoginInputType) {
  await http.get(API_ENDPOINTS.SANCTUM_COOKIE, { headers: { origin: process.env.NEXTAUTH_URL ?? 'http://localhost:3000' } })

  if (input.type === "third-party") {
    const OauthUser = await http.post(API_ENDPOINTS.THIRD_PARTY_LOGIN, { token: input.accessToken, provider: input.provider });
    return OauthUser.data
  } else {
    const user = await http.post(API_ENDPOINTS.LOGIN, { email: input.email, password: input.password });
    return user.data
  }


}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      authorize()
      closeModal();
    },
    onError: (data) => {
    },
  });
};
