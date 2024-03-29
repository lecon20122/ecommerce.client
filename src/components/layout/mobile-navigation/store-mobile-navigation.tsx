import SearchIcon from '@components/icons/search-icon';
import MenuIcon from '@components/icons/menu-icon';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { IoAdd, IoClose } from "react-icons/io5";
import StoreMenuMobile from '../store-dashboard/menu-mobile';
import Logo from '@components/ui/logo';
import { ROUTES } from '../../../utils/routes';
import Link from 'next/link';

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

    const { locale } = useRouter();
    const dir = getDirection(locale);
    const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

    const handleOnClickAdd = () => {
        setModalView('ADD_PRODUCT')
        openModal()
    }
    return (
        <>
            <div className=" lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
                <button
                    aria-label="Menu"
                    className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
                    onClick={handleMobileMenu}
                >
                    <MenuIcon />
                </button>
                <button className="flex-shrink-0">
                    <Link href={ROUTES.DASHBOARD_CREATE_PRODUCT_STEPS}>
                        <IoAdd className='text-[30px] font-bold' />
                    </Link>
                </button>
                {/* <button
                    className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
                    onClick={openSearch}
                    aria-label="search-button"
                >
                    <SearchIcon />
                </button> */}
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
                    <div className="flex flex-col justify-between w-full h-full">
                        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
                            <Logo />

                            <button
                                className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
                                onClick={closeSidebar}
                                aria-label="close"
                            >
                                <IoClose className="text-black mt-1 md:mt-0.5" />
                            </button>
                        </div>
                        <StoreMenuMobile />
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default StoreBottomNavigation;
