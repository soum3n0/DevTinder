import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import {Link} from "react-router-dom";

const UserListCard = ({ user, isRequest, _id }) => {
    const {firstName, lastName, gender, age, skills, photoUrl } = user;
    const dispatch = useDispatch();

    const handleClick = async (status) => {
        try {
            await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (error) {}
    };

    return (
        <div className="bg-base-300 rounded-xl px-8 md:px-12 py-2 md:py-4 font-light my-2 md:my-4 flex gap-4 md:gap-6 items-center">
            <div className="avatar">
                <div className="w-16 md:w-20 rounded-full">
                    <img src={photoUrl} loading="lazy" />
                </div>
            </div>
            <div key={_id} className="flex-grow">
                <h1 className="font-semibold md:text-lg">
                    {firstName + " " + lastName}
                </h1>
                <h2 className="text-sm">
                    {age} - {gender === "M" ? "Male" : "Female"}
                </h2>
                <p className="text-sm">
                    {skills.join(", ") || "No Skills added."}
                </p>
            </div>
            {isRequest ? (
                <div className="flex flex-col py-1 md:py-0 gap-1 md:gap-2">
                    <button
                        className="bg-green-500 hover:bg-green-600 px-2 py-1 md:px-4 md:py-2 rounded-lg md:font-medium font-normal text-black"
                        onClick={() => handleClick("accepted")}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 px-2 py-1 md:px-4 md:py-2 rounded-lg md:font-medium font-normal text-black"
                        onClick={() => handleClick("rejected")}
                    >
                        Reject
                    </button>
                </div>
            ) : (
                <Link to={`/chat/${user?._id}`}>
                    <button className="btn btn-primary btn-sm md:btn-md">Chat</button>
                </Link>
            )}
        </div>
    );
};

export default UserListCard;
