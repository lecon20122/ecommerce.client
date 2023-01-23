import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export type DiscountType = 'percentage' | 'fixed'

export interface AddProductDiscountProps {
    price: number,
    product_id: number,
    value: number,
    type: DiscountType,
    start_at: string,
    end_at: string,
    is_active: boolean
}



async function createProductDiscount(props: AddProductDiscountProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_DISCOUNT, props);
    return response
}

export const useCreateProductDiscountMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: AddProductDiscountProps) => createProductDiscount(input), {
        onSuccess: (data) => {

            queryClient.refetchQueries([API_ENDPOINTS.STORE_PRODUCTS])

            toast.success(data.data.message, {
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
        onError: (error: AxiosError, _variables: AddProductDiscountProps, _context) => {
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
