import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation} from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';

export interface AddProductMegaFormProps {
    data: any
}


async function createNewProduct({ data }: AddProductMegaFormProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_MEGA_FORM, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response
}

export const useCreateProductMegaFormMutation = () => {
    const { push } = useRouter()
    const { width } = useWindowSize();
    const { setModalView, openModal } = useUI();
    return useMutation((input: AddProductMegaFormProps) => createNewProduct(input), {
        onSuccess: (data) => {
            sessionStorage.removeItem('create-product-form')
            push(ROUTES.DASHBOARD_PRODUCTS)
            toast.success("New Product Created", {
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
        onError: (error: AxiosError, _variables: AddProductMegaFormProps, _context) => {
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
