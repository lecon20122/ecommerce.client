import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import { Cart } from './use-get-cart';
import Cookies from 'js-cookie';

export interface AddToCartInputProps {
    variation_id: number | undefined,
    price: number | undefined
    variation_parent_id: number | undefined,
    store_id: number | undefined,
}



async function addToCart(input: AddToCartInputProps) {
    const response = await http.post(API_ENDPOINTS.ADD_TO_CART, input);
    return response
}

export const useAddToCartMutation = () => {

    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: AddToCartInputProps) => addToCart(input), {
        onSuccess: (data) => {
            
            queryClient.setQueryData([API_ENDPOINTS.GET_CART] , data.data)

            toast.success("Added to the bag", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        },
        onError: (error: AxiosError, variables: AddToCartInputProps, _context) => {
            if (error.response?.status === 401) {
                // add the variables to cookie 
                Cookies.set('cart' , JSON.stringify(variables))
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
