import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const user = useSelector((store) => store.user);

    const handleLogin = async () => {
        try {
            if (error) {
                setError("");
            }
            const response = await axios.post(
                BASE_URL + "/login",
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(response.data.user));
        } catch (err) {
            setError(err?.response?.data?.error || err?.message);
        }
    };

    const handleSignup = async () => {
        try {
            if (error) {
                setError("");
            }
            const response = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(response.data.user));
        } catch (err) {
            setError(err?.response?.data?.error || err?.message);
        }
    };

    useEffect(() => {
        if (user) {
            // Navigate to the appropriate route based on the action
            navigate("/");
        }
    }, [user, isLogin, navigate]);

    return (
        <div className="w-screen flex justify-center my-10 mb-20">
            <div className="md:w-1/4 flex flex-col gap-1 md:gap-3 text-center">
                <h1 className="font-semibold md:font-bold text-xl md:text-3xl my-2 md:my-4">
                    {isLogin ? "Login" : "Signup"}
                </h1>
                {!isLogin && (
                    <>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        placeholder="Password"
                        className="grow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="hover:bg-gray-800 border border-gray-600 rounded-full py-2"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>
                {isLogin ? (
                    <span>
                        New to DevTinder?{" "}
                        <button
                            className="underline hover:text-gray-500"
                            onClick={() => setIsLogin((value) => !value)}
                        >
                            Register
                        </button>{" "}
                    </span>
                ) : (
                    <span>
                        Already have an account?{" "}
                        <button
                            className="underline hover:text-gray-500"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            Login
                        </button>{" "}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Auth;
