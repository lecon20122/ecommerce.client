import React, { useEffect } from 'react'
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import { useRouter } from 'next/router';
import Button from '@components/ui/button';
import { useGetColorTypeValues } from '@framework/variation/get-color-values';
import { Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'next-i18next';
import { UpdateVariationProps, useUpdateVariationMutation } from '@framework/variation/update-variation';
import { API_ENDPOINTS } from '../../framework/basic-rest/utils/api-endpoints';



export default function VariationColorForm() {
    const { query, locale } = useRouter()
    const { t } = useTranslation();
    const { data: colors } = useGetColorTypeValues();
    const { mutate: update, isLoading: isUpdating, isSuccess } = useUpdateVariationMutation();
    const [form] = Form.useForm();
    const { data: variation, isLoading } = useGetStoreVariationDetails(parseInt(query?.id as string))

    useEffect(() => {
        form.setFieldsValue({
            title: variation?.title,
            price: variation?.price,
            variation_type_value_id: variation?.variation_type_value.id
        })
    }, [variation])

    async function onFinish(input: UpdateVariationProps) {
        update({ ...input, queryKey: [API_ENDPOINTS.STORE_VARIATION, variation?.id], variation_id: variation?.id })
    }

    if (isLoading) {
        return <div>loading...</div>
    } else {
        return (
            <Form form={form} size='large' labelCol={{ span: 5 }}
                className='w-full'
                onFinish={onFinish}
                wrapperCol={{ span: 16 }}>
                <Form.Item
                    name="title"
                    label={t("forms:label-title-en")}
                    initialValue={variation?.title}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="price"
                    label={t("forms:label-price")}
                    initialValue={variation?.price}
                >
                    <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="variation_type_value_id"
                    label={t("forms:label-color")}
                    initialValue={variation?.variation_type_value.id}
                >
                    <Select className='w-full'>
                        {colors?.map((value) => (
                            <Select.Option key={value.id} value={value.id}>
                                <div className='flex items-center'>
                                    <span style={{ backgroundColor: `${value.value.en.toLowerCase()}` }}
                                        className={`rounded w-[20px] h-[20px] mr-2 border border-3 border-black`} />
                                    <span>{value.value[locale as keyof typeof value.value]}</span>
                                </div>
                            </Select.Option>
                        ))}

                    </Select>
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
