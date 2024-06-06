import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface OnlineUsersContextProps {
  onlineUsers: string[];
  setOnlineUsers: Dispatch<SetStateAction<string[]>>;
}

export const OnlineUsersContext = createContext<OnlineUsersContextProps>(
  {} as OnlineUsersContextProps
);

interface OnlineUsersProviderProps {
  children: ReactNode;
}

export function OnlineUsersProvider({ children }: OnlineUsersProviderProps) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  return (
    <OnlineUsersContext.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </OnlineUsersContext.Provider>
  );
}
