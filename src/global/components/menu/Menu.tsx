import { Box, Button } from "@mui/material";
import style from "./Menu.module.css";
import useIcons from "../../hooks/useIcons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  to: string;
}

function MenuItem({ icon, text, to }: MenuItemProps) {
  return (
    <Button className={style["menu-item"]} color="error">
      <NavLink to={to} className={style["menu-item-link"]}>
        {icon}
        {text}
      </NavLink>
    </Button>
  );
}

export default function Menu() {
  const { FolderOpenRoundedIcon, HomeRoundedIcon, PersonRoundedIcon } =
    useIcons();
  return (
    <Box component={"nav"} className={style["nav-container"]}>
      <MenuItem
        icon={
          <HomeRoundedIcon
            className={style["menu-item-icon"]}
            fontSize="large"
          />
        }
        text={"Início"}
        to={"/"}
      />
      <MenuItem
        icon={
          <FolderOpenRoundedIcon
            className={style["menu-item-icon"]}
            fontSize="large"
          />
        }
        text={"Prontuarios"}
        to={"/prontuarios"}
      />
      <MenuItem
        icon={
          <PersonRoundedIcon
            className={style["menu-item-icon"]}
            fontSize="large"
          />
        }
        text={"Perfil"}
        to={"/perfil"}
      />
    </Box>
  );
}
