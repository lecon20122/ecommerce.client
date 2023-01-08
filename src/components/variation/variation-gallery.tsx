import React from 'react'
import { useRouter } from 'next/router';
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import Button from '@components/ui/button';
import { useDeleteMediaVariationMutation } from '@framework/variation/delete-variation-media';

export default function VariationGallery() {
    const { query } = useRouter()
    const { data, isLoading } = useGetStoreVariationDetails(parseInt(query?.id as string))
    const { mutate } = useDeleteMediaVariationMutation()
    return (
        <section className="mx-auto text-gray-700">
            <div className="container px-2">
                <div className="flex flex-wrap my-2 -m-1 md:-m-2 justify-center items-center">
                    {data?.media.map((image) => (
                        <div key={image.id} className="flex flex-[1_1_200px] justify-center items-center">
                            <div className="p-1 md:p-2 relative">
                                <img alt="gallery" className="px-1 aspect-[2/3] md:w-[150px] object-contain rounded-t-lg"
                                    src={image.small} />
                                <Button onClick={() => mutate({ image_id: image.id, variation_id: data.id })} className='w-full bg-red-400 hover:bg-red-500 py-1 px-3' variant='flat' disableBorderRadius >Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
