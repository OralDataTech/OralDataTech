import { Alert, Box, Divider } from "@mui/material";
import style from "./History.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHistory from "../../global/hooks/useHistory";
import { History as HistoryType } from "../../global/types/MedicalRecord";
import CardUser from "../../global/components/card-user/CardUser";
import MedicalRecordCard from "../../global/components/medical-record-card/MedicalRecordCard";
import HistoryCard from "../../global/components/history-card/HistoryCard";

export default function History() {
  const { id } = useParams();
  const [history, setHistory] = useState<HistoryType>();
  const { getOneById } = useHistory();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    async function fetch() {
      const response = await getOneById(id || "");
      setHistory(response);
    }

    fetch();
  }, [id, trigger]);

  return (
    <Box component={"main"} className={style["containerHistory"]}>
      <HeadTitleSection backTo="/" title="Histórico" backToAuto={-1} />
      <Box className={`${style["historic"]} container`}>
        {history?.signature ? (
          <>
            <h2>Assinado por</h2>
            <Divider />
            <Box>
              <small>Assinatura realizada em</small>
              <p>
                {new Date(
                  history.signatureDate || Date.now()
                ).toLocaleDateString()}
              </p>
            </Box>
            <CardUser user={history.signature} />
          </>
        ) : (
          <Alert color="error" variant="filled">
            Assinatura não realizada
          </Alert>
        )}
        <h2>Campos {history?.action === "Criação" ? "criados" : "editados"}</h2>
        <Divider />
        {history && (
          <HistoryCard
            history={history}
            dispachTrigger={() => setTrigger(!trigger)}
            limitData={false}
            showSeeDetails={false}
            variant="standard"
          />
        )}

        {history?.medicalRecord ? (
          <>
            <h2>Prontuário</h2>
            <Divider />

            <MedicalRecordCard
              showOptions={false}
              medicalRecord={history?.medicalRecord}
            />
          </>
        ) : (
          <Alert color="error">Nenhum prontuário encontrado</Alert>
        )}
      </Box>
    </Box>
  );
}
