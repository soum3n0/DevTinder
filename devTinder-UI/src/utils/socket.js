import {io} from "socket.io-client";
import {BASE_URL} from "./constraints";

export const createSocketConnection = () => {
    if(location.hostname === "localhost"){
        return io(BASE_URL, {
            transports: ["websocket"],
            withCredentials: true,
        });
    }else{
        return io("/", {
            path: "/socket.io",
            transports: ["websocket"],
            withCredentials: true,
        });
    }
}