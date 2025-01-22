import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";

const EditProfile = ({ user, setActiveEdit }) => {
    const [newFirstName, setNewFirstName] = useState(user?.firstName || "");
    const [newLastName, setNewLastName] = useState(user?.lastName || "");
    const [newAge, setNewAge] = useState(user?.age || "");
    const [newGender, setNewGender] = useState(user?.gender || "");
    const [newSkills, setNewSkills] = useState(user?.skills.join(", ") || "");
    const [newAbout, setNewAbout] = useState(user?.about || "");
    const [newPhotoUrl, setNewPhotoUrl] = useState(user?.photoUrl || "");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleSaveProfile = async () => {
        try {
            if (error) {
                setError("");
            }
            setLoader(true);
            const updatedUser = {
                firstName: newFirstName,
                lastName: newLastName,
                age: newAge,
                gender: newGender,
                skills: newSkills.split(",").map((skill) => skill.trim()),
                about: newAbout,
                photoUrl: newPhotoUrl,
            };
            const newUser = await axios.patch(
                `${BASE_URL}/profile/update/details`,
                updatedUser,
                { withCredentials: true }
            );
            dispatch(updateUser(newUser.data.user));
            setActiveEdit(false);
        } catch (err) {
            setError("Error updating user");
        } finally {
            setLoader(false);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            if (error) {
                setError("");
            }
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "profile_pictures"); // Your preset name
            setLoader(true);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dodro3hqi/image/upload`,
                formData
            );

            const photoUrl = response.data.secure_url;
            setNewPhotoUrl(photoUrl);
            setLoader(false);
        } catch (err) {
            console.error("Error uploading image:", err);
            setError("Failed to upload image. Please try again.");
            setLoader(false);
        }
    };

    return (
        <div className="absolute flex flex-col gap-2 bg-base-300 p-8 rounded-xl left-1/2 -translate-x-1/2 top-16">
            <label className="input input-bordered flex items-center gap-2">
                First Name
                <input
                    type="text"
                    className="grow text-white"
                    placeholder="Enter First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Last Name
                <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="grow text-white"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Age
                <input
                    type="number"
                    className="grow text-white"
                    min={0}
                    placeholder="Enter age"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Skills
                <input
                    id="skills"
                    type="text"
                    className="grow text-white"
                    min={0}
                    placeholder="Update Skills (comma seperated)"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Gender
                <select
                    className="grow bg-inherit text-white"
                    onChange={(e) => setNewGender(e.target.value)}
                >
                    <option disabled selected>
                        {newGender === "M" ? "Male" : newGender === 'F' ? "Female" : newGender === 'O' ? "Other" : "Gender not set"}
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                About
                <input
                    type="text"
                    className="grow text-white"
                    min={0}
                    placeholder="Update about"
                    value={newAbout}
                    onChange={(e) => setNewAbout(e.target.value)}
                />
            </label>
            <label className="flex flex-col">
                Profile Photo
                <input
                    type="file"
                    className="file-input file-input-bordered grow"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                />
            </label>
            <p className="text-red-500 text-center">{error}</p>
            <div className="flex gap-4">
                <button
                    className="btn flex-1"
                    onClick={() => setActiveEdit(false)}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-primary flex-1"
                    onClick={handleSaveProfile}
                >
                    {loader ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        "Save Profile"
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
