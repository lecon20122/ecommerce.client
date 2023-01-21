import React, { useState } from 'react'
import { useCreateColorVariationMutation } from '../../framework/basic-rest/variation/create-color-variant';
import { useGetColorTypeValues } from '@framework/variation/get-color-values';
import { removeEmptyFields } from '@utils/removeEmptyFields';
import { useGetStoreProductDetails } from '@framework/product/get-store-product';
import { useRouter } from 'next/router';
import { Button, Form, Input, InputNumber, Select, Upload, UploadFile } from 'antd';
import { appendImageToFormData, onRemove } from '@utils/upload-functions';
import { UploadChangeParam } from 'antd/es/upload';
import ModalWithChildren from '@components/common/modal';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
}

export default function CreateColorVariantForm({ handleAddDialog, openAddDialog }: Props) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data } = useGetColorTypeValues()
    const { query, locale } = useRouter()
    const { data: product } = useGetStoreProductDetails(query.slug as string)
    const { mutate, isLoading } = useCreateColorVariationMutation()

    async function onFinish(input: any) {
        console.log(input);

        if (!input.images) {
        } else {
            input.images = appendImageToFormData(fileList)
        }
        input.images.append('price', input.price);
        input.images.append('product_id', input.product_id);
        input.images.append('store_id', input.store_id);
        input.images.append('variation_type_value_id', input.variation_type_value_id);
        mutate(removeEmptyFields(input.images))
        handleAddDialog()
    }

    const selectVariationTypeValueItems = data?.map((value) => {
        return (
            <Select.Option key={value.id} value={value.id}>
                <div className='flex flex-row content-center self-center'>
                    <span style={{ backgroundColor: `${value.value.en.toLowerCase()}` }}
                        className={`rounded w-[20px] h-[20px] mr-2 border border-3 border-black mt-[5px]`} />
                    <span>{value.value[locale as keyof typeof value.value]}</span>
                </div>
            </Select.Option>
        )
    })

    const onChangeHandler = (file: UploadChangeParam) => {
        setFileList(file.fileList);
    }



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
                    initialValue={product?.id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="store_id"
                    hidden
                    initialValue={product?.store_id}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Color"
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
                    label="Variation Image"
                    name="images"
                    valuePropName='images'
                    rules={[{ required: true }]}
                >
                    <Upload multiple listType="picture-card" onRemove={(file) => onRemove(file, fileList, setFileList)} onChange={(e) => onChangeHandler(e)}>
                        <div>
                            {/* <PlusOutlined /> */}
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
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
