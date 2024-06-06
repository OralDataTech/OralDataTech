import { Avatar, Badge, Box, Button, Divider, styled } from "@mui/material";
import style from "./Profile.module.css";
import useAuth from "../../global/hooks/useAuth";
import { Link } from "react-router-dom";
import useIcons from "../../global/hooks/useIcons";
import CustomSwitchActiveSystem from "../../global/components/custom-switch/CustomSwitchActiveSystem";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface ButtonProfileProps {
  name: string;
  action?: () => void;
  icon: React.ReactNode;
  to: string;
}

function ButtonProfile({ action, icon, name, to }: ButtonProfileProps) {
  return (
    <Button
      onClick={action}
      startIcon={icon}
      color="error"
      className={style["profile-button"]}
    >
      <Link to={to}>{name}</Link>
    </Button>
  );
}

export default function Profile() {
  const { user, logout, isAdmin, isTeacher } = useAuth();
  const {
    verifyPhotoPath,
    LogoutIcon,
    PasswordIcon,
    BadgeRoundedIcon,
    BookIcon,
    GroupsIcon,
    AirlineSeatIndividualSuiteRoundedIcon,
  } = useIcons();

  return (
    <Box
      className="container"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"1rem"}
      height={"100vh"}
    >
      <Box component={"section"} className={style["avatar-section"]}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{
              width: "150px",
              height: "150px",
            }}
            alt={user.name}
            src={verifyPhotoPath(user)}
          />
        </StyledBadge>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Button variant="text" startIcon={<LogoutIcon />}>
          <Link onClick={logout} to="/login">
            Sair
          </Link>
        </Button>
      </Box>
      <Divider />
      {isAdmin() && <CustomSwitchActiveSystem />}
      <Box component={"section"} className={style["profile-section"]}>
        <ButtonProfile
          name="Meu Perfil"
          to={`${user.id}`}
          icon={<BadgeRoundedIcon fontSize="large" />}
        />
        <ButtonProfile
          name="Alterar Senha"
          to="/mudar-senha"
          icon={<PasswordIcon fontSize="large" />}
        />
        <ButtonProfile
          name="Gerenciar pacientes"
          to="/pacientes"
          icon={<AirlineSeatIndividualSuiteRoundedIcon fontSize="large" />}
        />
        {isAdmin() && (
          <ButtonProfile
            name="Gerenciar Pessoas"
            to="/usuarios"
            icon={<GroupsIcon fontSize="large" />}
          />
        )}
        {isTeacher() && (
          <ButtonProfile
            name="Gerenciar Disciplinas"
            to="/disciplinas"
            icon={<BookIcon fontSize="large" />}
          />
        )}
      </Box>
    </Box>
  );
}
