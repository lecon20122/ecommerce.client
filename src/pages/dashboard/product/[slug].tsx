import { GetServerSideProps } from 'next';
import React from 'react'
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';
import ProductDetailsFrom from '../../../components/product/product-details';
import VariationList from '@components/product/variation/list-variation';
import { useGetStoreProductDetails } from '@framework/product/get-store-product';
import { useRouter } from 'next/router';
import ProductDescriptionCollapse from '@components/product/product-description';
import AttachedProductCategoriesForm from '@components/product/attached-product-form';


export default function EditProduct() {
    const { query, locale } = useRouter()
    const { data, isLoading } = useGetStoreProductDetails(query.slug as string)
    return (
        <StoreDashboardLayoutTwo>
            <div className='flex md:space-x-1 flex-wrap md:flex-nowrap'>
                <div className="bg-white p-5 rounded-lg shadow-listProduct w-full my-2 md:w-1/4">
                    <ProductDetailsFrom />
                </div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full md:w-2/4">
                    <AttachedProductCategoriesForm />
                </div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full md:w-1/4">
                    <ProductDescriptionCollapse variant='transparent' description={data?.description} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-listProduct my-2">
                <VariationList variationType='product' variations={data?.variations} />
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
