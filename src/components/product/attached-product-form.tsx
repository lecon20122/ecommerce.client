import { Form, Select } from 'antd'
import React from 'react'
import { useGetStoreProductDetails } from '../../framework/basic-rest/product/get-store-product';
import { useRouter } from 'next/router';
import { useStoreCategoriesQuery } from '@framework/category/get-categories-for-store-dashboard';
import Button from '@components/ui/button';
import { useAttachCategoryTtMutation } from '@framework/product/attach-category';
import { useDetachCategoryTtMutation } from '@framework/product/detach-category';

export default function AttachedProductCategoriesForm() {
    const { query, locale } = useRouter()
    const { data: product } = useGetStoreProductDetails(parseInt(query.id as string))
    const { data: categories } = useStoreCategoriesQuery()
    const { mutate: attach } = useAttachCategoryTtMutation()
    const { mutate: detach } = useDetachCategoryTtMutation()
    const [form] = Form.useForm()

    const handleDetachCategories = (categoryId: number) => {
        detach({ ids: categoryId, product_id: product?.id as number })
        form.resetFields()

    }

    const onFinishAttachCategories = (values: any) => {
        attach({ ids: values.id, product_id: product?.id as number })
        form.resetFields()
    }

    const currentAttachedCategories = product?.categories.map((category) => {
        return (
            <div className='border border-1 border-black p-1 flex space-x-1 items-center'>
                <h1 className={'text-left '}>{category.title.en}</h1>
                <button className={'cursor text-red-600'} onClick={event => handleDetachCategories(category.id)}>x
                </button>
            </div>
        )
    })

    return (
        <div className='flex flex-1'>
            <div className='basis-1/3'>
                <div className='container py-3 flex space-x-1 items-center'>
                    <h1>Currently Attached Categories :</h1>
                    {currentAttachedCategories}
                </div>
                <Form onFinish={onFinishAttachCategories}
                    wrapperCol={{ span: 24 }} size={"large"}>
                    <Form.Item name="id">
                        <Select
                            mode="multiple"
                            placeholder="Select a category"
                            allowClear
                        >
                            {categories?.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}>{category.title[locale as keyof typeof category.title]}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className={'ml-2'}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
