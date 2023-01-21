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
            <div className="flex min-h-screen bg-gray-200">
                <SidebarTwo />
                <main className="main ml-[-145px] flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
            <div className='block mt-11 lg:m-0'>
                <StoreMobileNavigation />
            </div>
        </div>
    )
}
