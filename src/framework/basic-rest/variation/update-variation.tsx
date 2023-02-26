import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';

export interface UpdateVariationProps {
    variation_id: number | undefined,
    price?: number,
    title?: string,
    order?: number,
    variation_type_value_id?: number
    queryKey: any
}

async function UpdateVariation(inputs: UpdateVariationProps) {
    const response = await http.post(API_ENDPOINTS.STORE_VARIATION_UPDATE + '/' + inputs.variation_id , inputs);
    return response
}

export const useUpdateVariationMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()

    return useMutation((input: UpdateVariationProps) => UpdateVariation(input), {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries(variables.queryKey)

            toast.success("Updated", {
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
        onError: (error: AxiosError, _variables: UpdateVariationProps, _context) => {
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
