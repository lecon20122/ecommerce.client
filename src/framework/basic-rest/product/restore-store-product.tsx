import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

export interface Props {
    id: number
}



async function restoreStoreProduct(props: Props) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_RESTORE, props);
    return response
}

export const useRestoreProductMutation = () => {
    const { width } = useWindowSize();
    const queryClient = useQueryClient()
    return useMutation((input: Props) => restoreStoreProduct(input), {
        onSuccess: (data) => {

            queryClient.setQueryData([API_ENDPOINTS.STORE_PRODUCTS], data.data)

            toast.success("Product Restored", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-center" : "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                progress: 0
            });
        },
        onError: (error: AxiosError, _variables: Props, _context) => {
            if (error.response?.status === 401) {
                Cookies.remove("modaje_session");
                Cookies.remove("XSRF-TOKEN");
                signOut({ redirect: false })
                Router.push("/");
            } else {
                toast.error(error.response?.data.message, {
                    progressClassName: "fancy-progress-bar",
                    position: width > 768 ? "bottom-right" : "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        },
    });
};
