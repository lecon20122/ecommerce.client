import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import { Cart } from './use-get-cart';

export interface RemoveFromCartProps {
    cart_id: number,
}



async function removeItem({ cart_id }: RemoveFromCartProps) {
    const response = await http.delete(API_ENDPOINTS.CART, { data: { id: cart_id } });
    return response
}

export const useRemoveFromCartMutation = () => {

    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: RemoveFromCartProps) => removeItem(input), {
        onSuccess: (data) => {

            queryClient.setQueryData([API_ENDPOINTS.GET_CART], data.data as Cart[])

            toast.success("Item Removed", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-center" : "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        },
        onError: (error: AxiosError, _variables: RemoveFromCartProps, _context) => {
            if (error.response?.status === 401) {
                setModalView('LOGIN_VIEW')
                openModal()
            } else {
                toast.error(error.response?.data.message, {
                    progressClassName: "fancy-progress-bar",
                    position: width > 768 ? "bottom-left" : "bottom-center",
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
