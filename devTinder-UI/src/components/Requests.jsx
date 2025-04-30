import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import UserListCardSkeleton from "./skeleton/UserListCardSkeleton";
import UserListCard from "./UserListCard";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const getRequests = async () => {
        try {
            const response = await axios.get(
                BASE_URL + "/user/requests/received",
                {
                    withCredentials: true,
                }
            );
            dispatch(addRequests(response?.data?.data));
        } catch (error) {}
    };

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-lg md:text-2xl font-semibold md:font-bold my-4">Requests</h1>
            <div className="w-11/12 md:w-1/2 overflow-y-auto">
                {requests === null ? (
                    <UserListCardSkeleton />
                ) : requests.length === 0 ? (
                    <h1 className="text-center">No Requests received.</h1>
                ) : (
                    requests.map((request) => {
                        return (
                            <UserListCard
                                user={request.fromUserId}
                                key={request._id}
                                isRequest={true}
                                _id={request._id}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Requests;
