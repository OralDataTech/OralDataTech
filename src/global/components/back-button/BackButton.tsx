import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import useIcons from "../../hooks/useIcons";

interface BackButtonProps {
  to: string;
}

export default function BackButton({ to }: BackButtonProps) {
  const { ArrowBackIosIcon } = useIcons();
  return (
    <Button startIcon={<ArrowBackIosIcon />} className={"back-button"}>
      <Link to={to}>Voltar</Link>
    </Button>
  );
}
