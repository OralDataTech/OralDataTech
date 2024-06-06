import { Box, Skeleton } from "@mui/material";
import style from "./Users.module.css";
import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import useUsers from "../../../hooks/useUsers";
import { Link } from "react-router-dom";
import CustomBadgeAvatar from "../../custom-badge-avatar/CustomBadgeAvatar";
import useLoading from "../../../hooks/useLoading";

export default function Users() {
  const { getAll } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const { loading } = useLoading();
  useEffect(() => {
    async function fetchAll() {
      const data = (await getAll(1, 10)).results;
      setUsers(data);
    }
    fetchAll();
  }, []);

  return (
    <Box component={"section"} className={`${style["users"]} custom-section`}>
      <Box className={style["title-section"]}>
        <p>Usuários</p>
        <Link to="/usuarios">Ver mais</Link>
      </Box>
      <Box className={style["users-container"]}>
        {loading &&
          [...Array(10)].map((_, index) => (
            <Box
              gap={"0.2rem"}
              key={index}
              display={"flex"}
              flexDirection={"column"}
            >
              <Skeleton
                sx={{
                  display: "flex",
                  flexShrink: "0",
                }}
                variant="circular"
                width={50}
                height={50}
              />
              <Skeleton
                sx={{
                  display: "flex",
                  flexShrink: "0",
                }}
                variant="rectangular"
                width={50}
                height={10}
              />
            </Box>
          ))}
        {!loading &&
          users.map((user) => (
            <Box className={style["discipline-card"]} key={user.id}>
              <CustomBadgeAvatar user={user} />
              <span>
                {user.name.length <= 6
                  ? user.name
                  : `${user.name.slice(0, 6)}...`}
              </span>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
