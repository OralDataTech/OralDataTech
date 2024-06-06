import { Avatar, Box } from "@mui/material";
import style from "./CardUser.module.css";
import { User } from "../../types/User";
import useIcons from "../../hooks/useIcons";
import { useState } from "react";
import MoreOptions from "../more-options/MoreOptions";
import ConfirmModal from "../confirm-action/ConfirmAction";
import useAuth from "../../hooks/useAuth";
import useUsers from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";

interface CardUserProps {
  user: User;
  dispachTrigger?: () => void;
  disableClickViewProfile?: boolean;
}

export default function CardUser({
  user,
  dispachTrigger,
  disableClickViewProfile = false,
}: CardUserProps) {
  const { verifyPhotoPath } = useIcons();
  const [open, setOpen] = useState(false);
  const { isAdmin, user: userLogged } = useAuth();
  const { deleteUser } = useUsers();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(user.id);
    dispachTrigger && dispachTrigger();
    setOpen(false);
  };
  return (
    <Box className={style["user-card"]}>
      <Box className={style["head-user-card"]}>
        <img src="/bg-uespi.webp" />
        {isAdmin() && user.email !== userLogged.email && (
          <>
            <ConfirmModal
              open={open}
              onClose={() => setOpen(false)}
              severity="warning"
              dispach={handleDelete}
            />
            <MoreOptions
              sx={{
                position: "absolute",
                right: "3px",
                top: "3px",
                float: "right",
                color: "var(--primary)",
                backgroundColor: "var(--background)",
                boxShadow: "0px 7px 17px 15px rgba(0,0,0,0.1)",
              }}
              options={[
                {
                  action: () => {},
                  name: "Editar",
                  isLink: true,
                  to: `${user.id}`,
                },
                {
                  action: () => setOpen(true),
                  name: "Excluir",
                  isLink: false,
                },
              ]}
            />
          </>
        )}
        <Avatar
          className={style["avatar"]}
          alt={`Imagem do usuário ${user.name}`}
          src={verifyPhotoPath(user)}
          sx={{ width: 150, height: 150 }}
          onClick={() => {
            if (!disableClickViewProfile) navigate(`/perfil/${user.id}`);
          }}
        />
      </Box>
      <Box className={style["another-information"]}>
        <Box>
          <small>Sexo</small>
          <p>{user.gender}</p>
        </Box>

        <Box>
          <small>Tipo</small>
          <p>
            {user.role === "admin"
              ? "Adm"
              : user.role === "user"
              ? "Aluno"
              : "Professor"}
          </p>
        </Box>
      </Box>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Box>
  );
}
