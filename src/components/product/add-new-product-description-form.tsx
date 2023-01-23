import ModalWithChildren from '@components/common/modal'
import Button from '@components/ui/button'
import { useProductDescriptionMutation } from '@framework/product/add-product-description'
import { useGetProductAttributes } from '@framework/product/get-product-attributes'
import { useGetStoreProductDetails } from '@framework/product/get-store-product'
import { Form, Input, Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { AddProductDescriptionProps } from '../../framework/basic-rest/product/add-product-description';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
}

export default function CreateProductDescriptionForm({ handleAddDialog, openAddDialog }: Props) {
    const { query, locale } = useRouter()
    const { data: attributes } = useGetProductAttributes()
    const { mutate: add, isLoading } = useProductDescriptionMutation()
    const { data: product } = useGetStoreProductDetails(parseInt(query.id as string))

    const onFinish = (values: AddProductDescriptionProps) => {
        add(values)
    }

    return (
        <ModalWithChildren onCancel={handleAddDialog} onOk={handleAddDialog} openModal={openAddDialog} >
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
                    initialValue={product?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Choose attribute"
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
                    label={"Description in English"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ar"
                    label={"Description in Arabic"}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }} className={'text-center'}>
                    <Button type="submit" loading={isLoading} disabled={isLoading}>
                        Create new description
                    </Button>
                </Form.Item>
            </Form>
        </ModalWithChildren>
    )
}
