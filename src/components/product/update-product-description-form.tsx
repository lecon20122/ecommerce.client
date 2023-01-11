import ModalWithChildren from '@components/common/modal'
import Button from '@components/ui/button'
import { useGetProductAttributes } from '@framework/product/get-product-attributes'
import { Form, Input, Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { AddProductDescriptionProps, useUpdateProductDescriptionMutation } from '../../framework/basic-rest/product/update-product-description';
import { ProductDescription } from '../../framework/basic-rest/types';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean,
    currentDescription: ProductDescription | undefined
}

export default function UpdateProductDescriptionForm({ handleAddDialog, openAddDialog, currentDescription }: Props) {
    const { query, locale } = useRouter()
    const { data: attributes } = useGetProductAttributes()
    const { mutate: update, isLoading } = useUpdateProductDescriptionMutation()

    const onFinish = (values: AddProductDescriptionProps) => {
        update(values)
    }

    return (
        <ModalWithChildren onCancel={handleAddDialog} onOk={handleAddDialog} openModal={openAddDialog}>
            <Form name="basic"
                size="large"
                className='mt-6'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off" >
                <Form.Item
                    name="product_id"
                    hidden
                    initialValue={currentDescription?.product_id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="product_description_id"
                    hidden
                    initialValue={currentDescription?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Choose attribute"
                    initialValue={currentDescription?.attribute?.id}
                    name="product_attribute_id"
                    rules={[{ required: true }]}
                >
                    <Select allowClear onClick={(e) => e.preventDefault()}>
                        {attributes?.map((attribute) => (
                            <Select.Option
                                key={attribute.id}
                                value={attribute.id}>{attribute.attribute[locale as keyof typeof attribute.attribute]}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="en"
                    initialValue={currentDescription?.value?.en}
                    label={"Description in English"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ar"
                    initialValue={currentDescription?.value?.ar}
                    label={"Description in Arabic"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }} className={'text-center'}>
                    <Button type="submit" loading={isLoading} disabled={isLoading}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </ModalWithChildren>
    )
}
