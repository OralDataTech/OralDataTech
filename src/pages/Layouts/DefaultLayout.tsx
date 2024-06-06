import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Menu from "../../global/components/menu/Menu";

export default function DefaultLayout() {
  return (
    <Box
      className="container"
      component={"main"}
      justifyContent={"center"}
      paddingBottom={"90px"}
    >
      <Outlet />
      <Menu />
    </Box>
  );
}
