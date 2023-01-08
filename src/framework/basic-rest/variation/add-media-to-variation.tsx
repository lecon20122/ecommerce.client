import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import axios from 'axios';

export interface Props {
    images: any
    variation_id: number
}



async function addMediaToVariation({ images, variation_id }: Props) {
    const response = await http.post(
        API_ENDPOINTS.STORE_VARIATION_ADD_MEDIA + '/' + variation_id,
        images, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    );
    return response
}

export const useAddMediaToVariationMutation = () => {
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: Props) => addMediaToVariation(input), {
        onSuccess: (data) => {

            queryClient.setQueryData([API_ENDPOINTS.STORE_VARIATION], data.data)

            toast.success("New Image Created", {
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
        onError: (error: AxiosError, _variables: Props, _context) => {
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
