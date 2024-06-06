import { Box } from "@mui/material";
import style from "./CardProperty.module.css";

interface CardPropertyProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function CardProperty({ icon, title, value }: CardPropertyProps) {
  return (
    <Box className={style["card-property"]}>
      <Box className={style["card-property-icon"]}>{icon}</Box>
      <Box className={style["card-property-info"]}>
        <p>{title}</p>
        <span>{value}</span>
      </Box>
    </Box>
  );
}
