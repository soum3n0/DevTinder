import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
import { removeUser } from "../utils/userSlice";
import { toggleTheme } from "../utils/themeSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const theme = useSelector((store) => store.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout",
                {},
                { withCredentials: true }
            );
            dispatch(removeUser());
            setSuccess(true);
            navigate("/auth");
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        }
    };

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className="navbar bg-base-200 py-2 px-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    DevTinder
                </Link>
            </div>
            <label className="flex cursor-pointer gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                    type="checkbox"
                    onChange={() => dispatch(toggleTheme())}
                    checked={theme === "dark"}
                    className="toggle theme-controller"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
            {user && (
                <div className="flex-none gap-2 mx-5">
                    <h2 className="mx-4">Hello, {user.firstName}</h2>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections">Connections</Link>
                            </li>
                            <li>
                                <Link to="/requests">Requests</Link>
                            </li>
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {error && (
                <div
                    role="alert"
                    className="alert alert-error absolute w-1/5 top-10 left-1/2 -translate-x-1/2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Failed to logout user!</span>
                </div>
            )}
            {success && (
                <div
                    role="alert"
                    className="alert alert-success absolute w-1/5 top-10 left-1/2 -translate-x-1/2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Logout successfull!</span>
                </div>
            )}
        </div>
    );
};

export default NavBar;
