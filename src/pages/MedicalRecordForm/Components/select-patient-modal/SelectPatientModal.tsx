import { Modal } from "@mui/material";
import { useState } from "react";


export default function SelectPatientModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <></>
    </Modal>
  );
}
