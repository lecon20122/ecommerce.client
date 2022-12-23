import React from 'react'
import CheckoutForm from '@components/checkout/checkout-form';
import { useAddressQuery } from '../../framework/basic-rest/address/get-user-addresses';
import { useState } from 'react';
import CheckoutAddressForm from './checkout-address-form';
import Button from '@components/ui/button';
import { useUI } from '../../contexts/ui.context';

interface Props {
    t: any
}

export default function CheckoutAddresses({ t }: Props) {

    const [shipping_address_id, setShipping_address_id] = useState(0)
    const [shipping_type_id, setShipping_type_id] = useState(0)

    const { data: addresses } = useAddressQuery()

    const {
        openModal,
        setModalView,
    } = useUI()

    function handleAddAddress() {
        setModalView("ADD_NEW_ADDRESS")
        return openModal()
    }

    const userAddresses = addresses?.map((address) => {
        return (
            <label
                key={address.id}
                className="w-[48%] p-3 border border-gray-200 rounded-md bg-gray-150 hover:border-blue-400 hover:bg-blue-50 cursor-pointer mb-1">
                <span><input name="shipping" type="radio" value={address.id}
                    onChange={event => setShipping_address_id(parseInt(event.target.value))} className="" /></span>
                <p>
                    <span>{address.street}</span><br />
                    <span>Building {address.building}, Floor {address.floor}, Apartment {address.apartment_number}</span>
                </p>
            </label>
        )
    })


    return (
        <>
            <div className="flex text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                <h2 className='self-center'>
                    {t("text-shipping-address")}
                </h2>
                <button onClick={() => handleAddAddress()} className='ml-2 p-1 text-[12px] border border-gray-200 rounded-md bg-gray-150 hover:border-blue-400 hover:bg-blue-50'>Add address</button>
            </div>

            <div className="flex flex-wrap space-x-2">
                {userAddresses}
            </div>
        </>
    )
}
