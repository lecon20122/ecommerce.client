import { GetServerSideProps } from 'next';
import React from 'react'
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';

export default function EditProduct() {
    return (
        <StoreDashboardLayoutTwo>
            <div>EditProduct</div>
        </StoreDashboardLayoutTwo>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const session = await getAuthSession(ctx)
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
