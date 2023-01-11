import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface AttachCategoryProps {
    ids: number[] | number
    product_id: number
}



async function attachCategoryToProduct(props: AttachCategoryProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_ATTACH_CATEGORY + '/' + props.product_id, { id: props.ids });
    return response
}

export const useAttachCategoryTtMutation = () => {

    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();

    const queryClient = useQueryClient()

    return useMutation((input: AttachCategoryProps) => attachCategoryToProduct(input), {
        onSuccess: (data) => {
            queryClient.setQueryData([API_ENDPOINTS.STORE_PRODUCT_DETAILS], data.data)
            toast.success("Product categories updated", {
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
        onError: (error: AxiosError, _variables: AttachCategoryProps, _context) => {
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
