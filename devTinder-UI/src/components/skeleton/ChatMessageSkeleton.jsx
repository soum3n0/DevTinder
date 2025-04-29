import React from "react";

const ChatMessageSkeleton = () => {
    return (
        <>
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                    <div className="chat chat-start">
                        <div className="chat-bubble skeleton w-1/3"></div>
                        <div className="chat-footer">
                            <time className="text-xs opacity-50">--:--</time>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble skeleton w-1/3"></div>
                        <div className="chat-footer">
                            <time className="text-xs opacity-50">--:--</time>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatMessageSkeleton;
