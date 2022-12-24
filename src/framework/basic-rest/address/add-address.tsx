import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import { Cart } from './use-get-cart';
import Cookies from 'js-cookie';

export interface AddAddressInputProps {
    name: string;
    phone: string;
    street: string;
    building: string;
    floor: string;
    apartment_number: string;
    district_id: number;
    nearby_landmark: string;
    type: "home" | "office";
}



async function createAddress(input: AddAddressInputProps) {
    const response = await http.post(API_ENDPOINTS.ADDRESS, input);
    return response
}

export const useCreateAddressMutation = () => {

    const { width } = useWindowSize();
    const queryClient = useQueryClient()
    return useMutation((input: AddAddressInputProps) => createAddress(input), {
        onSuccess: (data) => {
            queryClient.setQueryData([API_ENDPOINTS.ADDRESS], data.data)
            
            toast.success("New Address Created", {
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
        onError: (error: AxiosError, _variables: AddAddressInputProps, _context) => {
            toast.error(error.response?.data.message, {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
    });
};
