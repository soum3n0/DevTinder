import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import UserFeedCard from "./UserFeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedSkeleton from "./skeleton/FeedSkeleton";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const userFeed = async () => {
        try {
            const response = await axios.get(
                BASE_URL + "/user/feed?page=1&limit=10",
                { withCredentials: true }
            );
            dispatch(addFeed(response?.data?.data));
        } catch (err) {}
    };

    useEffect(() => {
        userFeed();
    }, []);

    if (!feed) {
        return <FeedSkeleton />;
    }

    return (
        <div className="flex-grow flex justify-center items-center pb-40 md:pb-20">
            <UserFeedCard data={feed[0]} />
        </div>
    );
};

export default Feed;
