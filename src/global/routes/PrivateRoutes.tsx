import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import io from "socket.io-client";
import useWebSocketOnlineUsers from "../hooks/useWebSocketOnlineUsers";

export default function PrivateRoutes() {
  const { verifyToken, user } = useAuth();
  const { setOnlineUsers } = useWebSocketOnlineUsers();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_URL + "online-users");
    socket.on("enter", (data) => {
      setOnlineUsers(data);
    });

    socket.on("exit", (data) => {
      setOnlineUsers(data);
    });

    if (user && user.id)
      socket.send("message", { type: "enter", payload: user.id });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return verifyToken() ? <Outlet /> : <Navigate to="/login" />;
}
