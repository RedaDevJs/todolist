import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/users/usersSlice.js";
import { fetchUserInfo } from "../../reducers/users/usersActions.js";

const HOME_ROUTE = "/home";
const LOGIN_ICON = <i className="ri-login-circle-line"></i>;

export default function Header() {
  const [current, setCurrent] = useState(HOME_ROUTE);
  const location = useLocation();
  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.reducer.users,
  );

  // Check if the user is an admin
  const isAdmin = currentUser?.role === "admin";

  const dispatch = useDispatch();

  const handleNavigationClick = (href) => {
    setCurrent(href);
    console.log("isAuthenticated :", isAuthenticated);
  };

  const navLinks = [
    { path: HOME_ROUTE, display: "Dashboard" },
    { path: "/team", display: "Team" },
    { path: "/about", display: "About" },
    ...(isAuthenticated ? [{ path: "/tasks", display: "My Tasks" }] : []),
    ...(isAdmin ? [{ path: "/list", display: "List Users" }] : []),
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navbarLinkClass = (path) =>
    `rounded-md px-3 py-2 text-sm font-medium group ${
      location.pathname === path
        ? "bg-yellow-400 text-black"
        : "bg-green-800 text-yellow-400"
    }`;

  return (
    <Disclosure as="nav" className="bg-green-950">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16 items-center">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink
                  to={HOME_ROUTE}
                  className="flex items-center font-sans lg:flex-1 text-sky-500"
                  style={{
                    color: "#FBBF24",
                    fontFamily: "Dancing Script, cursive",
                  }}
                >
                  <span className="ml-2 text-xl capitalize">TaskWALL</span>
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navLinks.map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={navbarLinkClass(item.path)}
                      style={{ textDecoration: "none" }}
                      onClick={() => handleNavigationClick(item.path)}
                      key={index}
                    >
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-1 lg:justify-end">
                {isAuthenticated ? (
                  <>
                    <span className="text-white">{currentUser.username}</span>

                    <NavLink
                      to="/home"
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-1"
                      style={{
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                        color: "#fb2424",
                        fontFamily: "Dancing Script, cursive",
                      }}
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="d-flex align-items-center gap-1"
                      style={{
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {LOGIN_ICON} Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="d-flex align-items-center gap-1"
                      style={{
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
/*import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/users/usersSlice.js";
import { fetchUserInfo } from "../../reducers/users/usersActions.js";

const HOME_ROUTE = "/home";
const LOGIN_ICON = <i className="ri-login-circle-line"></i>;

export default function Header() {
  const [current, setCurrent] = useState(HOME_ROUTE);
  const location = useLocation();
  const { isAuthenticated, currentUser } = useSelector(
      (state) => state.reducer.users,
  );
  // Use optional chaining to handle the case where state.users is undefined
  //const currentUser = useSelector()?.username;
  const dispatch = useDispatch();

  console.log(isAuthenticated);
  const handleNavigationClick = (href) => {
    setCurrent(href);
  };

  const navLinks = [
    { path: HOME_ROUTE, display: "Dashboard" },
    { path: "/team", display: "Team" },
    { path: "/about", display: "About" },
    { path: "/tasks", display: "My Tasks" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navbarLinkClass = (path) =>
      `rounded-md px-3 py-2 text-sm font-medium group ${
          location.pathname === path
              ? "bg-yellow-400 text-black"
              : "bg-green-800 text-yellow-400"
      }`;

  return (
      <Disclosure as="nav" className="bg-green-950">
        {() => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16 items-center">
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <NavLink
                        to={HOME_ROUTE}
                        className="flex items-center font-sans lg:flex-1 text-sky-500"
                        style={{
                          color: "#FBBF24",
                          fontFamily: "Dancing Script, cursive",
                        }}
                    >
                      <span className="ml-2 text-xl capitalize">TaskWALL</span>
                    </NavLink>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navLinks.map((item, index) => (
                          <NavLink
                              to={item.path}
                              className={navbarLinkClass(item.path)}
                              style={{ textDecoration: "none" }}
                              onClick={() => handleNavigationClick(item.path)}
                              key={index}
                          >
                            {item.display}
                          </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                        <>
                          <span className="text-white">{currentUser.username}</span>

                          <NavLink
                              to="/home"
                              onClick={handleLogout}
                              className="d-flex align-items-center gap-1"
                              style={{
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                                color: "#fb2424",
                                fontFamily: "Dancing Script, cursive",
                              }}
                          >
                            Logout
                          </NavLink>
                        </>
                    ) : (
                        <>
                          <NavLink
                              to="/login"
                              className="d-flex align-items-center gap-1"
                              style={{
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                              }}
                          >
                            {LOGIN_ICON} Login
                          </NavLink>
                          <NavLink
                              to="/register"
                              className="d-flex align-items-center gap-1"
                              style={{
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                              }}
                          >
                            Register
                          </NavLink>
                        </>
                    )}
                  </div>
                </div>
              </div>
            </>
        )}
      </Disclosure>
  );
}*/
