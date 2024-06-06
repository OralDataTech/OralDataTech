import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Fragment, useEffect, useState } from "react";
import { MedicalRecord } from "../../global/types/MedicalRecord";
import useMedicalRecord from "../../global/hooks/useMedicalRecord";
import style from "./MedicalRecord.module.css";
import SelectDiscipline from "../../global/components/select-discipline/SelectDiscipline";
import MiniCardDiscipline from "./Components/card-discipline-mini/MiniCardDiscipline";
import MiniCardAnamnesis from "./Components/card-anamnesis-mini/MiniCardAnamnesis";
import CardExamsMini from "./Components/card-exams.mini/CardExamsMini";
import MiniCardOdontrogram from "./Components/card-odontogram-mini/MiniCardOdontrogram";
import MiniTreatmentCard from "./Components/card-treatment-mini/MiniTreatmentCard";
import MiniPeriodonticCard from "./Components/card-periodontic-mini/MiniPeriodonticCard";
import MiniCardOleary from "./Components/card-oleary-mini/MiniCardOleary";
import AccordionMini from "./Components/accordion-mini/AccordionMini";
import MiniEdodonticCard from "./Components/card-edodontic-mini/MiniEdodonticCard";
import { TabContext, TabPanel } from "@mui/lab";
import HistoryCard from "../../global/components/history-card/HistoryCard";
import MiniPediatricDentistries from "./Components/card-pediatric-dentistries/MiniPediatricDentistries";
import MiniCardDailyPlan from "./Components/card-daily-plan/MiniCardDailyPlan";
import MiniCardAssessment from "./Components/card-assessment-mini/MiniCardAssessment";
import MiniPeriogramCard from "./Components/periogram-mini/MiniPeriogramCard";

export default function MedicalRecordForm() {
  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>();
  const { getOneById, addDicipline } = useMedicalRecord();
  const [openModalAddDiscipline, setOpenModalAddDiscipline] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const verifyIsRiskInOleary = () => {
    return (
      medicalRecord &&
      medicalRecord?.oLearyIndexes.filter(
        (oleary) =>
          Number(oleary.index) >= 50 && oleary.avaliation === "intracampo"
      ).length > 0
    );
  };

  useEffect(() => {
    async function getMedicalRecord() {
      const data = await getOneById(id || "");
      setMedicalRecord(data);
    }
    if (id) {
      getMedicalRecord();
    }
  }, [trigger]);

  const handleAddDiscipline = async (idDiscipline: string) => {
    await addDicipline(idDiscipline, id || "");
    setTrigger(!trigger);
    setOpenModalAddDiscipline(false);
  };

  function FichasComponent() {
    return (
      <>
        <AccordionMini
          action={() => setOpenModalAddDiscipline(true)}
          btnName="Adicionar Disciplina"
          content={
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {medicalRecord?.disciplines.map((discipline) => (
                  <MiniCardDiscipline
                    key={discipline.id}
                    discipline={discipline}
                    idMedicalRecord={id || ""}
                    trigger={trigger}
                    triggerDispach={setTrigger}
                  />
                ))}
              </Box>
            </>
          }
          qtd={medicalRecord?.disciplines.length || 0}
          title={`Disciplinas`}
        />

        <AccordionMini
          to="anamnese/create"
          btnName="Adicionar Anamnese"
          qtd={medicalRecord?.anamnesis.length || 0}
          title={`Anamneses`}
          content={
            <>
              {medicalRecord?.anamnesis.map((anamnesis) => (
                <MiniCardAnamnesis
                  anamnesis={anamnesis}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={anamnesis.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          to="exames/create"
          btnName="Adicionar Exames Complementares"
          qtd={medicalRecord?.exams.length || 0}
          title={`Exames Adicionais`}
          content={
            <>
              {medicalRecord?.exams.map((exam) => (
                <CardExamsMini
                  exam={exam}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={exam.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Odontograma"
          qtd={medicalRecord?.odontograms.length || 0}
          title={`Odontogramas`}
          to="odontograma/create"
          content={
            <>
              {medicalRecord?.odontograms.map((odontogram) => (
                <MiniCardOdontrogram
                  odontogram={odontogram}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={odontogram.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Plano de tratamento"
          qtd={medicalRecord?.treatmentPlans.length || 0}
          title={`Planos de tratamento`}
          to="plano-tratamento/create"
          content={
            <>
              {medicalRecord?.treatmentPlans.map((treatment) => (
                <MiniTreatmentCard
                  treatment={treatment}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={treatment.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Periodontia"
          qtd={medicalRecord?.periodontics.length || 0}
          title={`Periodontias`}
          to="periodontia/create"
          content={
            <>
              {medicalRecord?.periodontics.map((periodontic) => (
                <MiniPeriodonticCard
                  periodontic={periodontic}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={periodontic.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Índice de placa O'Leary"
          qtd={medicalRecord?.oLearyIndexes.length || 0}
          title={`Índice de placa O'Leary`}
          to="oleary/create"
          content={
            <>
              {medicalRecord?.oLearyIndexes.map((oleary) => (
                <MiniCardOleary
                  olearyIndex={oleary}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={oleary.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          qtd={medicalRecord?.endodontics.length || 0}
          title={`Endodontias`}
          to="edodontia/create"
          btnName="Adicionar Endodontia"
          content={
            <>
              {medicalRecord?.endodontics.map((endodontic) => (
                <MiniEdodonticCard
                  edodontic={endodontic}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={endodontic.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Odontropediatria"
          qtd={medicalRecord?.pediatricDentistries?.length || 0}
          title={`Odontropediatrias`}
          to="odontopediatria/create"
          content={
            <>
              {medicalRecord?.pediatricDentistries?.map((pediatric) => (
                <MiniPediatricDentistries
                  pediatric={pediatric}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={pediatric.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Planejamento de procedimento clínico diário"
          qtd={medicalRecord?.dailyClinicalProcedurePlannings?.length || 0}
          title={`Planejamento de Proc. clínico diário`}
          to="planejamento-diario/create"
          content={
            <>
              {medicalRecord?.dailyClinicalProcedurePlannings?.map((daily) => (
                <MiniCardDailyPlan
                  dailyPlan={daily}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={daily.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Nova avaliação de risco"
          qtd={medicalRecord?.riskAssessments?.length || 0}
          title={`Avaliação de risco`}
          to="avaliacao-risco/create"
          content={
            <>
              {medicalRecord?.riskAssessments?.map((risk) => (
                <MiniCardAssessment
                  assessment={risk}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={risk.id}
                />
              ))}
            </>
          }
        />

        <AccordionMini
          btnName="Adicionar Periograna"
          qtd={medicalRecord?.periograms.length || 0}
          title={`Periograma`}
          to="periograma/create"
          content={
            <>
              {medicalRecord?.periograms.map((periogram) => (
                <MiniPeriogramCard
                  periogram={periogram}
                  trigger={trigger}
                  triggerDispach={setTrigger}
                  key={periogram.id}
                />
              ))}
            </>
          }
        />
      </>
    );
  }

  return (
    <Box>
      <HeadTitleSection
        title={`Prontuário de ${medicalRecord?.patient.name}`}
        backTo="/prontuarios"
      />
      <>
        <SelectDiscipline
          dispach={handleAddDiscipline}
          open={openModalAddDiscipline}
          onClose={() => setOpenModalAddDiscipline(false)}
        />
        <Box className={`${style["container-medical-record"]} container`}>
          {verifyIsRiskInOleary() && (
            <Alert
              severity="error"
              variant="standard"
              sx={{
                margin: "0.5rem 0.5rem 0 0.5rem",
              }}
            >
              <strong>Atenção:</strong> O paciente{" "}
              <strong>{medicalRecord?.patient.name}</strong> possuí um ou mais
              índices de placa O'leary com alto risco biológico, por favor,
              verifique a situação.
            </Alert>
          )}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "var(--primary)",
                  },
                }}
                aria-label="selecionar historico ou fichas"
                className={style["tabs"]}
              >
                <Tab value="1" label="Fichas" />
                <Tab
                  value="2"
                  label={`Histórico (${medicalRecord?.history.length || 0})`}
                />
              </Tabs>
            </Box>
            <TabPanel value="1" className={style["tab-pannel"]}>
              {<FichasComponent />}
            </TabPanel>
            <TabPanel value="2" className={style["tab-pannel"]}>
              {medicalRecord?.history.length === 0 && (
                <Alert>
                  Não há nenhuma nova alteração realizada nesse prontuário
                </Alert>
              )}
              <Box className={style["history-container"]}>
                {medicalRecord?.history.map((history) => (
                  <Fragment key={history.id}>
                    <HistoryCard
                      dispachTrigger={() => setTrigger(!trigger)}
                      history={history}
                      showSeeDetails={true}
                    />
                  </Fragment>
                ))}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </>
    </Box>
  );
}
