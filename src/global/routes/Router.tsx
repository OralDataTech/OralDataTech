import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { Suspense } from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Home from "../../pages/Home/Home";
import DefaultLayout from "../../pages/Layouts/DefaultLayout";
import Profile from "../../pages/Profile/Profile";
import ChangePassword from "../../pages/ChangePassword/ChangePassword";
import PersonalInfo from "../../pages/PersonalInfo/PersonalInfo";
import Disciplines from "../../pages/Disciplines/Disciplines";
import FormDiscipline from "../../pages/FormDiscipline/FormDiscipline";
import Persons from "../../pages/Persons/Persons";
import FormUser from "../../pages/PersonalInfo/FormUser/FormUser";
import MedicalRecordPage from "../../pages/MedicalRecord/MedicalRecord";
import MedicalRecordForm from "../../pages/MedicalRecordForm/MedicalRecordForm";
import Patient from "../../pages/Patient/Patient";
import PatientForm from "../../pages/PatientForm/PatientForm";
import AnamnesisForm from "../../pages/AnamnesisForm/AnamnesisForm";
import ExamsForm from "../../pages/ExamsForm/ExamsForm";
import OdontogramForm from "../../pages/OdontogramForm/OdontogramForm";
import TreatmentForm from "../../pages/TreatmentForm/TreatmentForm";
import PeriodonticForm from "../../pages/PeriodonticForm/PeriodonticForm";
import OlearyForm from "../../pages/OlearyForm/OlearyForm";
import EdodonticForm from "../../pages/EdodonticForm/EdodonticForm";
import ProfileDetails from "../../pages/ProfileDetails/ProfileDetails";
import {
  ProtectedRoutesAdmin,
  ProtectedRoutesTeacher,
} from "./ProtectedRoutes";
import Histories from "../../pages/Histories/Histories";
import History from "../../pages/History/History";
import PediatricDentistryForm from "../../pages/PediatricDensitryForm/PediatricDentistryForm";
import ActiveSystemRoutes from "./ActiveSystemRoutes";
import DailyClinicalProcedurePlanningForm from "../../pages/DailyClinicalProcedurePlanningForm/DailyClinicalProcedurePlanningForm";
import RiskAssessmentForm from "../../pages/RiskAssessmentForm/RiskAssessment";
import PeriogramForm from "../../pages/PeriogramForm/PeriogramForm";
import ForgetPassForm from "../../pages/ForgetPass/Forget";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Routes>
          {/* Todas as rotas */}
          <Route element={<ActiveSystemRoutes />}>
            {/* Rotas privadas */}
            <Route element={<PrivateRoutes />}>
              <Route element={<ProtectedRoutesTeacher />} path="/historico">
                <Route index element={<Histories />} />
                <Route path=":id" element={<History />} />
              </Route>

              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/perfil">
                  <Route index element={<Profile />} />
                  <Route path=":id" element={<ProfileDetails />} />
                </Route>
              </Route>

              <Route path="disciplinas">
                <Route index element={<Disciplines />} />
                <Route path="create" element={<FormDiscipline />} />
                <Route path=":id" element={<FormDiscipline />} />
              </Route>

              <Route path="prontuarios">
                <Route index element={<MedicalRecordPage />} />
                <Route path=":id">
                  <Route index element={<MedicalRecordForm />} />

                  {/* Entidade dependentes de prontuario */}
                  <Route path="anamnese">
                    <Route path="create" element={<AnamnesisForm />} />
                    <Route path=":idAnamnesis" element={<AnamnesisForm />} />
                  </Route>

                  <Route path="exames">
                    <Route path="create" element={<ExamsForm />} />
                    <Route path=":idExams" element={<ExamsForm />} />
                  </Route>

                  <Route path="odontograma">
                    <Route path="create" element={<OdontogramForm />} />
                    <Route path=":idOdontogram" element={<OdontogramForm />} />
                  </Route>

                  <Route path="plano-tratamento">
                    <Route path="create" element={<TreatmentForm />} />
                    <Route path=":idTreatment" element={<TreatmentForm />} />
                  </Route>

                  <Route path="periodontia">
                    <Route path="create" element={<PeriodonticForm />} />
                    <Route
                      path=":idPeriodontic"
                      element={<PeriodonticForm />}
                    />
                  </Route>

                  <Route path="oleary">
                    <Route path="create" element={<OlearyForm />} />
                    <Route path=":idOleary" element={<OlearyForm />} />
                  </Route>

                  <Route path="edodontia">
                    <Route path="create" element={<EdodonticForm />} />
                    <Route path=":idEdodontic" element={<EdodonticForm />} />
                  </Route>

                  <Route path="odontopediatria">
                    <Route path="create" element={<PediatricDentistryForm />} />
                    <Route
                      path=":idPediatricDentistry"
                      element={<PediatricDentistryForm />}
                    />
                  </Route>

                  <Route path="planejamento-diario">
                    <Route
                      path="create"
                      element={<DailyClinicalProcedurePlanningForm />}
                    />
                    <Route
                      path=":idDaily"
                      element={<DailyClinicalProcedurePlanningForm />}
                    />
                  </Route>

                  <Route path="avaliacao-risco">
                    <Route path="create" element={<RiskAssessmentForm />} />
                    <Route
                      path=":idAssessment"
                      element={<RiskAssessmentForm />}
                    />
                  </Route>

                  <Route path="periograma">
                    <Route path="create" element={<PeriogramForm />} />
                    <Route path=":idPeriogram" element={<PeriogramForm />} />
                  </Route>
                </Route>
              </Route>

              <Route path="usuarios">
                <Route index element={<Persons />} />
                <Route element={<ProtectedRoutesAdmin />}>
                  <Route path="create" element={<FormUser />} />
                  <Route path=":id" element={<FormUser />} />
                </Route>
              </Route>

              <Route path="pacientes">
                <Route index element={<Patient />} />
                <Route path="create" element={<PatientForm />} />
                <Route path=":id" element={<PatientForm />} />
              </Route>

              <Route path="/mudar-senha" element={<ChangePassword />} />
              <Route path="/informacoes-pessoais" element={<PersonalInfo />} />
            </Route>

            {/* Rotas públicas */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/redefinir-senha" element={<ForgetPassForm />} />
            </Route>

            {/* Rotas de caminho errado */}
            <Route path="*" element={<>página não encontrada</>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
