import React, { useState } from "react";
import { Disclosure } from '@headlessui/react';
import { Link } from "react-router-dom";
import SignInModal from "../Ui/SignIn";
import SignUpModal from "../Ui/SignUp";

export default function Header() {
    const [signInModal, setSignInModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);

    const openSignInModal = () => {
        setSignInModal(true);
    };

    const openSignUpModal = () => {
        setSignUpModal(true);
    };

    const closeModals = () => {
        setSignInModal(false);
        setSignUpModal(false);
    };

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
                                    onClick={openSignInModal}
                                    className="rounded-md text-sm font-medium text-yellow-400 hover:text-yellow-400  "
                                    style={{color: '#FFFFFF', textDecoration: 'none'}}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    onClick={openSignUpModal}
                                    className="rounded-md text-sm font-medium text-yellow-400 hover:text-yellow-400  "
                                    style={{color: '#FFFFFF', textDecoration: 'none',  }}
                                >
                                    Sign Up
                                </Link>
                            </div>

                        </div>
                    </div>
                    <SignInModal toggle={closeModals} modal={signInModal}/>
                    <SignUpModal toggle={closeModals} modal={signUpModal}/>
                </>
            )}
        </Disclosure>
    );
}
