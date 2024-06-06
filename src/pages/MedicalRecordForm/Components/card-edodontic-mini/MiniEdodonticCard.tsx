import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import { Endodontic } from "../../../../global/types/Endodontic";
import useEdodontics from "../../../../global/hooks/useEdodontics";

interface MiniCardEdodonticProps {
  edodontic: Endodontic;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniEdodonticCard({
  edodontic,
  trigger,
  triggerDispach,
}: MiniCardEdodonticProps) {
  const [openModalEdodontic, setOpenModalEdodontic] = useState(false);

  const { removeEdodontics } = useEdodontics();

  const handleDeleteEdodontic = async (idAnamnesis: string) => {
    await removeEdodontics(idAnamnesis);
    triggerDispach(!trigger);
    setOpenModalEdodontic(false);
  };

  const { MedicalInformationRoundedIcon } = useIcons();
  return (
    <StepCard
      icon={<MedicalInformationRoundedIcon />}
      title={edodontic.queixa_principal}
      subtitle={`${new Date(edodontic.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalEdodontic(false)}
        severity="error"
        open={openModalEdodontic}
        dispach={() => handleDeleteEdodontic(edodontic.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `edodontia/${edodontic.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalEdodontic(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
