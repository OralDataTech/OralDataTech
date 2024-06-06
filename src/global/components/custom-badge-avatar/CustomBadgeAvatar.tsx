import useIcons from "../../hooks/useIcons";
import { Avatar, Badge, styled } from "@mui/material";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";
import useWebSocketOnlineUsers from "../../hooks/useWebSocketOnlineUsers";

interface CustomBadgeAvatarProps {
  user: User;
}

export default function CustomBadgeAvatar({ user }: CustomBadgeAvatarProps) {
  const { VerifiedRoundedIcon, verifyPhotoPath } = useIcons();
  const navigate = useNavigate();
  const { verifyOnlineUser } = useWebSocketOnlineUsers();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      width: "15px",
      height: "15px",
      borderRadius: "50%",
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
        transform: "scale(2.5)",
        opacity: 0,
      },
    },
  }));

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      badgeContent={
        user.role === "admin" && (
          <VerifiedRoundedIcon
            color="error"
            sx={{
              backgroundColor: "var(--background-glass)",
              borderRadius: "50%",
              padding: "2px",
              width: "30px",
              height: "30px",
            }}
          />
        )
      }
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant={verifyOnlineUser(user.id) ? "dot" : "standard"}
      >
        <Avatar
          onClick={() => navigate(`/perfil/${user.id}`)}
          alt={user.name}
          src={verifyPhotoPath(user)}
          sx={{ width: "75px", height: "75px", cursor: "pointer" }}
        />
      </StyledBadge>
    </Badge>
  );
}
