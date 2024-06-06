import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import { Periodontic } from "../../../../global/types/Periodontic";
import usePeriodontics from "../../../../global/hooks/usePeriodontic";
import useIcons from "../../../../global/hooks/useIcons";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";

interface MiniCardPeriodonticProps {
  periodontic: Periodontic;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniPeriodonticCard({
  periodontic,
  trigger,
  triggerDispach,
}: MiniCardPeriodonticProps) {
  const [openModalPeriodontic, setOpenModalPeriodontic] = useState(false);
  const { removePeriodontics } = usePeriodontics();
  const { MedicalInformationRoundedIcon } = useIcons();

  const handleDeletePeriodontic = async (idPeriodontic: string) => {
    await removePeriodontics(idPeriodontic);
    triggerDispach(!trigger);
    setOpenModalPeriodontic(false);
  };
  return (
    <StepCard
      icon={<MedicalInformationRoundedIcon />}
      title={"Periodontia de"}
      subtitle={`${new Date(periodontic.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalPeriodontic(false)}
        severity="error"
        open={openModalPeriodontic}
        dispach={() => handleDeletePeriodontic(periodontic.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `periodontia/${periodontic.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalPeriodontic(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
