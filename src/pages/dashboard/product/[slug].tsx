import { GetServerSideProps } from 'next';
import React from 'react'
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';
import ProductDetailsFrom from '../../../components/product/product-details';
import VariationList from '@components/product/variation/list-variation';
import { useGetStoreProductDetails } from '@framework/product/get-store-product';
import { useRouter } from 'next/router';


export default function EditProduct() {
    const { query } = useRouter()
    const { data, isLoading } = useGetStoreProductDetails(query.slug as string)
    return (
        <StoreDashboardLayoutTwo>
            <div className=''>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2">
                    <ProductDetailsFrom />
                </div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2">
                    <VariationList variations={data?.variations} />
                </div>
            </div>
        </StoreDashboardLayoutTwo>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if (session?.user.is_owner) {
        return {
            props: {
                ...(await serverSideTranslations
                    (ctx.locale!, ['menu', 'common', 'forms'])),
            },
        };
    }

    return {
        redirect: { destination: "/404", permanent: false },
        props: {
            ...(await serverSideTranslations(ctx.locale!, [
                "menu",
            ])),
        }
    }
};
