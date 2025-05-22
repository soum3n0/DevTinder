import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import UserListCardSkeleton from "./skeleton/UserListCardSkeleton";
import UserListCard from "./UserListCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const getConnections = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(response?.data?.data));
        } catch (error) {}
    };

    useEffect(() => {
        getConnections();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-bold my-4">Connections</h1>
            <div className="w-11/12 md:w-1/2 overflow-y-auto">
                {connections === null ? (
                    <UserListCardSkeleton />
                ) : connections.length === 0 ? (
                    <h1 className="text-center my-20">No connections available.</h1>
                ) : (
                    connections.map((connection) => {
                        return (
                            <UserListCard
                                user={connection}
                                key={connection._id}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Connections;
