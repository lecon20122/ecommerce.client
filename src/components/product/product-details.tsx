import React from 'react'
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useGetStoreProductDetails } from '../../framework/basic-rest/product/get-store-product';
import { useRouter } from 'next/router';
import { useUpdateStoreProductMutation } from '@framework/product/update-store-products';
import { UpdateProductProps } from '../../framework/basic-rest/product/update-store-products';
import { removeEmptyFields } from '@utils/removeEmptyFields';

export default function ProductDetailsFrom() {
    const { query } = useRouter()

    const { data, isLoading } = useGetStoreProductDetails(query.slug as string)
    const { mutate , data : newData } = useUpdateStoreProductMutation()
    console.log(newData?.data);
    
    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProductProps>();

    async function onSubmit(input: UpdateProductProps) {
        mutate(removeEmptyFields(input))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex flex-col justify-center"
            noValidate
        >
            <div className="flex flex-col space-y-4 lg:space-y-5">
                <Input
                    {...register("slug")}
                    hidden
                    defaultValue={query.slug as string}
                />
                <Input
                    {...register("product_id")}
                    hidden
                    defaultValue={data?.id}
                />
                <Input
                    labelKey="forms:label-title-en"
                    {...register("en")}
                    errorKey={errors.en?.message}
                    defaultValue={data?.title.en}
                    variant="solid"
                    className="w-full lg:w-1/2"
                />
                <Input
                    labelKey="forms:label-title-ar"
                    {...register("ar")}
                    errorKey={errors.ar?.message}
                    defaultValue={data?.title.ar}
                    variant="solid"
                    className="w-full lg:w-1/2"
                />
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <Input
                        labelKey="forms:label-price"
                        {...register("price")}
                        errorKey={errors.price?.message}
                        defaultValue={data?.price}
                        variant="solid"
                        className="w-full lg:w-1/2 "
                    />
                </div>
                <div className="flex">
                    <Button
                        variant='slim'
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}
