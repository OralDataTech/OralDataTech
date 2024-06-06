import { Box } from "@mui/material";
import React from "react";

interface HeaderResultsProps {
  children: React.ReactNode;
}

export default function HeaderResults({ children }: HeaderResultsProps) {
  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderRadius: "var(--raddi-md)",
        gap: 2,
  backgroundColor: 'var(--background-glass)'
      }}
    >
      <>{children}</>
    </Box>
  );
}
