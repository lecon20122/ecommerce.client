import React from 'react'
import HeaderTwo from '@components/layout/header/header-two';
import SidebarTwo from './store-dashboard/sidebar/SidebarTwo';
import StoreMobileNavigation from './mobile-navigation/store-mobile-navigation';

interface Props {
    children: React.ReactNode
}

export default function StoreDashboardLayoutTwo({ children }: Props) {
    return (
        <div>
            <div className='border-b border-gray-300'>
                <HeaderTwo />
            </div>
            <div className="flex min-h-screen flex-row bg-gray-200">
                <SidebarTwo />
                <main className="-ml-40 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
                    <div className="font-bold shadow-md">
                        {children}
                    </div>
                </main>
            </div>
            <StoreMobileNavigation />
        </div>
    )
}
