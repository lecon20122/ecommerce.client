import React from 'react'
import { Column } from 'primereact/column';
import { Variation } from '@framework/types';
import Button from '@components/ui/button';
import { DataTable } from 'primereact/datatable';
import { IoPencilOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../utils/routes';

interface Props {
    variations: Variation[] | undefined
}

export default function VariationList({ variations }: Props) {
    const router = useRouter()
    const imageBodyTemplate = (rowData: Variation) => {
        return <img className="w-[100px] shadow-product" src={rowData.media[0].small} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.small_image?.name} />;
    }

    const handleOnClick = () => {
        // setModalView('ADD_PRODUCT')
        // openModal()
    }

    const editProduct = (rowData: Variation) => {
        router.push(`${ROUTES.DASHBOARD_VARIATION}/${rowData.id}`, undefined, {
            locale: router.locale,
        });
    }

    const actionBodyTemplate = (rowData: Variation) => {
        return (
            <div className='text-xl'>
                <button className='mr-2' onClick={() => editProduct(rowData)} >
                    <IoPencilOutline />
                </button>
                {/* <button className='text-red-700' onClick={() => confirmDeleteProduct(rowData)} >
                    <IoTrashBin />
                </button> */}
            </div>
        );
    }

    return (
        <>
            <div className='my-2'>
                <Button onClick={handleOnClick} variant='flat'>Create Variant</Button>
            </div>
            <DataTable value={variations} responsiveLayout="stack" className='border border-gray-300'>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="price" header="Price" ></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            {/* <DataTable data={variations} /> */}
        </>
    )
}
