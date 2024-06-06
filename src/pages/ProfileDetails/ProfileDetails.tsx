import { Avatar, Box, Chip, LinearProgress, Skeleton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../../global/hooks/useLoading";
import { useEffect, useState } from "react";
import { User } from "../../global/types/User";
import useUsers from "../../global/hooks/useUsers";
import style from "./ProfileDetails.module.css";
import useIcons from "../../global/hooks/useIcons";
import useAuth from "../../global/hooks/useAuth";
import CustomGauge from "../../global/components/gauge/CustomGauge";

export default function ProfileDetails() {
  const { id } = useParams();
  const { loading } = useLoading();
  const [user, setUser] = useState<User>({} as User);
  const { getOnById } = useUsers();
  const navigate = useNavigate();
  const { user: userLogged } = useAuth();

  const {
    verifyPhotoPath,
    AdminPanelSettingsIcon,
    PersonRoundedIcon,
    EmailRoundedIcon,
    MaleRoundedIcon,
    FemaleRoundedIcon,
    HelpIcon,
  } = useIcons();

  useEffect(() => {
    async function fetchUser() {
      const response = await getOnById(id || "");
      setUser(response);
    }

    fetchUser();
  }, []);

  return (
    <Box className={style["container-profile-details"]}>
      {loading && <LinearProgress color="error" />}
      <Box className={style["head-profile-details"]}>
        <img
          className={style["background-image"]}
          src="/bg-uespi.webp"
          alt="fundo da UESPI"
        />

        <Avatar className={style["avatar"]} src={verifyPhotoPath(user)} />
      </Box>
      <Box className={style["body-profile-details"]}>
        <Box className={style["role-container"]}>
          {loading && <Skeleton variant="rounded" width={80} height={30} />}
          {!loading &&
            (user.id === userLogged.id ? (
              <Chip
                color="error"
                variant="outlined"
                label={"Editar perfil"}
                onClick={() => navigate(`/informacoes-pessoais`)}
              />
            ) : (
              <Chip
                color="error"
                variant="filled"
                label={user?.role === "admin" ? "Administrador" : "Aluno"}
                icon={
                  user?.role === "admin" ? (
                    <AdminPanelSettingsIcon />
                  ) : (
                    <PersonRoundedIcon />
                  )
                }
              />
            ))}
        </Box>
        <Box className={style["personal-infos"]}>
          {loading ? (
            <Skeleton variant="text" width={200} height={30} />
          ) : (
            <h2>{user?.name}</h2>
          )}

          {loading ? (
            <Skeleton variant="text" width={100} height={20} />
          ) : (
            <small>
              Membro desde: {new Date(user?.created_at).toLocaleDateString()}
            </small>
          )}

          <Box display={"flex"} gap={1} flexWrap={"wrap"}>
            {loading ? (
              <>
                <Skeleton
                  component={"span"}
                  variant="text"
                  width={150}
                  height={30}
                />
                <Skeleton
                  component={"span"}
                  variant="text"
                  width={150}
                  height={30}
                />
              </>
            ) : (
              <>
                <Box className={style["label-group"]}>
                  <EmailRoundedIcon color="action" />
                  <p>{user?.email}</p>
                </Box>

                <Box className={style["label-group"]}>
                  {user.gender === "Masculino" ? (
                    <MaleRoundedIcon color="action" />
                  ) : user.gender === "Feminino" ? (
                    <FemaleRoundedIcon color="action" />
                  ) : (
                    <HelpIcon color="action" />
                  )}
                  <p>{user?.gender}</p>
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box padding={1} className={style["gauges"]}>
          {loading ? (
            <>
              <Skeleton variant="circular" width={100} height={100} />
            </>
          ) : (
            <>
              <CustomGauge
                value={user.medicalRecords?.length}
                legend="Prontuiários criados"
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
