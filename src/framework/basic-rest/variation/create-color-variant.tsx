import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface CreateColorVariantProps {
    price: number,
    product_id: number,
    variation_type_value_id: number,
    store_id: number,
    parent_id?: number,
    order?: number,
    images: any
}



async function createColorVariation(inputs: CreateColorVariantProps) {
    const response = await http.post(
        API_ENDPOINTS.STORE_VARIATION_CREATE_COLOR, inputs, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    });
    return response
}

export const useCreateColorVariationMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()

    return useMutation((input: CreateColorVariantProps) => createColorVariation(input), {
        onSuccess: (data) => {
            console.log(data.data);
            queryClient.refetchQueries<any>([API_ENDPOINTS.STORE_PRODUCT_DETAILS])
            toast.success("Color Added", {
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
        onError: (error: AxiosError, _variables: CreateColorVariantProps, _context) => {
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
