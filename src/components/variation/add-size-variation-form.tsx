import React from 'react'
import { removeEmptyFields } from '@utils/removeEmptyFields';
import { useRouter } from 'next/router';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import ModalWithChildren from '@components/common/modal';
import { useCreateSizeVariationMutation } from '../../framework/basic-rest/variation/add-size-variation';
import { useGetSizeTypeValues } from '@framework/variation/get-size-values';
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
}

export default function CreateSizeVariantForm({ handleAddDialog, openAddDialog }: Props) {
    const { data } = useGetSizeTypeValues()
    const { query, locale } = useRouter()
    const { data: variation } = useGetStoreVariationDetails(parseInt(query.id as string))
    const { mutate, isLoading } = useCreateSizeVariationMutation()

    async function onFinish(input: any) {
        mutate(removeEmptyFields(input))
        handleAddDialog()
    }

    const selectVariationTypeValueItems = data?.map((value) => {
        return (
            <Select.Option key={value.id} value={value.id}>
                <div className='flex flex-row content-center self-center'>
                    <span>{value.value[locale as keyof typeof value.value]}</span>
                </div>
            </Select.Option>
        )
    })



    return (
        <ModalWithChildren onCancel={handleAddDialog} onOk={handleAddDialog} openModal={openAddDialog} >
            <Form name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off" >
                <Form.Item
                    name="product_id"
                    hidden
                    initialValue={variation?.product_id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="parent_id"
                    hidden
                    initialValue={variation?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="store_id"
                    hidden
                    initialValue={variation?.store_id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Size"
                    name="variation_type_value_id"
                    rules={[{ required: true }]}
                >
                    <Select allowClear onClick={(e) => e.preventDefault()}>
                        {selectVariationTypeValueItems}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock_amount"
                    rules={[{ required: true , type : "integer" }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="default" htmlType="submit" loading={isLoading} disabled={isLoading}>
                        Create new Color
                    </Button>
                </Form.Item>
            </Form>
        </ModalWithChildren>
    )
}
