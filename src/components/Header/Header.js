import React, { useState } from "react";
import { Disclosure } from '@headlessui/react';
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
    const [current, setCurrent] = useState('/home');
    const location = useLocation();

    const handleNavigationClick = (href) => {
        setCurrent(href);
    };

    let navLinks = [
        {
            path: '/home',
            display: 'Dashboard',
        },
        {
            path: '/team',
            display: 'Team',
        },
        {
            path: '/about',
            display: 'About',
        },
        {
            path: '/tasks',
            display: 'My Tasks',
        }
    ];

    return (
        <Disclosure as="nav" className="bg-green-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex justify-between h-16 items-center">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <NavLink to="/home" className="flex items-center font-sans lg:flex-1 text-sky-500">
                                    <span className="ml-2 text-xl capitalize"
                                          style={{ color: '#FBBF24', fontFamily: 'Dancing Script, cursive' }}>
                                        TaskWALL
                                    </span>
                                </NavLink>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navLinks.map((item, index) => (
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) =>
                                                location.pathname === item.path
                                                    ? 'rounded-md px-3 py-2 text-sm font-medium group bg-yellow-400 text-black'
                                                    : 'bg-green-800 text-yellow-400 rounded-md px-3 py-2 text-sm font-medium group'
                                            }
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                            onClick={() => handleNavigationClick(item.path)}
                                            key={index}
                                        >
                                            {item.display}
                                        </NavLink>
                                    ))}

                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-1 lg:justify-end">
                                <NavLink
                                    to="/login"
                                    className="d-flex align-items-center gap-1"
                                    style={{
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    <i className="ri-login-circle-line"></i> Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="d-flex align-items-center gap-1"
                                    style={{
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Register
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
