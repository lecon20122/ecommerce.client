import React from 'react'

interface Props {
    size?: number,
}

export default function Spinner({ size = 70 }: Props) {

    return (
        <div className='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
            <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                <div
                    style={{ width: `${size}px`, height: `${size}px` }}
                    className="animate-spin">
                    <div className="h-full w-full border-4 border-t-black
   border-b-black rounded-[50%]">
                    </div>
                </div>
            </span>
        </div>
    )
}
