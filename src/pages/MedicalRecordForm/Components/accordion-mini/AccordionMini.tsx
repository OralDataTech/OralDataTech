import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Box,
} from "@mui/material";
import useIcons from "../../../../global/hooks/useIcons";
import { ReactNode } from "react";
import style from "./AccordionMini.module.css";
import { Link } from "react-router-dom";
import useLoading from "../../../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

interface AccordionMiniProps {
  title: string;
  qtd: number;
  content: ReactNode;
  to?: string;
  btnName: string;
  action?: () => void;
}

interface MiniHeaderProps {
  title: string;
  icon: ReactNode;
}

function MiniHeader({ icon, title }: MiniHeaderProps) {
  return (
    <p
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      {title}
      {icon}
    </p>
  );
}

export default function AccordionMini({
  content,
  qtd,
  title,
  to,
  btnName,
  action,
}: AccordionMiniProps) {
  const {
    CheckCircleRoundedIcon,
    CancelRoundedIcon,
    ExpandMoreIcon,
    AddCircleRoundedIcon,
  } = useIcons();

  const { loading } = useLoading();

  return (
    <Box>
      <Accordion
        disabled={loading}
        className={style["accordion-container"]}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            padding: "0",
          }}
        >
          <MiniHeader
            title={`${title} (${qtd})`}
            icon={
              qtd > 0 ? (
                <CheckCircleRoundedIcon color="success" />
              ) : (
                <CancelRoundedIcon color="error" />
              )
            }
          />
        </AccordionSummary>
        <AccordionDetails className={style["accordion-body"]}>
          {qtd === 0 && (
            <small>
              <strong>Este item não foi preenchido</strong>
            </small>
          )}
          {content}
        </AccordionDetails>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem 0",
          }}
        >
          {!loading && (
            <Link to={to || ""}>
              <LoadingButton
                variant="contained"
                color="error"
                onClick={action}
                loading={loading}
                disabled={loading}
                className={style["btn-add"]}
                startIcon={<AddCircleRoundedIcon />}
                sx={{
                  width: "15rem",
                  heigth: "fit-content",
                }}
              >
                {btnName}
              </LoadingButton>
            </Link>
          )}
        </Box>
      </Accordion>
      <Divider
        sx={{
          marginTop: "1rem",
        }}
      />
    </Box>
  );
}
