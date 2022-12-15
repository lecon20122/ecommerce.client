import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface UpdateCartItemQuantityProps {
    cart_id: number | undefined,
    quantity: number | undefined
}



async function updateCartItemQuantity({ cart_id, quantity }: UpdateCartItemQuantityProps) {
    const response = await http.put(API_ENDPOINTS.CART, { id: cart_id, quantity: quantity });
    return response
}

export const useUpdateCartItemQuantityMutation = () => {

    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: UpdateCartItemQuantityProps) => updateCartItemQuantity(input), {
        onSuccess: (data) => {

            queryClient.setQueryData([API_ENDPOINTS.GET_CART], data.data)

            toast.success("Item quantity updated", {
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
        onError: (error: AxiosError, _variables: UpdateCartItemQuantityProps, _context) => {
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
