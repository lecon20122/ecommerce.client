import ModalWithChildren from '@components/common/modal'
import Button from '@components/ui/button'
import { DatePicker, Form, Input, InputNumber, Select, Switch } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useGetStoreProductDetails } from '@framework/product/get-store-product';
import { DiscountType, useCreateProductDiscountMutation } from '@framework/product/add-discount';
import { TypeEnum } from 'src/enums/TypeEnum';
import { CheckBox } from '../ui/checkbox';

export default function ProductDiscountForm() {

    const [openDialog, setOpenDialog] = useState(false);
    const { query, locale } = useRouter()
    const { data: product } = useGetStoreProductDetails(parseInt(query.id as string))
    const { isLoading, mutate } = useCreateProductDiscountMutation()

    const [currentType, setCurrentType] = useState<DiscountType>()

    const handleOnClickDialog = () => {
        setOpenDialog(!openDialog);
    };

    const onFinish = (values: any) => {
        console.log(values);
        mutate(values)
    }

    return (
        <div>
            <Button onClick={handleOnClickDialog}>Add Discount</Button>
            {/* <div className='border border-1 border-black p-1 flex space-x-1 items-center'>
                <h1 className={'text-left '}>{category.title.en}</h1>
                <button className={'cursor text-red-600'} onClick={event => handleDetachCategories(category.id)}>x
                </button>
            </div> */}
            <ModalWithChildren onCancel={handleOnClickDialog} onOk={handleOnClickDialog} openModal={openDialog} >
                <Form name="basic"
                    className='p-5'
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
                        label="Discount Type"
                        name="type"
                        rules={[{ required: true }]}
                    >
                        <Select allowClear onChange={(v) => setCurrentType(v)}>
                            <Select.Option value={TypeEnum.FIXED}>{TypeEnum.FIXED}</Select.Option>
                            <Select.Option value={TypeEnum.PERCENTAGE}>{TypeEnum.PERCENTAGE}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Value"
                        name="value"

                        rules={[{ required: true, type: 'integer', min: 0, max: currentType === TypeEnum.PERCENTAGE ? 100 : 1000000 }]}
                    >
                        <InputNumber addonAfter={currentType === TypeEnum.PERCENTAGE ? '%' : ''} />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        label="Start at"
                        name="start_at"
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true }]}
                        label="End at"
                        name="end_at"
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item rules={[{ required: true }]}
                        label="Status"
                        name="is_active"
                        initialValue={true}>
                        <Switch />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="submit" loading={isLoading} disabled={isLoading}>
                            Apply Discount
                        </Button>
                    </Form.Item>
                </Form>
            </ModalWithChildren>
        </div>
    )
}
