import { useContext } from "react";
import { OnlineUsersContext } from "../context/OnlineUsers";

export default function useWebSocketOnlineUsers() {
  const { onlineUsers, setOnlineUsers } = useContext(OnlineUsersContext);

  const verifyOnlineUser = (id: string) => {
    return onlineUsers.includes(id);
  }

  return {
    onlineUsers,
    setOnlineUsers,
    verifyOnlineUser,
  };
}
