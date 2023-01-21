
import React, { useState } from 'react'
import SidebarThree from './store-dashboard/sidebar/SidebarThree';
import LanguageSwitcher from '@components/ui/language-switcher';
import { UserLineIcon } from '@components/icons/UserLineIcon';
import { FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { useLogoutMutation } from '@framework/auth/use-logout';
import StoreMobileNavigation from './mobile-navigation/store-mobile-navigation';

interface Props {
    children: React.ReactNode
}
export default function DashboardLayout({ children }: Props) {
    const [collapsed, setCollapsed] = useState(false);

    const { t } = useTranslation("common");
    const { status, data: user } = useSession()
    const { mutate: signOut } = useLogoutMutation()
    return (
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
            <SidebarThree />
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <header className="header bg-white shadow py-4 px-4">
                    <div className="header-content flex items-center flex-row">
                        <div className="flex ml-auto">
                            <div className="flex-shrink-0  text-sm xl:text-base flex focus:outline-none text-heading gap-x-3">
                                <UserLineIcon className='w-4 xl:w-[17px] h-auto text-black' />
                                {user?.user.name}
                                <FaSignOutAlt className='w-4 xl:w-[17px] h-auto text-black cursor-pointer' onClick={() => signOut()} />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="main-content flex flex-col flex-grow p-4">
                    <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
                    <div
                        className="flex flex-col flex-grow border-4  bg-white rounded mt-4"
                    >
                        {children}
                    </div>
                </div>
                <div className='block mt-11 lg:m-0'>
                    <StoreMobileNavigation />
                </div>
            </main>
        </div>
    )
}
