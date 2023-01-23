import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useRef } from 'react';
import { useGetStoreProducts } from '@framework/product/get-store-products';
import { ApiProduct } from '../../framework/basic-rest/types';
import StoreDashboardLayoutTwo from '@components/layout/store-dashboard-layout.-two';
import Input from '@components/ui/input';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Toolbar } from 'primereact/toolbar';
import Button from '@components/ui/button';
import { useUI } from '../../contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useDeleteProductMutation } from '@framework/product/delete-store-product';
import { useRestoreProductMutation } from '@framework/product/restore-store-product';
import Link from 'next/link';

export default function products() {

    const { data, isLoading } = useGetStoreProducts()
    const { mutate } = useDeleteProductMutation()
    const { mutate: restore } = useRestoreProductMutation()
    const router = useRouter()
    const { setModalView, openModal } = useUI()
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const editProduct = (product: ApiProduct) => {
        router.push(`${ROUTES.DASHBOARD_PRODUCT}/${product.id}`, undefined, {
            locale: router.locale,
        });
    }

    const deleteProduct = (product: ApiProduct) => {
        mutate({ id: product.id })
    }

    const restoreProduct = (product: ApiProduct) => {
        restore({ id: product.id })
    }


    const actionBodyTemplate = (rowData: ApiProduct) => {
        console.log(rowData);

        return (
            <div className='text-xl'>
                <button className='mr-2 text-blue-500' onClick={() => editProduct(rowData)} >
                    VIEW
                </button>
                {/* {rowData.deleted_at === null ?
                    <button className='text-red-700' onClick={() => deleteProduct(rowData)} >
                        DELETE
                    </button>
                    :
                    <button className='text-green-600' onClick={() => restoreProduct(rowData)} >
                        ENABLE
                    </button>
                } */}
                <button className='text-red-700' onClick={() => deleteProduct(rowData)} >
                    DELETE
                </button>
            </div>
        );
    }

    const header = (
        <div className="flex space-x-2 justify-start items-center">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <Input name='search' type="search" variant='outline' onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const exportCSV = () => {
        dt?.current?.exportCSV();
    }

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button onClick={exportCSV} variant='slim'>Export CSV</Button>
            </>
        )
    }

    const handleOnClick = () => {
        setModalView('ADD_PRODUCT')
        openModal()
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Link href={ROUTES.DASHBOARD_CREATE_PRODUCT_STEPS}>
                    <Button variant='slim'>Create Product</Button>
                </Link>
            </>
        )
    }

    return (
        <StoreDashboardLayoutTwo>
            <div className='w-full h-full'>
                <Toolbar className="" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable loading={isLoading} ref={dt} value={data} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    globalFilter={globalFilter}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={header} responsiveLayout="stack">
                    <Column field="title.en" header="EN Title" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="title.ar" header="AR Title" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="price" header="Price" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </StoreDashboardLayoutTwo>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)

    // const queryClient = new QueryClient()
    // try {
    //     await queryClient.fetchQuery([API_ENDPOINTS.STORE_PRODUCTS], fetchStoreProducts)
    // } catch (error) {
    //     if (error.response.status == 401) {
    //         return {
    //             redirect: { destination: "/404", permanent: false },
    //             props: {}
    //         }
    //     }
    // }

    if (session?.user.is_owner) {
        return {
            props: {
                ...(await serverSideTranslations
                    (ctx.locale!, ['menu', 'common', 'forms'])),
                // dehydratedState: dehydrate(queryClient)
            },
        };
    }
    return {
        redirect: { destination: "/404", permanent: false },
        props: {}
    }
};
