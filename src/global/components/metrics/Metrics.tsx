import { Box, Skeleton } from "@mui/material";
import style from "./Metrics.module.css";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import CardMetric from "../card-metric/CardMetric";
import useMetrics from "../../hooks/useMetrics";

export default function Metrics() {
  const { loading } = useLoading();
  const { getStatistics } = useMetrics();

  const [metrics, setMetrics] = useState<{
    medicalRecords: string;
    users: string;
    activities: string;
  }>();

  useEffect(() => {
    async function getMetrics() {
      const response = await getStatistics();
      setMetrics(response);
    }
    getMetrics();
  }, []);

  return (
    <Box component={"section"} className={`${style["cards"]}`}>
      {loading && (
        <>
          <Skeleton variant="rectangular" width={"33%"} height={200} />
          <Skeleton variant="rectangular" width={"33%"} height={200} />
          <Skeleton variant="rectangular" width={"33%"} height={200} />
        </>
      )}
      {!loading && (
        <>
          <CardMetric
            icon="/doc.png"
            bg="var(--secondary)"
            title="Prontuários criados esse mês"
            value={metrics?.medicalRecords || "0"}
          />
          <CardMetric
            icon="/users.png"
            bg="var(--primary)"
            title="Usuários cadastrados esse mês"
            value={metrics?.users || "0"}
          />
          <CardMetric
            icon="/metrics.png"
            bg="var(--tertiary)"
            title="Movimentações esse mês"
            value={metrics?.activities || "0"}
          />
        </>
      )}
    </Box>
  );
}
