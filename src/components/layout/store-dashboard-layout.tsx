import React from 'react'
import Sidebar from './store-dashboard/sidebar/Sidebar'
import Header from './store-dashboard/header/Header'

interface Props {
    children: React.ReactNode
}



export default function StoreDashboardLayout({ children }: Props) {
    return (
        <div>
            <Header />
            <div className="h-screen flex flex-row flex-wrap">
                <Sidebar />
                <div className="bg-gray-100 flex-1 p-6 md:mt-16">
                    {children}
                </div>
            </div>
        </div>
    )
}
