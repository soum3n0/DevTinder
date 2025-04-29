import React from "react";

const ChatUserSkeleton = () => {
    return (
        <div className="flex w-52 flex-col gap-4 pl-4 pb-2">
            <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                <div className="flex gap-4">
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-12"></div>
                </div>
            </div>
        </div>
    );
};

export default ChatUserSkeleton;
