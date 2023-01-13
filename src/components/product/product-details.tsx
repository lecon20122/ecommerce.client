import React from 'react'
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useGetStoreProductDetails } from '../../framework/basic-rest/product/get-store-product';
import { useRouter } from 'next/router';
import { useUpdateStoreProductMutation } from '@framework/product/update-store-products';
import { UpdateProductProps } from '../../framework/basic-rest/product/update-store-products';
import { removeEmptyFields } from '@utils/removeEmptyFields';
import { Form, Input, InputNumber } from 'antd';
import { useTranslation } from 'next-i18next';

export default function ProductDetailsFrom() {
    const { query } = useRouter()

    const { data, isLoading } = useGetStoreProductDetails(query.slug as string)
    const { t } = useTranslation();
    const { mutate, data: newData } = useUpdateStoreProductMutation()
    console.log(newData?.data);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProductProps>();

    async function onSubmit(input: UpdateProductProps) {
        mutate(input)
    }

    if (isLoading) {
        return <div>loading ...</div>
    } else {

        return (
            // <form
            //     onSubmit={handleSubmit(onSubmit)}
            //     className="mx-auto flex flex-col justify-center"
            //     noValidate
            // >
            //     <div className="flex flex-col space-y-4 lg:space-y-5">
            //         <Input
            //             {...register("slug")}
            //             hidden
            //             defaultValue={query.slug as string}
            //         />
            //         <Input
            //             {...register("product_id")}
            //             hidden
            //             defaultValue={data?.id}
            //         />
            //         <Input
            //             labelKey="forms:label-title-en"
            //             {...register("en")}
            //             errorKey={errors.en?.message}
            //             defaultValue={data?.title.en}
            //             variant="solid"
            //             className="w-full lg:w-1/2"
            //         />
            //         <Input
            //             labelKey="forms:label-title-ar"
            //             {...register("ar")}
            //             errorKey={errors.ar?.message}
            //             defaultValue={data?.title.ar}
            //             variant="solid"
            //             className="w-full lg:w-1/2"
            //         />
            //         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            //             <Input
            //                 labelKey="forms:label-price"
            //                 {...register("price")}
            //                 errorKey={errors.price?.message}
            //                 defaultValue={data?.price}
            //                 variant="solid"
            //                 className="w-full lg:w-1/2 "
            //             />
            //         </div>
            //         <div className="flex">
            //             <Button
            //                 variant='slim'
            //                 type="submit"
            //             >
            //                 Save
            //             </Button>
            //         </div>
            //     </div>
            // </form>
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
