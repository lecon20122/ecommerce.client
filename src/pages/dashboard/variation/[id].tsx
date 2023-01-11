import React, { useState } from 'react'
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';
import Button from '@components/ui/button';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VariationForm from '@components/variation/variation-form';
import VariationGallery from '@components/variation/variation-gallery';
import UploadImage from '@components/common/upload-image';
import { useAddMediaToVariationMutation } from '@framework/variation/add-media-to-variation';
import { useGetStoreVariationDetails } from '@framework/variation/get-owner-variation';
import { useRouter } from 'next/router';
import AddStockForm from '@components/variation/add-stock-form';

export default function VariationDetail() {
    const { query } = useRouter()
    const { mutate, isLoading } = useAddMediaToVariationMutation()
    const { data } = useGetStoreVariationDetails(parseInt(query.id as string))

    const [openAddStockDialog, setOpenAddStockDialog] = useState(false);

    const handleOnClickAddStockDialog = () => {
        setOpenAddStockDialog(!openAddStockDialog);
    }

    return (
        <StoreDashboardLayoutTwo>
            <div>
                <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 flex space-x-2">
                    <Button onClick={handleOnClickAddStockDialog}>Add Stock</Button>
                    <AddStockForm openAddDialog={openAddStockDialog} handleAddDialog={handleOnClickAddStockDialog} />
                </div>
                <div className='flex space-x-1 flex-wrap md:flex-nowrap'>
                    <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full lg:w-1/3">
                        <VariationForm />
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full lg:w-2/3">
                        <VariationGallery />
                        <div className='block my-5'>
                            <UploadImage className='' loading={isLoading} multiple mutate={mutate} listType={'picture-card'} buttonLabel={'Start upload'} param={{ variation_id: data?.id }} />
                        </div>
                    </div>
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