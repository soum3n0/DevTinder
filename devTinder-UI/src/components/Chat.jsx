import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import ChatUserSkeleton from "./skeleton/ChatUserSkeleton";
import ChatMessageSkeleton from "./skeleton/ChatMessageSkeleton";

const Chat = () => {
    const { toUserId } = useParams();
    const user = useSelector((store) => store.user);
    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messageIsLoading, setMessageIsLoading] = useState(true);
    const socket = useRef(null);
    const messagesEndRef = useRef(null);

    const navigator = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getUserDetails = async () => {
        const response = await axios.get(`${BASE_URL}/fetch/user/${toUserId}`, {
            withCredentials: true,
        });
        setChatUser(response?.data);
    };

    async function fetchMessages() {
        try {
            setMessageIsLoading(true);
            const response = await axios.get(
                `${BASE_URL}/fetch/messages/${toUserId}`,
                {
                    withCredentials: true,
                }
            );
            setMessages(response?.data);
        } catch (err) {
            console.error(err);
        } finally {
            setMessageIsLoading(false);
        }
    }

    const userId = user?._id;

    useEffect(() => {
        if (!user) return;
        socket.current = createSocketConnection();
        socket.current.on("connect", () => {
            socket.current.emit("joinChat", { toUserId });
        });

        socket.current.on("joinedRoom", () => {
            getUserDetails();
            fetchMessages();
        });

        socket.current.on(
            "messageReceived",
            ({ senderId, message, createdAt }) => {
                setMessages((mes) => [
                    ...mes,
                    { senderId, text: message, createdAt },
                ]);
            }
        );

        socket.current.on("errorMessage", (msg) => {
            navigator("/");
            alert(msg);
        });

        return () => {
            if (socket.current) {
                socket.current.off("messageReceived");
                socket.current.off("connect");
                socket.current.off("joinedRoom");
                socket.current.off("errorMessage");
                socket.current.disconnect();
            }
        };
    }, [userId, toUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket.current) return;

        try {
            socket.current.emit("sendMessage", {
                toUserId,
                message: newMessage,
            });

            setNewMessage("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="border border-gray-700 rounded-md w-full md:w-3/5 xl:1/2 h-[81vh] m-auto p-4 md:p-6 flex flex-col relative">
            {chatUser === null ? (
                <ChatUserSkeleton />
            ) : (
                <div className="flex items-center gap-4 pb-2 px-4">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={chatUser?.photoUrl}
                            />
                        </div>
                    </div>
                    <span className="md:text-lg font-medium">{`${chatUser?.firstName} ${chatUser?.lastName}`}</span>
                </div>
            )}
            <div className="border border-gray-800"></div>
            <div className="flex-1 px-4 md:px-10 py-6 overflow-x-auto">
                {messageIsLoading === true ? (
                    <ChatMessageSkeleton />
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        Start a conversation
                    </div>
                ) : (
                    messages.map((mes, index) => {
                        const { senderId, text, createdAt } = mes;
                        return (
                            <div
                                key={index}
                                className={`chat ${
                                    senderId === toUserId
                                        ? "chat-start"
                                        : "chat-end"
                                }`}
                            >
                                <div className="chat-bubble">{text}</div>
                                <div className="chat-footer">
                                    <time className="text-xs opacity-50">
                                        {new Date(createdAt).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </time>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-4 md:gap-6 mt-4 md:mx-10">
                <input
                    className="flex-1 rounded-md bg-gray-900 px-4"
                    type="text"
                    placeholder="Message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            handleSendMessage(e);
                        }
                    }}
                ></input>
                <button
                    className="btn"
                    title="Send"
                    onClick={handleSendMessage}
                >
                    <IoSend className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default Chat;
