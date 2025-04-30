import React from "react";

const UserListCardSkeleton = () => {
    return (
        <div className="flex w-full flex-col gap-4 md:gap-10">
            <div className="flex items-center gap-4 bg-base-200 px-8 py-4 rounded-xl">
                <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-36"></div>
                    <div className="skeleton h-3 w-40"></div>
                    <div className="skeleton h-3 w-40"></div>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-base-200 px-8 py-4 rounded-xl">
                <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-36"></div>
                    <div className="skeleton h-3 w-40"></div>
                    <div className="skeleton h-3 w-40"></div>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-base-200 px-8 py-4 rounded-xl">
                <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-36"></div>
                    <div className="skeleton h-3 w-40"></div>
                    <div className="skeleton h-3 w-40"></div>
                </div>
            </div>
            <div className="block md:hidden">
                <div className="flex items-center gap-4 bg-base-200 px-8 py-4 rounded-xl">
                    <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-3 w-36"></div>
                        <div className="skeleton h-3 w-40"></div>
                        <div className="skeleton h-3 w-40"></div>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-base-200 px-8 py-4 rounded-xl">
                    <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-3 w-36"></div>
                        <div className="skeleton h-3 w-40"></div>
                        <div className="skeleton h-3 w-40"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListCardSkeleton;
