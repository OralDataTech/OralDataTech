import { Alert, Box, Button, IconButton, Modal } from "@mui/material";
import style from "./ConfirmAction.module.css";
import useIcons from "../../hooks/useIcons";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  dispach: () => void;
  severity?: "error" | "warning" | "info" | "success";
}

export default function ConfirmModal({
  dispach,
  onClose,
  open,
  severity,
}: DeleteModalProps) {
  const { CloseRoundedIcon } = useIcons();
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
      open={open}
      onClose={onClose}
    >
      <Box component={"form"} className={style["confirm-modal-form"]}>
        <Box className={style["title-group"]}>
          <h3>Confirmar Ação</h3>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <hr />
        <Box className={style["description"]}>
          <Alert
            sx={{
              padding: "1rem",
              width: "80%",
            }}
            severity={severity ? severity : "warning"}
          >
            Atenção, essa ação é irreversível, deseja realmente continuar?
          </Alert>
        </Box>
        <hr />

        <Box className={style["button-group"]}>
          <Button onClick={onClose} color="warning" variant="text">
            Voltar
          </Button>
          <Button onClick={dispach} color="error" variant="contained">
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
