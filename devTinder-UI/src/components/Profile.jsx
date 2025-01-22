import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const [activeEdit, setActiveEdit] = useState(false);
    

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        email,
        age,
        gender,
        skills,
        about,
        photoUrl,
        createdAt,
        updatedAt,
    } = user;

    

    return (
        <div className="grid grid-cols-3 my-20 mx-auto w-2/3">
            <div className="avatar flex flex-col">
                <div className="w-48 rounded-full">
                    <img src={photoUrl} />
                </div>
            </div>
            <div className="col-span-2">
                <h2 className="text-3xl font-bold">
                    {firstName + " " + lastName}
                </h2>
                <div>{email}</div>
                <div>
                    {age} -{" "}
                    {gender === "M" ? "Male" : gender === 'F' ? "Female" : gender === 'O' ? "Other" : "Gender not set"}
                </div>
                <p className="font-semibold">
                    Skills :{" "}
                    <span className="font-normal">
                        {skills.length === 0
                            ? "No skills added"
                            : skills.join(", ")}
                    </span>
                </p>
                <p className="font-semibold">
                    About :{" "}
                    <span className="font-normal">
                        {about}
                    </span>
                </p>
                <div>Profile created at : {createdAt.slice(0, 10)}</div>
                <div>Last updated at : {updatedAt.slice(0, 10)}</div>
                <button
                    className="btn btn-primary mt-10"
                    onClick={() => setActiveEdit(true)}
                >
                    Edit Profile
                </button>
            </div>

            {activeEdit && (
                <EditProfile user={user} setActiveEdit={setActiveEdit} />
            )}
        </div>
    );
};

export default Profile;
