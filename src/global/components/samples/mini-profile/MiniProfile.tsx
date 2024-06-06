import { Avatar, Badge, Box, Skeleton, styled } from "@mui/material";
import style from "./MiniProfile.module.css";
import useAuth from "../../../hooks/useAuth";
import useIcons from "../../../hooks/useIcons";
import useLoading from "../../../hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function MiniProfile() {
  const { logout, user } = useAuth();
  const { verifyPhotoPath } = useIcons();
  const { loading } = useLoading();

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

  return (
    <Box component={"section"} className={style["mini-profile"]}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        className={style["avatar"]}
      >
        {!loading ? (
          <Avatar
            alt="Avatar do usuário"
            className={style["avatar"]}
            src={verifyPhotoPath(user)}
          />
        ) : (
          <Skeleton width={70} height={70} variant="circular" />
        )}
      </StyledBadge>
      <Box component={"div"} className={style["mini-profile-info"]}>
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <p className={style["avatar-name"]}>{user.name}</p>
        )}
        <LoadingButton onClick={logout} loading={loading}>
          Sair
        </LoadingButton>
      </Box>
    </Box>
  );
}
