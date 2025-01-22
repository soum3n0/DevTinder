import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import {BASE_URL} from "../utils/constraints";

const UserCard = ({ data }) => {
    if(!data){
        return <h1 className="text-center my-20">No user available.</h1>
    }
    const { _id, firstName, lastName, age, gender, skills, about, photoUrl } = data;
    const dispatch = useDispatch();

    const handleLikeOrPass = async (status) => {
        try {
            await axios.post(
                BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeFeed(_id));
        } catch (err) {}
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl m-28">
            <figure>
                <img
                    src={photoUrl}
                    alt={firstName}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-3xl">
                    {firstName + " " + lastName}
                </h2>
                <h3 className="font-bold">
                    {age !== undefined ? age : "Age not set"} - {gender === "M" ? "Male" : gender === 'F' ? "Female" : gender === 'O' ? "Other" : "Gender not set"}
                </h3>
                <p className="w-3/4">{skills.length === 0 ? "Skills not added" : skills.join(", ")}</p>
                <p className="w-3/4">{about}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn"
                        onClick={() => handleLikeOrPass("pass")}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleLikeOrPass("like")}
                    >
                        Connect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
