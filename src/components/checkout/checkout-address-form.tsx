import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { City } from '../../framework/basic-rest/address/get-cities';
import { useState } from 'react';
import Select from "@components/ui/select";
import { useUI } from '../../contexts/ui.context';
import { AddAddressInputProps } from "@framework/address/add-address";
import { useCreateAddressMutation } from '../../framework/basic-rest/address/add-address';




export default function CheckoutAddressForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddAddressInputProps>();

    const { modalData: cities } = useUI();
    const { mutate, isLoading: creatingAddressLoading } = useCreateAddressMutation()
    const [currentCity, setCurrentCity] = useState<City | undefined>(cities.data[0])

    const [currentDistrictId, SetCurrentDistrictId] = useState<number>(cities.data[0].districts[0].id)

    const handleSelectCity = (value: React.ChangeEvent<HTMLSelectElement>) => {
        value.preventDefault()
        const city: City = cities?.data?.find((city: { id: number; }) => city.id === parseInt(value.target.value))
        setCurrentCity(city)
    }
    function onSubmit(input: AddAddressInputProps) {
        mutate(input)
        console.log('====================================');
        console.log(input);
        console.log('====================================');
    }

    return (
        <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="py-5 w-full mx-auto flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4 lg:space-y-5">
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="forms:label-full-name"
                            {...register("name", {
                                required: "forms:full-name-required",
                            })}
                            errorKey={errors.name?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        <Input
                            type="tel"
                            labelKey="forms:label-phone"
                            {...register("phone", {
                                required: "forms:phone-required",
                            })}
                            errorKey={errors.phone?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="forms:label-street"
                            {...register("street", {
                                required: "forms:street-required",
                            })}
                            errorKey={errors.street?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        <Input
                            labelKey="forms:label-building"
                            {...register("building", {
                                required: "forms:building-required",
                            })}
                            errorKey={errors.building?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="forms:label-floor"
                            {...register("floor", {
                                required: "forms:floor-required",
                            })}
                            errorKey={errors.floor?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />

                        <Input
                            labelKey="forms:label-apartment"
                            {...register("apartment_number", {
                                required: "forms:apartment-required",
                            })}
                            errorKey={errors.apartment_number?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        {
                            currentCity &&
                            <Select name="city"
                                labelKey="forms:label-city"
                                className="w-full lg:w-1/2 md:mt-0"
                                optionValues={cities.data as any[]}
                                value={currentCity?.id}
                                onChange={handleSelectCity} variant='solid' />
                        }
                        {currentCity &&
                            <Select
                                {...register("district_id", {
                                    required: "forms:apartment-required",
                                })}
                                labelKey="forms:label-district"
                                className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
                                optionValues={currentCity?.districts as any[]}
                                value={currentDistrictId}
                                onChange={(value) => SetCurrentDistrictId(parseInt(value.target.value))} variant='solid' />
                        }
                    </div>
                    <div className="flex w-full">
                        <Button
                            loading={creatingAddressLoading}
                            type="submit"
                            className="w-full sm:w-auto mx-auto"
                        // loading={isLoading}
                        // disabled={isLoading}
                        >
                            Create Address
                            {/* {t("common:button-place-order")} */}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
