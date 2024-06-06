import { useState } from "react";
import { TreatmentPlan } from "../../../../global/types/TreatmentPlan";
import StepCard from "../../../../global/components/step-card/StepCard";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useIcons from "../../../../global/hooks/useIcons";
import useTreatment from "../../../../global/hooks/useTreatment";

interface MiniTreatmentCardProps {
  treatment: TreatmentPlan;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}
export default function MiniTreatmentCard({
  treatment,
  trigger,
  triggerDispach,
}: MiniTreatmentCardProps) {
  const [openModalTreatment, setOpenModalTreatment] = useState(false);
  const { removeTreatment } = useTreatment();
  const { HealthAndSafetyRoundedIcon } = useIcons();

  const handleDeleteTreatment = async (idTreatment: string) => {
    await removeTreatment(idTreatment);
    triggerDispach(!trigger);
    setOpenModalTreatment(false);
  };

  return (
    <StepCard
      icon={<HealthAndSafetyRoundedIcon />}
      title={"Plano de tratamento de"}
      subtitle={`${new Date(treatment.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalTreatment(false)}
        severity="error"
        open={openModalTreatment}
        dispach={() => handleDeleteTreatment(treatment.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `plano-tratamento/${treatment.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalTreatment(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
