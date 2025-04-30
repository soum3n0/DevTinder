import React from "react";

const Skeleton = () => {
    return (
        <div className="flex justify-center items-center my-28">
            <div className="grid grid-rows-3 md:grid-cols-3 md:w-1/3 gap-4">
                <div className="skeleton md:h-48 md:w-full w-60"></div>
                <div className="h-full col-span-2 grid gap-5">
                    <div className="skeleton h-4 w-36"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="flex justify-center md:justify-end gap-2">
                        <div className="skeleton h-8 w-16"></div>
                        <div className="skeleton h-8 w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
