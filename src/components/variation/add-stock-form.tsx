import React from 'react'
import { useRouter } from 'next/router';
import { Form, Input, InputNumber } from 'antd';
import ModalWithChildren from '@components/common/modal';
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import { useAddStockToVariationMutation } from '@framework/variation/add-stock';
import Button from '@components/ui/button';
import { Variation } from '../../framework/basic-rest/types';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
    variationId: number
}

export default function AddStockForm({ handleAddDialog, openAddDialog, variationId }: Props) {
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
                    initialValue={variationId}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={'New Stock Amount'} name={'amount'}
                    rules={[{ required: true, type: 'integer', message: 'Stock Amount is required' }]}>
                    <InputNumber prefix={'+'} min={1} max={1000} />
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
