import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { AddProductProps } from "@framework/product/add-new-product-by-store";
import { useCreateProductMutation } from '../../framework/basic-rest/product/add-new-product-by-store';




export default function CreateProductForm() {
    const { mutate, isLoading } = useCreateProductMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddProductProps>();

    function onSubmit(input: AddProductProps) {
        mutate(input)
    }

    return (
        <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
            <h1 className="text-center text-black">Create Product</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="py-5 w-full mx-auto flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4 lg:space-y-5">
                    <Input
                        labelKey="forms:label-title-en"
                        {...register("en", {
                            required: "forms:full-name-required",
                        })}
                        errorKey={errors.en?.message}
                        variant="solid"
                        className="w-full "
                    />
                    <Input
                        labelKey="forms:label-title-ar"
                        {...register("ar", {
                            required: "forms:full-name-required",
                        })}
                        errorKey={errors.ar?.message}
                        variant="solid"
                        className="w-full"
                    />
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Input
                            labelKey="forms:label-price"
                            {...register("price", {
                                required: "forms:street-required",
                            })}
                            errorKey={errors.price?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                    </div>
                    <div className="flex w-full">
                        <Button
                            loading={isLoading}
                            type="submit"
                            className="w-full sm:w-auto mx-auto"
                        >
                            Create Product
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
