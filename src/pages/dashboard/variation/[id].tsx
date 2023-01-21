import React, { useState } from 'react'
import StoreDashboardLayoutTwo from '../../../components/layout/store-dashboard-layout.-two';
import Button from '@components/ui/button';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VariationColorForm from '@components/variation/update-variation-color-form';
import VariationGallery from '@components/variation/variation-gallery';
import UploadImage from '@components/common/upload-image';
import { useAddMediaToVariationMutation } from '@framework/variation/add-media-to-variation';
import { useGetStoreVariationDetails } from '@framework/variation/get-owner-variation';
import { useRouter } from 'next/router';
import AddStockForm from '@components/variation/add-stock-form';
import CreateSizeVariantForm from '@components/variation/add-size-variation-form';
import VariationList from '@components/product/variation/list-variation';

export default function VariationDetail() {
    const { query } = useRouter()
    const { mutate, isLoading } = useAddMediaToVariationMutation()
    const { data } = useGetStoreVariationDetails(parseInt(query.id as string))

    const [openAddStockDialog, setOpenAddStockDialog] = useState(false);
    const [openAddSizekDialog, setOpenAddSizekDialog] = useState(false);

    const handleOnClickAddStockDialog = () => {
        setOpenAddStockDialog(!openAddStockDialog);
    }

    const handleOnClickAddSizekDialog = () => {
        setOpenAddSizekDialog(!openAddSizekDialog);
    }

    return (
        <StoreDashboardLayoutTwo>
            <div>
                {
                    data?.variation_type.is_stockable ?
                        <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 flex space-x-2">
                            <Button onClick={handleOnClickAddStockDialog}>Add Stock</Button>
                            <span className='mt-[12px]'>Current Stock : {data?.stock_count}</span>
                            <AddStockForm variationId={data.id} openAddDialog={openAddStockDialog} handleAddDialog={handleOnClickAddStockDialog} />
                        </div> :
                        <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 flex space-x-2">
                            <Button onClick={handleOnClickAddSizekDialog}>Add Size</Button>
                            <CreateSizeVariantForm handleAddDialog={handleOnClickAddSizekDialog} openAddDialog={openAddSizekDialog} />
                        </div>
                }
                <div className='flex space-x-1 flex-wrap md:flex-nowrap'>
                    <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full lg:w-1/3 flex items-center justify-center">
                        <VariationColorForm />
                    </div>
                    {data?.variation_type.type.en === 'color' &&
                        <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full lg:w-2/3">
                            <VariationGallery />
                            <div className='block my-5'>
                                <UploadImage className='' loading={isLoading} multiple mutate={mutate} listType={'picture-card'} buttonLabel={'Start upload'} param={{ variation_id: data?.id }} />
                            </div>
                        </div>
                    }
                </div>
                {data?.children.length != 0 &&
                    <div className="bg-white p-5 rounded-lg shadow-listProduct my-2 w-full">
                        <VariationList variationType={data?.variation_type.type.en} variations={data?.children} />
                    </div>
                }
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