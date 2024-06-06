import { Box } from "@mui/material";
import style from "./CardMetric.module.css";

interface CardMetricProps {
  title: string;
  value: string;
  icon: string;
  bg?: string;
}

export default function CardMetric({
  icon,
  title,
  value,
  bg,
}: CardMetricProps) {
  return (
    <Box
      className={`${style["card"]} custom-section`}
      sx={bg ? { backgroundColor: bg } : {}}
    >
      <img src={icon} alt="prontuários" />
      <Box className={`${style["card-body"]}`}>
        <p>{title}</p>
        <h2>{value}</h2>
      </Box>
    </Box>
  );
}
