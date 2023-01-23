import React from 'react'
import Button from "@components/ui/button";
import { useGetStoreProductDetails } from '../../framework/basic-rest/product/get-store-product';
import { useRouter } from 'next/router';
import { useUpdateStoreProductMutation } from '@framework/product/update-store-products';
import { UpdateProductProps } from '../../framework/basic-rest/product/update-store-products';
import { Form, Input, InputNumber } from 'antd';
import { useTranslation } from 'next-i18next';

export default function ProductDetailsFrom() {
    const { query } = useRouter()

    const { data, isLoading } = useGetStoreProductDetails(parseInt(query.id as string))
    const { t } = useTranslation();
    const { mutate } = useUpdateStoreProductMutation()


    async function onSubmit(input: UpdateProductProps) {
        mutate(input)
    }

    if (isLoading) {
        return <div>loading ...</div>
    } else {

        return (
            <Form size='large' labelCol={{ span: 9 }}
                className='w-full'
                onFinish={onSubmit}
                wrapperCol={{ span: 16 }}>
                <h3 className='text-center mb-2'>Edit Product</h3>
                <Form.Item
                    name="slug"
                    hidden
                    initialValue={query.slug as string}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="product_id"
                    hidden
                    initialValue={data?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="en"
                    label={t("forms:label-title-en")}
                    initialValue={data?.title.en}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="ar"
                    label={t("forms:label-title-ar")}
                    initialValue={data?.title.ar}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="price"
                    label={t("forms:label-price")}
                    initialValue={data?.price}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 24 }}
                    name="price"
                    className='text-center'
                >
                    <Button type='submit'>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}
