import MiniProfile from "../../global/components/samples/mini-profile/MiniProfile";
import LastProntuaries from "../../global/components/samples/last-prontuaries/LastProntuaries";
import Users from "../../global/components/samples/users/Users";
import Disciplines from "../../global/components/samples/disciplines/Disciplines";
import { Box } from "@mui/material";
import Notifications from "../../global/components/notifications/Notifications";
import Metrics from "../../global/components/metrics/Metrics";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 !important",
        paddingBottom: "7rem",
        width: "100%",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MiniProfile />
        <Notifications />
      </Box>
      <Metrics />
      <Users />
      <LastProntuaries />
      <Disciplines />
    </Box>
  );
}
