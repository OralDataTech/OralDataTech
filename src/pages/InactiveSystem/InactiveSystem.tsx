import { Box, CircularProgress, Typography } from "@mui/material";
import style from "./InactiveSystem.module.css";
import useLoading from "../../global/hooks/useLoading";

export default function InactiveSystem() {
  const {loading} = useLoading();

  return (
    <Box component={"main"} className={`container ${style["inactive-system"]}`}>
      {
        loading ? <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={200} color="error" />
        </Box> : <Box className={`${style["container-inactive"]}`}>
        <Box className="image-container">
          <img src="system-security.png" alt="Servidor fora do ar" />
        </Box>
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Ops! O sistema está temporariamente desabilitado.
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          O administrador desativou o sistema momentaneamente. Por favor,
          aguarde a reativação.
        </Typography>
      </Box>
      }
      
    </Box>
  );
}
