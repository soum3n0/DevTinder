import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import UserFeedCard from "./UserFeedCard";
import FeedSkeleton from "./skeleton/FeedSkeleton";

const cache = { feed: [] };

const Feed = () => {
    const [feedList, setFeedList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const userFeed = async (pageNum = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${BASE_URL}/user/feed?page=${pageNum}&limit=10`,
                { withCredentials: true }
            );
            const newData = response?.data?.data || [];
            setHasMore(response?.data?.pagination?.hasMore ?? false);

            if (pageNum === 1) {
                setFeedList(newData);
                cache.feed = [...newData];
            } else {
                // Append new data on next pages
                setFeedList((prev) => [...prev, ...newData]);
                cache.feed = [...cache.feed, ...newData];
            }
        } catch (err) {
            console.error("Error fetching feed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (feedList.length > 1) return;
        if (cache.feed.length > 0) {
            setFeedList([...cache.feed]);
        } else {
            userFeed(page);
        }
    }, [page]);

    const handleAction = async (status) => {
        const user = feedList[0];
        setFeedList((prev) => {
            const updated = prev.slice(1);
            if (updated.length <= 1 && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
            return updated;
        });
        cache.feed = cache.feed.slice(1);

        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${user._id}`,
                {},
                { withCredentials: true }
            );
        } catch (err) {
            toast.error("Action failed. Please try again.");
            // Add user back to beginning
            setFeedList((prev) => [user, ...prev]);
            cache.feed.unshift(user);
        }
    };

    if (loading) {
        return <FeedSkeleton />;
    }

    if (!loading && feedList.length === 0) {
        return (
            <h1 className="text-center my-20 md:my-64">No users available.</h1>
        );
    }

    return (
        <div className="flex-grow flex justify-center items-center pb-40 md:pb-20">
            <UserFeedCard data={feedList[0]} onAction={handleAction} />
        </div>
    );
};

export default Feed;
