import React from "react";

const Skeleton = () => {
    return (
        <div className="flex justify-center items-center my-28">
            <div className="grid grid-cols-3 w-1/3 gap-4">
                <div className="skeleton h-48 w-full"></div>
                <div className="h-full col-span-2 grid gap-5">
                    <div className="skeleton h-4 w-36"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="flex justify-end gap-2">
                        <div className="skeleton h-8 w-16"></div>
                        <div className="skeleton h-8 w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
