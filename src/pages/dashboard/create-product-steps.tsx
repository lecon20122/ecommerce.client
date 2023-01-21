import React, { useState } from 'react';
import StoreDashboardLayoutTwo from '../../components/layout/store-dashboard-layout.-two';
import CreateProduct from '../../components/product/create-product-form';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateProductFormStepOne from '../../components/product/stepsComponent/create-product-step';



export default function CreateProductStepOne() {
    return (
        <StoreDashboardLayoutTwo>
            <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full overflow-hidden">
                <CreateProductFormStepOne />
                <CreateProduct/>
            </div>
        </StoreDashboardLayoutTwo>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    if (session?.user.is_owner) {
        return {
            props: {
                ...(await serverSideTranslations(ctx.locale!, ['menu', 'common', 'forms'])),
            },
        };
    }
    return {
        redirect: { destination: "/404", permanent: false },
        props: {}
    }
};
