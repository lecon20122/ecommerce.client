import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useUI } from '../../../contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../utils/routes';

export interface UpdateProductProps {
    ar: string
    en: string
    price: number,
    store_id: number,
    slug: string
}



async function updateStoreProduct(props: UpdateProductProps) {
    const response = await http.post(API_ENDPOINTS.STORE_PRODUCT_UPDATE + '/' + props.slug, props);
    return response
}

export const useUpdateStoreProductMutation = () => {
    const { width } = useWindowSize();
    const router = useRouter()
    const { setModalView, openModal } = useUI();
    const queryClient = useQueryClient()
    return useMutation((input: UpdateProductProps) => updateStoreProduct({ ...input, slug: router.query.slug as string }), {
        onSuccess: (data) => {
            queryClient.setQueryData([API_ENDPOINTS.STORE_PRODUCT_DETAILS], data.data)
            toast.success("Product updated!", {
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
            router.push(ROUTES.DASHBOARD_PRODUCT + '/' + data.data.slug)
        },
        onError: (error: AxiosError, _variables: UpdateProductProps, _context) => {
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
