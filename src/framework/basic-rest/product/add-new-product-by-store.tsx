import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface AddProductProps {
    ar: string
    en: string
    price: number,
    store_id: number
}



async function createNewProduct(props: AddProductProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT, props);
    return response
}

export const useCreateProductMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: AddProductProps) => createNewProduct(input), {
        onSuccess: (data) => {

            queryClient.setQueryData([API_ENDPOINTS.STORE_PRODUCTS], data.data)

            toast.success("New Product Created", {
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
        onError: (error: AxiosError, _variables: AddProductProps, _context) => {
            if (error.response?.status === 401) {
                setModalView('LOGIN_VIEW')
                openModal()
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
