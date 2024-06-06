import { Box } from "@mui/material";
import style from "./CheckStep.module.css";
import useIcons from "../../hooks/useIcons";

interface CheckStepProps {
  title: string;
  check: boolean;
}

export default function CheckStep({ title, check }: CheckStepProps) {
  const { CheckCircleRoundedIcon, CancelRoundedIcon } = useIcons();
  return (
    <Box className={style["check-step"]}>
      {check ? (
        <CheckCircleRoundedIcon color="success" />
      ) : (
        <CancelRoundedIcon color="error" />
      )}
      <small className={style["check-step-title"]}>{title}</small>
    </Box>
  );
}
