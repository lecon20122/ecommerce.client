import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { Form, Input, InputNumber, Select } from 'antd';
import ModalWithChildren from '@components/common/modal';
import { useGetSizeTypeValues } from '../../framework/basic-rest/variation/get-size-values';
import { useUpdateVariationMutation } from '@framework/variation/update-variation';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import { useGetStoreVariationDetails } from '@framework/variation/get-owner-variation';
import { Variation } from '@framework/types';

interface Props {
    handleAddDialog: (data?: any) => void,
    openAddDialog: boolean
    currentVariation: Variation
}

export default function UpdateSizeVariantForm({ handleAddDialog, openAddDialog, currentVariation }: Props) {
    const [form] = Form.useForm();

    const { data: sizes } = useGetSizeTypeValues()
    const { mutate: update } = useUpdateVariationMutation();
    const { t } = useTranslation();
    const { query, locale } = useRouter()
    const { data: PageVariation } = useGetStoreVariationDetails(parseInt(query?.id as string))


    async function onFinish(input: any) {
        update({ ...input, queryKey: [API_ENDPOINTS.STORE_VARIATION, PageVariation?.id], variation_id: currentVariation.id })
    }

    return (
        <ModalWithChildren onCancel={handleAddDialog} onOk={handleAddDialog} openModal={openAddDialog} >
            <Form form={form} size='large' labelCol={{ span: 5 }}
                className='w-full'
                onFinish={onFinish}
                wrapperCol={{ span: 16 }}>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="price"
                    label={t("forms:label-price")}
                    initialValue={currentVariation?.price}
                >
                    <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 16 }}
                    name="variation_type_value_id"
                    label={t("forms:label-color")}
                    initialValue={currentVariation?.variation_type_value.id}
                >
                    <Select className='w-full'>
                        {sizes?.map((value) => (
                            <Select.Option key={value.id} value={value.id}>
                                {value.value[locale as keyof typeof value.value]}
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
        </ModalWithChildren>
    )
}
