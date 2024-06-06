import { ReactNode } from "react";
import { Box } from "@mui/material";
import style from "./StepCard.module.css";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}
export default function StepCard({
  icon,
  subtitle,
  title,
  children,
}: StepCardProps) {
  return (
    <Box className={style["step-card"]}>
      <Box className={style["content-children"]}>{children}</Box>
      <Box className={style["icon-step"]}>{icon}</Box>
      <Box className={style["content-step"]}>
        <h3>{title}</h3>
        <small>{subtitle}</small>
      </Box>
    </Box>
  );
}
