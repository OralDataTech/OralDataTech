import { Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

interface GaugeProps {
  value: number;
  legend: string;
}

export default function CustomGauge({ value, legend }: GaugeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Gauge
        value={value}
        startAngle={0}
        endAngle={360}
        innerRadius="90%"
        outerRadius="100%"
        valueMax={100}
        height={100}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "var(--primary)",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <Typography variant="caption" align="center">
        {legend}
      </Typography>
    </Box>
  );
}
