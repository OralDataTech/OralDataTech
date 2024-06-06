import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import useIcons from "../../hooks/useIcons";
import useHistory from "../../hooks/useHistory";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Notifications.module.css";
import useAuth from "../../hooks/useAuth";

export default function Notifications() {
  const { NotificationsIcon, BedtimeIcon } = useIcons();
  const { getAllNotCheck } = useHistory();
  const [total, setTotal] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAdmin, isTeacher } = useAuth();

  useEffect(() => {
    async function fetch() {
      const response = await getAllNotCheck(1, 10);
      setTotal(response.total_results);
    }
    fetch();
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={style["menu-notifications"]}>
      <IconButton onClick={open ? handleClose : handleClick}>
        <Badge badgeContent={isTeacher() ? total : 0} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        className={style["menu"]}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(total! > 0 && isAdmin()) || isTeacher() ? (
          <MenuItem key={`Histórico`} className={style["menu-item"]}>
            <Link to={"/historico"}>
              <Box className={style["count"]}>{total}</Box>
              <small>Novas atualizações em prontuários</small>
            </Link>
          </MenuItem>
        ) : (
          <p>
            <BedtimeIcon />
            Não há nada novo
          </p>
        )}
      </Menu>
    </Box>
  );
}
