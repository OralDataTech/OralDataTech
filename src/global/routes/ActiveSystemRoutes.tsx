import { Outlet, useLocation } from "react-router-dom";
import useSystemCfg from "../hooks/useSystemCfg";
import useAuth from "../hooks/useAuth";
import InactiveSystem from "../../pages/InactiveSystem/InactiveSystem";
import { useEffect, useState } from "react";

export default function ActiveSystemRoutes() {
  const { verifySystemActive } = useSystemCfg();
  const { isAdmin } = useAuth();
  const [active, setActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleRotaChange = async () => {
      setActive(await verifySystemActive());
    };

    handleRotaChange();
  }, [location]);

  return active || isAdmin() ? <Outlet /> : <InactiveSystem />;
}
