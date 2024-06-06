import { Alert, AlertColor, Box, Divider, Typography } from "@mui/material";
import { History } from "../../types/MedicalRecord";
import useIcons from "../../hooks/useIcons";
import { Fragment, ReactNode } from "react";
import style from "./HistoryCard.module.css";
import { LoadingButton } from "@mui/lab";
import useHistory from "../../hooks/useHistory";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface HistoryCardProps {
  history: History;
  dispachTrigger?: () => void;
  variant?: "outlined" | "standard" | "filled";
  limitData?: boolean;
  showSeeDetails?: boolean;
}

export default function HistoryCard({
  history,
  dispachTrigger,
  variant,
  limitData = true,
  showSeeDetails = true,
}: HistoryCardProps) {
  const {
    DriveFileRenameOutlineRoundedIcon,
    DeleteForeverRoundedIcon,
    AddCircleRoundedIcon,
    CheckCircleRoundedIcon,
    HistoryToggleOffRoundedIcon,
  } = useIcons();

  const navigate = useNavigate();

  const { toSign, loading } = useHistory();
  const { isTeacher } = useAuth();

  const verifyMethodStyles = (): AlertColor => {
    return history.action === "Adição"
      ? "success"
      : history.action === "Modificação"
      ? "warning"
      : "error";
  };

  const verifyMethodIcon = (): ReactNode => {
    return history.action === "Adição" ? (
      <AddCircleRoundedIcon color="success" />
    ) : history.action === "Modificação" ? (
      <DriveFileRenameOutlineRoundedIcon color="warning" />
    ) : (
      <DeleteForeverRoundedIcon color="error" />
    );
  };

  function formatarNome(nome: string) {
    const partesDoNome = nome.split("_");
    const partesFormatadas = partesDoNome.map(
      (parte) => parte.charAt(0).toUpperCase() + parte.slice(1)
    );
    const nomeFormatado = partesFormatadas.join(" ");

    return nomeFormatado;
  }

  interface JsonObject {
    [key: string]: string | number | boolean | null | JsonObject | JsonObject[];
  }

  function jsonToString(
    json: string | number | boolean | null | JsonObject | JsonObject[]
  ): string {
    if (json === null) {
      return "";
    }

    if (
      typeof json === "string" ||
      typeof json === "number" ||
      typeof json === "boolean"
    ) {
      return String(json);
    }

    if (json instanceof Array) {
      let result = "";
      for (let i = 0; i < json.length; i++) {
        result += `
        ${jsonToString(json[i])}
        `;
      }

      return result;
    }

    let result = "";
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        result += `
        ${formatarNome(key)}: 
        ${jsonToString(json[key])}
        `;
      }
    }

    return result;
  }

  return (
    <Alert
      color={verifyMethodStyles()}
      icon={<></>}
      variant={variant || "outlined"}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
    >
      <Box className={style["title"]}>
        {verifyMethodIcon()}
        <strong>{history.action}</strong> - {history.entity.toUpperCase()}
      </Box>
      <Divider />
      <Box className={style["attributes"]}>
        {limitData &&
          history.columns.map((column, key) => (
            <Fragment key={key}>
              {key < 4 && column && (
                <Box>
                  <strong>{column.name && formatarNome(column.name)}</strong>
                  {" : "}
                  <small>
                    {Array.isArray(column.value) ? (
                      column.value.map((item) => jsonToString(item))
                    ) : typeof column.value === "object" ? (
                      <>{jsonToString(column.value)}</>
                    ) : column.name === "image" ||
                      column.name === "url_image" ? (
                      <a
                        href={column.value}
                        target="_blank"
                        className={`${style["image-link"]}`}
                      >
                        <img
                          src={column.value}
                          alt="Imagem"
                          className={`${style["image"]}`}
                        />
                        <Typography
                          variant="caption"
                          className={style["image-link-text"]}
                        >
                          Clique na imagem acima para ampliar
                        </Typography>
                      </a>
                    ) : (
                      <>{column.value}</>
                    )}
                  </small>
                </Box>
              )}
            </Fragment>
          ))}

        {!limitData &&
          history.columns.map(
            (column) =>
              column && (
                <Box key={column.name}>
                  <strong>{formatarNome(column?.name)}</strong>
                  {" : "}
                  <small>
                    {Array.isArray(column.value) ? (
                      column.value.map((item) => jsonToString(item))
                    ) : typeof column.value === "object" ? (
                      <>{jsonToString(column.value)}</>
                    ) : column.name === "image" ||
                      column.name === "url_image" ? (
                      <a href={column.value} target="_blank">
                        <img
                          src={column.value}
                          alt="Imagem"
                          className={`${style["image"]}`}
                        />
                      </a>
                    ) : (
                      <>{column.value}</>
                    )}
                  </small>
                </Box>
              )
          )}

        {history.columns.length > 4 && showSeeDetails && (
          <>
            <small className={style["more-results"]}>
              E mais {history.columns.length - 4}{" "}
              {history.columns.length - 4 === 1 ? "Informação" : "Informações"}
            </small>
          </>
        )}
        <Box className={style["btn-group-card-history"]}>
          <LoadingButton
            color={verifyMethodStyles()}
            startIcon={
              history.signature || isTeacher() ? (
                <CheckCircleRoundedIcon />
              ) : (
                <HistoryToggleOffRoundedIcon />
              )
            }
            loading={loading}
            onClick={async () => {
              await toSign(history.id);
              dispachTrigger && dispachTrigger();
            }}
            variant={showSeeDetails ? "text" : "outlined"}
            disabled={!!history.signature || !isTeacher()}
          >
            {history.signature
              ? "Assinado"
              : isTeacher()
              ? "Assinar"
              : "Aguardando assinatura"}
          </LoadingButton>
          {showSeeDetails && isTeacher() && (
            <LoadingButton
              loading={loading}
              color={verifyMethodStyles()}
              variant="outlined"
              disabled={!isTeacher()}
              onClick={() => {
                navigate(`/historico/${history.id}`);
              }}
            >
              Ver detalhes
            </LoadingButton>
          )}
        </Box>
      </Box>
    </Alert>
  );
}
