import React from 'react'
import { useRouter } from 'next/router';
import { Form, Input, InputNumber } from 'antd';
import ModalWithChildren from '@components/common/modal';
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import { useAddStockToVariationMutation } from '@framework/variation/add-stock';
import Button from '@components/ui/button';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
}

export default function AddStockForm({ handleAddDialog, openAddDialog }: Props) {
    const { query } = useRouter()
    const { data: variation } = useGetStoreVariationDetails(parseInt(query.id as string))
    const { mutate: addStock, isLoading } = useAddStockToVariationMutation()



    async function onFinish(input: any) {
        addStock(input)
    }

    return (
        <ModalWithChildren onCancel={handleAddDialog} onOk={handleAddDialog} openModal={openAddDialog} >
            <Form name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off" >
                <Form.Item
                    name="variation_id"
                    hidden
                    initialValue={variation?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="submit" loading={isLoading} disabled={isLoading}>
                        update Stock
                    </Button>
                </Form.Item>
            </Form>
        </ModalWithChildren>
    )
}
