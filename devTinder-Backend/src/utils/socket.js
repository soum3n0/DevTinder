const socket = require("socket.io");
const { corsOrigin } = require("../constraints");
const verifySocketAuth = require("../middlewares/verifySocketAuth");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getRoomId = (userId, toUserId) => {
    return [userId, toUserId].sort().join("-");
};

const validateChat = async (userId, toUserId) => {
    const connection = await ConnectionRequest.findOne({
        $or: [
            { fromUserId: userId, toUserId },
            { fromUserId: toUserId, toUserId: userId  },
        ],
        status: "accepted",
    });

    if (!connection) {
        return false;
    }
    return true;
}

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: { origin: corsOrigin, credentials: true },
        transports: ["websocket"],
        path: "/api/socket.io",
    });

    io.use(verifySocketAuth);

    io.on("connection", (socket) => {
        socket.on("joinChat", async ({ toUserId }) => {
            const userId = socket.user._id;
            const isValid = await validateChat(userId, toUserId);
            if(isValid){
                const roomId = getRoomId(userId, toUserId);
                socket.join(roomId);
                socket.emit("joinedRoom");
            }else{
                return socket.emit("errorMessage", "You are not connected to this user.");
            }

        });
        socket.on("sendMessage", async ({ toUserId, message }) => {
            const userId = socket.user._id;
            const roomId = getRoomId(userId, toUserId);

            try {
                const isValid = await validateChat(userId, toUserId);
                if(!isValid){
                    return socket.emit("errorMessage", "Message not sent. You are not connected.");
                }

                // save message to database
                let chat = await Chat.findOne({
                    participants: { $all: [userId, toUserId] },
                });
                if (!chat) {
                    chat = new Chat({
                        participants: [userId, toUserId],
                        messages: [],
                    });
                }
                chat.messages.push({
                    senderId: userId,
                    text: message,
                });
                await chat.save();
                io.to(roomId).emit("messageReceived", { senderId: userId, message, createdAt: new Date() });
            } catch (error) {
                console.error(error);
            }
        });
        socket.on("disconnect", () => {});
    });
};

module.exports = initializeSocket;
