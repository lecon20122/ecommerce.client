import React from 'react'
import { useUI } from '../../../../contexts/ui.context';
import { FaWindowClose } from "react-icons/fa";

export default function Sidebar() {

    const { closeStoreSideBar, StoreDashboardSideBar } = useUI()
    
    return (
        // < !--start sidebar-- >
        <div id="sideBar" className={`relative flex flex-col flex-wrap bg-white border-r
        border-gray-300 p-6 flex-none w-64 ${StoreDashboardSideBar ? '-ml-0 md:slideInLeft' : '-ml-64 md:slideOutLeft'} fixed top-0  h-screen shadow-xl animated faster`}>

            {/* <!-- sidebar content --> */}
            <div className="flex flex-col">

                {/* <!-- sidebar toggle --> */}
                <div className="text-right mb-4">
                    <button id="sideBarHideBtn" onClick={closeStoreSideBar}>
                        <FaWindowClose />
                    </button>
                </div>
                {/* <!-- end sidebar toggle --> */}

                <p className="uppercase text-xs text-gray-600 mb-4 tracking-wider">homes</p>

                {/* <!-- link --> */}
                <a href="./index.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-chart-pie text-xs mr-2"></i>
                    Analytics dashboard
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="./index-1.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-shopping-cart text-xs mr-2"></i>
                    ecommerce dashboard
                </a>
                {/* <!-- end link --> */}

                <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">apps</p>

                {/* <!-- link --> */}
                <a href="./email.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                    email
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-comments text-xs mr-2"></i>
                    chat
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-shield-check text-xs mr-2"></i>
                    todo
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-calendar-edit text-xs mr-2"></i>
                    calendar
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-file-invoice-dollar text-xs mr-2"></i>
                    invoice
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-folder-open text-xs mr-2"></i>
                    file manager
                </a>
                {/* <!-- end link -->    */}


                <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">UI Elements</p>

                {/* <!-- link --> */}
                <a href="./typography.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-text text-xs mr-2"></i>
                    typography
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="./alert.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-whistle text-xs mr-2"></i>
                    alerts
                </a>
                {/* <!-- end link --> */}


                {/* <!-- link --> */}
                <a href="./buttons.html" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-cricket text-xs mr-2"></i>
                    buttons
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-box-open text-xs mr-2"></i>
                    Content
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-swatchbook text-xs mr-2"></i>
                    colors
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-atom-alt text-xs mr-2"></i>
                    icons
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-club text-xs mr-2"></i>
                    card
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-cheese-swiss text-xs mr-2"></i>
                    Widgets
                </a>
                {/* <!-- end link --> */}

                {/* <!-- link --> */}
                <a href="#" className="mb-3 capitalize font-extrabold text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-computer-classic text-xs mr-2"></i>
                    Components
                </a>
                {/* <!-- end link --> */}



            </div>
            {/* <!-- end sidebar content --> */}

        </div>
        // <!--end sidbar-- >
    )
}
