import React from 'react'
import { FaCheck } from 'react-icons/fa'

export default function CreateProductFormStepOne() {

    return (
        <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
            <div className="flex pb-3">
                <div className="flex-1">
                </div>
                
                <div className="flex-1">
                    <div className="w-10 h-10 bg-black border-2 border-gray-150 shadow-navigation mx-auto rounded-full text-lg text-white flex items-center">
                        <span className="text-grey-darker text-center w-full">1</span>
                    </div>
                </div>

                <div className="w-1/6 align-center items-center align-middle content-center flex">
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className="bg-black text-xs leading-none py-1 text-center text-gray-900 rounded w-[20%]"></div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-10 h-10 bg-white border-2 border-gray-150 mx-auto rounded-full text-lg shadow-navigation text-black flex items-center">
                        <span className="text-grey-darker text-center w-full">2</span>
                    </div>
                </div>


                <div className="w-1/6 align-center items-center align-middle content-center flex">
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className="bg-black text-xs leading-none py-1 text-center text-gray-900 rounded w-[0%]"></div>
                    </div>
                </div>


                <div className="flex-1">
                    <div className="w-10 h-10 bg-white border-2 border-gray-150 mx-auto rounded-full shadow-navigation text-lg text-black flex items-center">
                        <span className="text-grey-darker text-center w-full">3</span>
                    </div>
                </div>


                <div className="flex-1">
                </div>
            </div>

            <div className="flex text-xs content-center text-center">
                <div className="w-1/3">
                    Create Product
                </div>

                <div className="w-1/3">
                    Colors & Sizes
                </div>

                {/* <div className="w-1/4">
                    Application details
                </div> */}

                <div className="w-1/3">
                    Confirmation
                </div>
            </div>
        </div>
    )
}
