import StoreDashboardLayoutTwo from '@components/layout/store-dashboard-layout.-two'
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import { getSession } from 'next-auth/react';

export default function index() {
    return (
        <StoreDashboardLayoutTwo>
            <div>index</div>
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
