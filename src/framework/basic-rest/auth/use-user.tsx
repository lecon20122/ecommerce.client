import http from '@framework/utils/http';
import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { User } from '@framework/types';
import { useUI } from '../../../contexts/ui.context';


async function getUser() {

    const data = await http.get(API_ENDPOINTS.USER)

    return data.data
}

interface useUserQueryProps {
    isAuthRequired: boolean
}

export const useUserQuery = (options: useUserQueryProps) => {
    const router = useRouter()
    const { authorize, closeModal } = useUI();
    return useQuery<User, Error>(API_ENDPOINTS.USER, () => getUser(), {
        onSuccess(data) {
            authorize()
        },
        onError(err) {
            if (options.isAuthRequired) {
                router.push('/signin')
            }
        },
        retry: false
    })
};
