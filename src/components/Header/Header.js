import React, { useState } from "react";
import { Disclosure } from '@headlessui/react';
import { Link } from "react-router-dom";

export default function Header() {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const [current, setCurrent] = useState('/home');

    const handleNavigationClick = (href) => {
        setCurrent(href);
    };

    const navigation = [
        { name: 'Dashboard', href: '/home' },
        { name: 'Tasks', href: '/recipes' },
        { name: 'Team', href: '/recipedetail' },
        { name: 'About', href: '/about' },
    ];

    return (
        <Disclosure as="nav" className="bg-green-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex justify-between h-16 items-center">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to="/home" className="flex items-center font-sans lg:flex-1 text-sky-500">
                                    <span className="ml-2 text-xl capitalize"
                                          style={{ color: '#FBBF24', fontFamily: 'Dancing Script, cursive' }}>
                                        TaskWALL
                                    </span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => handleNavigationClick(item.href)}
                                            className={classNames(
                                                'rounded-md px-3 py-2 text-sm font-medium group',
                                                item.href === current ? 'bg-yellow-400 text-black' : 'bg-green-800 text-yellow-400',
                                                'hover:text-white group-hover:bg-yellow-400'
                                            )}
                                            aria-current={item.href === current ? 'page' : undefined}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-1 lg:justify-end">
                                <Link
                                    to="/login"
                                    className="d-flex align-items-center gap-1"
                                    style={{

                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease', // Add smooth color transition
                                    }}
                                    hoverStyle={{
                                        color: '#FACC15',
                                    }}
                                >
                                    <i className="ri-login-circle-line"></i> Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="d-flex align-items-center gap-1"
                                    style={{

                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease', // Add smooth color transition
                                    }}
                                    hoverStyle={{
                                        color: '#FACC15',
                                    }}
                                >
                                    Register
                                </Link>

                            </div>

                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
