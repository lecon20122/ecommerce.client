import React, { useState } from 'react'
import { Variation } from '@framework/types';
import Button from '@components/ui/button';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../utils/routes';
import { useUI } from '../../../contexts/ui.context';
import CreateColorVariantForm from '../../variation/add-color-variation-form';
import { Popconfirm } from 'antd';
import { useDeleteVariationMutation } from '../../../framework/basic-rest/variation/delete-variation';
import { ColumnsType } from 'antd/es/table';
import { Table } from "antd";
// import Table, { ColumnsType } from 'antd/es/table';

interface Props {
    variations: Variation[] | undefined,
    variationType: string | undefined
}

interface DataType extends Variation {
    key?: string;
}

export default function VariationList({ variations, variationType }: Props) {

    const [openAddColorDialog, setOpenAddColortDialog] = useState(false);
    const router = useRouter()
    // const { setModalView, openModal } = useUI();
    const { mutate: deleteVariation } = useDeleteVariationMutation();

    const imageBodyTemplate = (rowData: Variation) => {
        return <img className="w-[100px] shadow-product" src={rowData.small_image?.url} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.small_image?.name} />;
    }

    // const handleOnClick = () => {
    //     setModalView('ADD_COLOR_VARIANT')
    //     openModal()
    // }

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

    const colorColumns: ColumnsType<DataType> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'variation_type_value',
            render: (_, record) => imageBodyTemplate(record)
        },
        {
            title: 'Color',
            dataIndex: 'variation_type_value',
            key: 'variation_type_value',
            render: (_, record) => <span>{record.variation_type_value?.value.en}</span>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => actionBodyTemplate(record),
        },
    ];

    const sizeColumns: ColumnsType<DataType> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Size',
            dataIndex: 'variation_type_value',
            key: 'variation_type_value',
            render: (_, record) => <span>{record.variation_type_value?.value.en}</span>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => actionBodyTemplate(record),
        },
    ];

    return (
        <div>
            {variations?.length > 0 &&
                <>
                    {variationType === 'product' &&
                        <div className='my-2'>
                            <Button onClick={handleOnClickAddVariationDialog} variant='flat'>Create Variant</Button>
                            <CreateColorVariantForm handleAddDialog={handleOnClickAddVariationDialog} openAddDialog={openAddColorDialog} />
                        </div>
                    }
                    <Table columns={variationType === 'color' ? sizeColumns : colorColumns} rowKey={"id"} dataSource={variations} scroll={{ x: true }} />
                </>
            }
        </div>
    )
}
