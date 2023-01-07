import Input from '@components/ui/input'
import React from 'react'
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import { useRouter } from 'next/router';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useGetVariationTypes } from '../../framework/basic-rest/variation/get-variation-types';
import CustomSelect from '@components/ui/custom-select';
import { useState, useEffect } from 'react';
import { VariationType } from '../../framework/basic-rest/types';



export default function VariationForm() {
    const { query, locale } = useRouter()
    const { data: types } = useGetVariationTypes();
    const [currentType, setCurrentType] = useState<VariationType | undefined>()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();

    async function onSubmit(input: any) {
        // mutate(removeEmptyFields(input))
    }

    const { data, isLoading } = useGetStoreVariationDetails(parseInt(query?.id as string))

    const handleSelectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = types?.find((type) => type.id === parseInt(event.target.value))

        setCurrentType(selected)
    }

    // useEffect(() => {
    //     if (data) {
    //         setCurrentType(data.variation_type)
    //     }
    // })

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex flex-col justify-center w-1/2"
            noValidate
        >
            <div className="flex flex-col space-y-4 lg:space-y-5">
                <Input
                    labelKey="forms:label-title-en"
                    {...register("en")}
                    // errorKey={errors.title}
                    defaultValue={data?.title}
                    variant="solid"
                    className="w-full"
                />
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <Input
                        labelKey="forms:label-price"
                        {...register("price")}
                        // errorKey={errors.price?.message}
                        defaultValue={data?.price}
                        variant="solid"
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <CustomSelect
                        {...register("variation_type_id")}
                        onChange={handleSelectType}
                        placeholder={'please select type'}
                        value={data?.variation_type.id}
                        labelKey="forms:label-price"
                        // errorKey={errors.price?.message}
                        variant="solid"
                        className="w-full"
                    >
                        {types?.map((type) => (
                            <option key={type.id} value={type.id}>{type.type[locale as keyof typeof type.type]}</option>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        {...register("variation_type_value_id")}
                        value={currentType?.variationTypeValues[0].id}
                        labelKey="forms:label-price"
                        placeholder={'please select type'}
                        // errorKey={errors.price?.message}
                        variant="solid"
                        className="w-full"
                    >
                        {currentType?.variationTypeValues.map((value) => (
                            <option key={value.id} value={value.id}>{value.value[locale as keyof typeof value.value]}</option>
                        ))}
                    </CustomSelect>
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
