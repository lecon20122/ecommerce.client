import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HomeIcon from '@components/icons/home-icon';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { useSession } from 'next-auth/react';
import { IoAdd } from "react-icons/io5";
import StoreMenuMobile from '../store-dashboard/menu-mobile';

const AuthMenu = dynamic(() => import('@components/layout/header/auth-menu'), {
    ssr: false,
});

const StoreBottomNavigation: React.FC = () => {
    const { openSidebar, closeSidebar, displaySidebar, setDrawerView, openSearch, openModal, setModalView, isAuthorized } = useUI();

    function handleLogin() {
        setModalView('LOGIN_VIEW');
        return openModal();
    }
    function handleMobileMenu() {
        setDrawerView('MOBILE_MENU');
        return openSidebar();
    }

    const { status, data: user } = useSession()

    const { locale } = useRouter();
    const dir = getDirection(locale);
    const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

    const handleOnClickAdd = () => {
        setModalView('ADD_PRODUCT')
        openModal()
    }
    return (
        <>
            <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
                <button
                    aria-label="Menu"
                    className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
                    onClick={handleMobileMenu}
                >
                    <MenuIcon />
                </button>
                <button className="flex-shrink-0">
                    <IoAdd onClick={handleOnClickAdd} className='text-[30px] font-bold' />
                </button>
                <button
                    className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
                    onClick={openSearch}
                    aria-label="search-button"
                >
                    <SearchIcon />
                </button>
            </div>
            <Drawer
                placement={dir === 'rtl' ? 'right' : 'left'}
                open={displaySidebar}
                onClose={closeSidebar}
                handler={false}
                showMask={true}
                level={null}
                contentWrapperStyle={contentWrapperCSS}
            >
                <div className='p-5'>
                    <StoreMenuMobile />
                </div>
            </Drawer>
        </>
    );
};

export default StoreBottomNavigation;
