import React from 'react'
import StoreMenuMobile from '../menu-mobile';

export default function SidebarTwo() {
    return (
        <aside className="sidebar lg:w-56 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
            <div className="w-full">
                <StoreMenuMobile />
            </div>
            <div className="my-4"></div>
        </aside>
    )
}
