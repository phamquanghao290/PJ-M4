import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Disclosure, Menu, Transition } from "@headlessui/react";



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Header = () => {
    const navigate = useNavigate();
    const [navigation, setNavigation] = useState([
        { name: "Home", a: "/", current: false },
        { name: "Product", a: "/product", current: false },
        { name: "About", a: "#", current: false },
        { name: "Contact", a: "#", current: false },
    ]);

    const changeStatus = (index: number) => {
        const result = [...navigation];
        for (let i = 0; i < result.length; i++) {
            if (i == index) {
                result[i].current = true;
            } else {
                result[i].current = false;
            }
        }
        setNavigation(result);
    };

    const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("userLogin");
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div className="sticky top-0 z-50 !bg-blue-800">
            <div className="flex flex-1 max-w-[1500px] m-auto items-center justify-evenly h-18 !bg-blue-800 sticky top-0 inset-y-0">
                <div className="flex items-center gap-2.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="29"
                        viewBox="0 0 25 29"
                        fill="none"
                    >
                        <path
                            d="M3.56348 22.9H24.5V0.5H3.5057C1.57228 0.506417 0.00635613 2.08725 0 4.03908V24.6646H0.00057783C0.00057783 24.6733 0 24.6821 0 24.6908C0 26.7558 1.60521 28.5 3.5057 28.5H24.5V26.6333H3.5057C2.63895 26.6333 1.84906 25.7076 1.84906 24.6908C1.84906 23.7202 2.63433 22.9 3.56348 22.9ZM5.54717 2.38592H11.0943V12.4671L8.29764 9.9885L5.54717 12.4525V2.38592ZM1.84906 4.05367C1.84617 3.12617 2.58695 2.37192 3.5057 2.36667H3.69811H5.54717H3.69811V14.9667H5.52637L8.30458 12.4782L11.1117 14.9667H12.9434V2.36667H22.6509V21.0333H5.55179H3.70274H3.56348C2.96196 21.0333 2.37141 21.192 1.84963 21.493V4.05367H1.84906Z"
                            fill="#FFCA42"
                        />
                    </svg>
                    <p className="text-xl" style={{ color: "#FFCA42" }}>
                        FUTURER BOOK
                    </p>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 text-xl">
                        {navigation.map((item, index) => (
                            <Link
                                onClick={() => changeStatus(index)}
                                key={item.name}
                                to={item.a}
                                className={classNames(
                                    item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <input
                    // onChange={handleSearch}
                    placeholder="Search the product"
                    type="text"
                    className="w-full max-w-[250px] h-[40px] p-[12px] rounded-lg"
                ></input>
                {userLogin ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <Link to="/cart">
                                <span className="absolute -inset-1.5" />
                            </Link>

                            <span className="sr-only">View notifications</span>
                            <AiOutlineShoppingCart />
                        </button>
                        <p className="text-white">
                            cart
                        </p>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? "bg-white" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Your Profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? "bg-white" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleLogout()}
                                                className={classNames(
                                                    active ? "bg-white" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                ) : (
                    <Link to={"/login"}>
                        <button className="bg-yellow-500 w-24 h-10 rounded-lg ml-5 text-white">
                            Log In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header