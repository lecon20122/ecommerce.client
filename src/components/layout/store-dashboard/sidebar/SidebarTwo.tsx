import React from 'react'
import StoreMenuMobile from '../menu-mobile';

export default function SidebarTwo() {
    return (
        <aside className="lg:w-56 -translate-x-full md:translate-x-0 rtl:translate-x-full md:rtl:translate-x-0 transform bg-white p-4 transition-transform duration-150 ease-in md:shadow-md">
            <div className="w-full">
                <StoreMenuMobile />
            </div>
        </aside>
    )
}
