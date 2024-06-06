import { Button, LinearProgress, Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from "./HeadTitleSection.module.css";
import { Box } from "@mui/system";
import useIcons from "../../hooks/useIcons";
import useLoading from "../../hooks/useLoading";

interface HeadSectionProps {
  title: string;
  backTo?: string;
  backToAuto?: number;
}

export default function HeadTitleSection({
  backTo,
  title,
  backToAuto,
}: HeadSectionProps) {
  const { ArrowBackIosIcon } = useIcons();
  const { loading } = useLoading();
  const navigate = useNavigate();

  return (
    <Box className={`${style["head-title-section-box"]}`}>
      <Box
        className="container"
        sx={{
          padding: "1rem 0",
        }}
      >
        {backToAuto && (
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIosIcon />}
            sx={{
              color: "var(--text-white)",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
        )}
        {!backToAuto && (
          <Link to={backTo || "/"}>
            <Button
              variant="text"
              color="inherit"
              startIcon={<ArrowBackIosIcon />}
            >
              Voltar
            </Button>
          </Link>
        )}

        <h1>
          {!loading ? (
            title
          ) : (
            <Skeleton variant="text" width={300} height={70} />
          )}
        </h1>

        {loading && (
          <LinearProgress
            color="error"
            sx={{
              width: "100%",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
