import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface DeleteVariation {
    id: number,
}

async function deleteVariation(inputs: DeleteVariation) {
    const response = await http.post(API_ENDPOINTS.STORE_VARIATION_DELETE_VARIATION + '/' + inputs.id);
    return response
}

export const useDeleteVariationMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()

    return useMutation((input: DeleteVariation) => deleteVariation(input), {
        onSuccess: (data) => {
            console.log(data.data);
            queryClient.refetchQueries([API_ENDPOINTS.STORE_PRODUCT_DETAILS])

            toast.success("Deleted", {
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
        onError: (error: AxiosError, _variables: DeleteVariation, _context) => {
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
