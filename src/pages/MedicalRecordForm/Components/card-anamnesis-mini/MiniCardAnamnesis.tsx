import  { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import { Anamnesis } from "../../../../global/types/Anamnesis";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useAnamnesis from "../../../../global/hooks/useAnamnesis";

interface MiniCardAnamnesisProps {
  anamnesis: Anamnesis;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}
export default function MiniCardAnamnesis({
  anamnesis,
  trigger,
  triggerDispach,
}: MiniCardAnamnesisProps) {
  const [openModalAnamnesis, setOpenModalAnamnesis] = useState(false);

  const { PsychologyAltIcon } = useIcons();
  const { removeAnamnesis } = useAnamnesis();

  const handleDeleteAnamnesis = async (idAnamnesis: string) => {
    await removeAnamnesis(idAnamnesis);
    triggerDispach(!trigger);
    setOpenModalAnamnesis(false);
  };

  return (
    <StepCard
      icon={<PsychologyAltIcon />}
      title={anamnesis.motivo_consulta}
      subtitle={`${new Date(anamnesis.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalAnamnesis(false)}
        severity="error"
        open={openModalAnamnesis}
        dispach={() => handleDeleteAnamnesis(anamnesis.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `anamnese/${anamnesis.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalAnamnesis(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
