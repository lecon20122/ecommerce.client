import React from 'react'
import { useRouter } from 'next/router';
import { useGetStoreVariationDetails } from '../../framework/basic-rest/variation/get-owner-variation';
import Button from '@components/ui/button';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaInstagramSquare } from 'react-icons/fa';

export default function VariationGallery() {
    const { query } = useRouter()
    const { data, isLoading } = useGetStoreVariationDetails(parseInt(query?.id as string))
    return (
        <section className="mx-auto overflow-hidden text-gray-700">
            <div className="container px-5 py-2">
                <div className="flex flex-wrap justify-center items-center -m-1 md:-m-2">
                    {data?.media.map((image) => (
                        <div key={image.id} className="flex flex-grow justify-center items-center w-1/4 md:w-1/2 lg:w-1/4">
                            <div className="w-full p-1 md:p-2 relative">
                                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-t-lg"
                                    src={image.small} />
                                <Button className='w-full bg-red-400 hover:bg-red-500 py-1 px-3' variant='flat' disableBorderRadius >Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
