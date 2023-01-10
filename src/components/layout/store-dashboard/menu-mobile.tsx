import Scrollbar from '@components/common/scrollbar';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { useUI } from '../../../contexts/ui.context';
import { useState } from 'react';

export default function StoreMenuMobile() {

    const [activeMenus, setActiveMenus] = useState<any>([]);
    const { closeSidebar } = useUI();
    const { t } = useTranslation('menu');

    const handleArrowClick = (menuName: string) => {
        let newActiveMenus = [...activeMenus];

        if (newActiveMenus.includes(menuName)) {
            var index = newActiveMenus.indexOf(menuName);
            if (index > -1) {
                newActiveMenus.splice(index, 1);
            }
        } else {
            newActiveMenus.push(menuName);
        }

        setActiveMenus(newActiveMenus);
    };

    const menu = [
        {
            id: 1,
            path: '/dashboard',
            label: 'menu-dashboard',
            SubMenu : []
        },
        {
            id: 1,
            path: '/dashboard/products',
            label: 'menu-products',
            SubMenu : []
        },
    ]

    const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex, className = '' }: any) =>
        data.label && (
            <li className={`mb-0.5 ${className}`}>
                <div className="flex items-center justify-between relative">
                    <Link
                        href={data.path}
                        className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
                    >
                        <span className="block w-full" onClick={closeSidebar}>
                            {t(`${data.label}`)}
                        </span>
                    </Link>
                    {hasSubMenu && (
                        <div
                            className="cursor-pointer w-full h-full text-lg flex items-center justify-end absolute start-0 top-0 pe-5"
                            onClick={() => handleArrowClick(menuName)}
                        >
                            <IoIosArrowDown
                                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                                    }`}
                            />
                        </div>
                    )}
                </div>
                {hasSubMenu && <SubMenu dept={dept} data={data.subMenu} toggle={activeMenus.includes(menuName)} menuIndex={menuIndex} />}
            </li>
        );
    const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
        if (!toggle) {
            return null;
        }

        dept = dept + 1;

        return (
            <ul className="pt-0.5">
                {data?.map((menu: any, index: number) => {
                    const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

                    return (
                        <ListMenu
                            dept={dept}
                            data={menu}
                            hasSubMenu={menu.subMenu}
                            menuName={menuName}
                            key={menuName}
                            menuIndex={index}
                            className={dept > 1 && 'ps-4'}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <Scrollbar className="menu-scrollbar">
            <div className="flex flex-col text-heading">
                <ul className="mobileMenu">
                    {menu.map((menu, index) => {
                        const dept: number = 1;
                        const menuName: string = `sidebar-menu-${dept}-${index}`;

                        return <ListMenu dept={dept} data={menu} menuName={menuName} key={menuName} menuIndex={index} />;
                    })}
                </ul>
            </div>
        </Scrollbar>
    )
}
