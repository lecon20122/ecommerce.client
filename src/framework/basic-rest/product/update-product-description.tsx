import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface AddProductDescriptionProps {
    ar: string
    en: string
    product_id: number,
    product_attribute_id: number
    product_description_id: number
}



async function updateProductDescription(props: AddProductDescriptionProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_UPDATE_DESCRIPTION + '/' + props.product_description_id, props);
    return response
}

export const useUpdateProductDescriptionMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: AddProductDescriptionProps) => updateProductDescription(input), {

        onSuccess: (data) => {

            queryClient.refetchQueries([API_ENDPOINTS.STORE_PRODUCT_DETAILS])
            
            toast.success("Description updated", {
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
        onError: (error: AxiosError, _variables: AddProductDescriptionProps, _context) => {
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
