import { useState } from "react";
import useIcons from "../../../../global/hooks/useIcons";
import { Odontogram } from "../../../../global/types/Odontogram";
import StepCard from "../../../../global/components/step-card/StepCard";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useOdontogram from "../../../../global/hooks/useOdontogram";
interface MiniCardOdontogramProps {
  odontogram: Odontogram;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}
export default function MiniCardOdontrogram({
  odontogram,
  trigger,
  triggerDispach,
}: MiniCardOdontogramProps) {
  const [openModalOdontogram, setOpenModalOdontrogram] = useState(false);
  const { removeOdontogram } = useOdontogram();
  const { MedicalInformationRoundedIcon } = useIcons();

  const handleDeleteOdontogram = async (idOdontogram: string) => {
    await removeOdontogram(idOdontogram);
    triggerDispach(!trigger);
    setOpenModalOdontrogram(false);
  };

  return (
    <StepCard
      icon={<MedicalInformationRoundedIcon />}
      title={"Odontograma de"}
      subtitle={`${new Date(odontogram.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalOdontrogram(false)}
        severity="error"
        open={openModalOdontogram}
        dispach={() => handleDeleteOdontogram(odontogram.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `odontograma/${odontogram.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalOdontrogram(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
