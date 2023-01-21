import { Form, InputNumber, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { onRemove } from '@utils/upload-functions';
import { FaMinusCircle, FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useGetSizeTypeValues } from '@framework/variation/get-size-values';
import { useGetColorTypeValues } from '@framework/variation/get-color-values';
import Button from '@components/ui/button';
import { getFormData } from '@utils/common';
import { useCreateProductMegaFormMutation } from '@framework/product/add-new-product-mega-form';
import { appendImageToFormData } from '../../utils/upload-functions';


export default function CreateProductVariantsForm() {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { mutate } = useCreateProductMegaFormMutation()

    const { data: colors } = useGetColorTypeValues();


    const { data: sizes } = useGetSizeTypeValues();

    const [isLoading, setIsLoading] = useState(false)

    const [initialState, setInitialState] = useState<any>({})

    const { locale } = useRouter()

    const router = useRouter()

    const onChangeImageUploader = (file: UploadChangeParam) => {
        setFileList(file.fileList);
    }

    const selectVariationTypeValueItems = colors?.map((value) => {
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

    const selectVariationSizeValueItems = sizes?.map((value) => {
        return (
            <Select.Option key={value.id} value={value.id}>
                <div className=''>
                    <span>{value.value[locale as keyof typeof value.value]}</span>
                </div>
            </Select.Option>
        )
    })

    const onFinish = (values: any) => {
        const product = sessionStorage.getItem('create-product-form')
        if (product) {
            const productData = JSON.parse(product)

            const formData = appendImageToFormData(fileList)
            console.log(formData.getAll('sizes[]'))
            getFormData(formData, { ...productData, ...values })
            mutate({ data: formData })
        }
    }

    return (
        <Form onFinish={onFinish} size='large'
            wrapperCol={{ span: 12 }}>
            <Form.Item
                className='w-full'
                name={'variation_type_value_id'}
                rules={[{ required: true }]}
            >
                <Select className='w-full' placeholder='Title in English'>
                    {selectVariationTypeValueItems}
                </Select>
            </Form.Item>
            <Form.Item
                className='w-full'
            >
                <>
                    <Upload defaultFileList={fileList}
                        className='w-full'
                        multiple
                        listType="picture-card"
                        onRemove={(file) => onRemove(file, fileList, setFileList)}
                        onChange={(e) => onChangeImageUploader(e)}>
                        <div>
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    <Form.List name={"sizes"}>
                        {(fields, { add, remove }) => (

                            <div>
                                <Form.Item wrapperCol={{ span: 16 }}>
                                    <span className='flex items-center' onClick={() => add()}>
                                        <FaPlus className='mr-2' />Add size
                                    </span>
                                </Form.Item>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key}>
                                        <Form.Item initialValue={initialState.sizes}>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(60% - 8px)' }}
                                                wrapperCol={{ span: 24 }}
                                                {...restField}
                                                hasFeedback
                                                name={[name, 'variation_type_value_id']}
                                                rules={[{ required: true }]}
                                            >
                                                <Select placeholder={'Select Size'} allowClear onClick={(e) => e.preventDefault()}>
                                                    {selectVariationSizeValueItems}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item className='ml-1' wrapperCol={{ span: 24 }} name={[name, 'stock_amount']} style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}>
                                                <InputNumber placeholder='Stock' className='w-full' />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(10% - 8px)', margin: '0 8px' }}
                                            >
                                                <FaMinusCircle onClick={() => remove(name)} />
                                            </Form.Item>
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form.List>
                </>
            </Form.Item>
            <Form.Item>
                <Button >
                    DONE
                </Button>
            </Form.Item>
        </Form>
    )
}
