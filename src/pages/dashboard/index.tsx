import StoreDashboardLayout from '@components/layout/store-dashboard-layout.-two'
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { Suspense } from 'react'
import { getSession } from 'next-auth/react';
import Button from '@components/ui/button';
import { IoShirtSharp } from 'react-icons/io5';
import Link from 'next/link';
import { ROUTES } from '../../utils/routes';

export default function index() {
    return (
        <StoreDashboardLayout>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full flex items-center">
                    <Link href={ROUTES.DASHBOARD_PRODUCTS}>
                        <Button>
                            <IoShirtSharp className='text-lg mr-2' />Products
                        </Button>
                    </Link>
                </div>
        </StoreDashboardLayout>
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
