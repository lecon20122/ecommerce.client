import React from 'react'
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';
import Button from '@components/ui/button';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VariationForm from '@components/variation/variation-form';
import VariationGallery from '@components/variation/variation-gallery';

export default function VariationDetail() {

    return (
        <StoreDashboardLayoutTwo>
            <div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2">
                    <Button>Add Stock</Button>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 flex flex-wrap justify-center items-center">
                    <VariationForm />
                    <VariationGallery/>
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