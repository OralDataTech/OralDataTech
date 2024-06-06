import  { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import { PediatricDentistries } from "../../../../global/types/PediatricDentistries";
import usePediatricDentistry from "../../../../global/hooks/usePediatricDentistry";

interface MiniCardEdodonticProps {
  pediatric: PediatricDentistries;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniPediatricDentistries({
  pediatric,
  trigger,
  triggerDispach,
}: MiniCardEdodonticProps) {
  const [openModal, setOpenModal] = useState(false);

  const { removePediatricDentistry } = usePediatricDentistry();

  const handleDelete = async (idPediatric: string) => {
    await removePediatricDentistry(idPediatric);
    triggerDispach(!trigger);
    setOpenModal(false);
  };

  const { EscalatorWarningIcon } = useIcons();
  return (
    <StepCard
      icon={<EscalatorWarningIcon />}
      title={"Criada em:"}
      subtitle={`${new Date(pediatric.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModal(false)}
        severity="error"
        open={openModal}
        dispach={() => handleDelete(pediatric.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `odontopediatria/${pediatric.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModal(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
