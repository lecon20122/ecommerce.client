import React, { useState } from 'react'
import { Column } from 'primereact/column';
import { Variation } from '@framework/types';
import Button from '@components/ui/button';
import { DataTable } from 'primereact/datatable';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../utils/routes';
import { useUI } from '../../../contexts/ui.context';
import CreateColorVariantForm from '../../variation/add-color-variation-form';
import { Popconfirm } from 'antd';
import { useDeleteVariationMutation } from '../../../framework/basic-rest/variation/delete-variation';

interface Props {
    variations: Variation[] | undefined
}

export default function VariationList({ variations }: Props) {
    const [openAddColorDialog, setOpenAddColortDialog] = useState(false);
    const router = useRouter()
    const { setModalView, openModal } = useUI();
    const { mutate: deleteVariation } = useDeleteVariationMutation();
    const imageBodyTemplate = (rowData: Variation) => {
        return <img className="w-[100px] shadow-product" src={rowData.small_image?.url} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.small_image?.name} />;
    }

    const handleOnClick = () => {
        setModalView('ADD_COLOR_VARIANT')
        openModal()
    }

    const editProduct = (rowData: Variation) => {
        router.push(`${ROUTES.DASHBOARD_VARIATION}/${rowData.id}`, undefined, {
            locale: router.locale,
        });
    }

    const handleOnClickAddVariationDialog = () => {
        setOpenAddColortDialog(!openAddColorDialog);
    };

    const onConfirmDelete = (id: number) => {
        deleteVariation({ id: id })
    }

    const actionBodyTemplate = (rowData: Variation) => {
        return (
            <div className='text-xl flex'>
                <button className='mr-2' onClick={() => editProduct(rowData)} >
                    <IoPencilOutline />
                </button>
                <Popconfirm
                    placement="topLeft"
                    title={'Are you sure to delete this color'}
                    description={'Delete the task'}
                    onConfirm={(e) => onConfirmDelete(rowData.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <IoTrashBin></IoTrashBin>
                </Popconfirm>
            </div>
        );
    }

    return (
        <>
            <div className='my-2'>
                <Button onClick={handleOnClickAddVariationDialog} variant='flat'>Create Variant</Button>
                <CreateColorVariantForm handleAddDialog={handleOnClickAddVariationDialog} openAddDialog={openAddColorDialog} />
            </div>
            <DataTable value={variations} responsiveLayout="stack" className='border border-gray-300'>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="title" header="Name"></Column>
                <Column field="price" header="Price" ></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            {/* <DataTable data={variations} /> */}
        </>
    )
}
