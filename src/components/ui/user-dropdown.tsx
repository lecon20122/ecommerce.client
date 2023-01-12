import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";
import { siteSettings } from "@settings/site-settings";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import UserIcon from "@components/icons/user-icon";
import { IoChevronBackOutline, IoLogOutOutline } from "react-icons/io5";
import { BsArrowDown } from "react-icons/bs";
import { FaChevronDown, FaSignOutAlt } from 'react-icons/fa';

export default function UserDropDown() {
    const { site_header } = siteSettings;
    const { t } = useTranslation("common");
    const { status, data: user } = useSession()
    const options = site_header.languageMenu;
    const router = useRouter();
    const { asPath, locale } = router;
    const currentSelectedItem = locale
        ? options.find((o) => o.value === locale)!
        : options[2];

    const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

    function handleItemClick(values: any) {
        setSelectedItem(values);
        router.push(asPath, undefined, {
            locale: values.value,
        });
    }

    return (
        <Listbox value={selectedItem} onChange={handleItemClick}>
            {({ open }) => (
                <div className="relative ms-2 lg:ms-0 z-10 w-full">
                    <Listbox.Button className=" text-heading text-[13px] xl:text-sm font-semibold  relative w-full py-2 ps-3 pe-7 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer">
                        <span className="flex truncate items-center rtl:mr-2">
                            <span className="me-1.5"><UserIcon width="12px" /></span>{" "}
                            <span className="text-md">{user?.user.name}</span>
                        </span>
                        <span className="absolute inset-y-0 end-0 flex items-center pe-1.5 pointer-events-none">
                            <FaChevronDown
                                className="w-3 h-3 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            static
                            className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                        >
                            <Listbox.Option
                                key={1}
                                className={({ active }) =>
                                    `${active ? "w-full text-amber-900 bg-gray-100" : "text-gray-900"}
												cursor-pointer select-none relative py-2 px-3`
                                }
                                value={"Sign out"}
                            >
                                {({ selected, active }) => (
                                    <span className="flex items-center" onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
                                        <IoLogOutOutline />
                                        <span

                                            className={`${selected ? "font-medium" : "font-normal"
                                                } block truncate ms-1.5`}
                                        >
                                            Sign out
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active && "text-amber-600"}
                                 absolute inset-y-0 start-0 flex items-center ps-3`}
                                            />
                                        ) : null}
                                    </span>
                                )}
                            </Listbox.Option>
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    );
}
