import { Fragment, useEffect, useState } from "react";
import { User } from "../../../../global/types/User";
import useUsers from "../../../../global/hooks/useUsers";
import useIcons from "../../../../global/hooks/useIcons";
import { Box, Button, Fab, FormControl, Modal } from "@mui/material";
import style from "./SelectUser.module.css";
import CardUser from "../../../../global/components/card-user/CardUser";

interface SelectUserProps {
  dispach: (user: User) => void;
  type: "teacher" | "studentASB" | "studentCD";
  defaultUser?: User;
  disabledEdit?: boolean;
}

export default function SelectUser({
  dispach,
  type,
  defaultUser,
  disabledEdit = false,
}: SelectUserProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getAll } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { CheckRoundedIcon, CloseRoundedIcon } = useIcons();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getPatients() {
      const response = await getAll(page, 10);
      setTotalPages(response.total_pages);
      setUsers([...users, ...response.results]);
    }
    getPatients();
  }, [page]);

  return (
    <>
      {defaultUser && (
        <>
          <h3>
            {type === "teacher"
              ? "Professor"
              : type === "studentASB"
              ? "Aluno ASB"
              : "Aluno CD"}
          </h3>
          <CardUser user={defaultUser} disableClickViewProfile />
        </>
      )}
      <Modal
        className={style["modal-select-user"]}
        open={open}
        onClose={() => setOpen(false)}
      >
        <>
          <Box className={`${style["modal-select-user-container"]} container`}>
            <Box className={style["description"]}>
              <Button
                startIcon={<CloseRoundedIcon />}
                onClick={() => setOpen(false)}
                variant="text"
                color="error"
              >
                Fechar
              </Button>
              <h2>
                Selecione o{" "}
                {type === "teacher" ? "Professor responsável" : "aluno"}
              </h2>
              <small>
                Esse usuário será o{" "}
                {type === "teacher"
                  ? "professor responsável pelo"
                  : type === "studentASB"
                  ? "Aluno ASB"
                  : "Aluno CD"}
              </small>
            </Box>
            {users &&
              users.map((user) => (
                <Fragment key={user.id}>
                  <Button
                    className={style["button-select"]}
                    onClick={() => setSelectedUser(user)}
                    key={user.id}
                    disabled={
                      (user.role === "teacher" && type !== "teacher") ||
                      (user.role === "user" && type === "teacher")
                    }
                  >
                    <CardUser disableClickViewProfile user={user} />
                  </Button>
                </Fragment>
              ))}
            {page < totalPages && (
              <Button
                onClick={() => setPage(page + 1)}
                variant="contained"
                color="error"
              >
                Ver mais
              </Button>
            )}
          </Box>
          {selectedUser && (
            <Fab
              color={"success"}
              variant="extended"
              sx={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                gap: "1rem",
              }}
              onClick={() => {
                dispach(selectedUser);
                setOpen(false);
              }}
            >
              <CheckRoundedIcon /> Confirmar
            </Fab>
          )}
        </>
      </Modal>
      <FormControl className={style["btn-group"]}>
        <Button
          variant="contained"
          disabled={disabledEdit}
          color="error"
          onClick={() => setOpen(true)}
        >
          Selecionar{" "}
          {type === "teacher"
            ? "Professor"
            : type === "studentASB"
            ? "Aluno ASB"
            : "Aluno CD"}
        </Button>
      </FormControl>
    </>
  );
}
