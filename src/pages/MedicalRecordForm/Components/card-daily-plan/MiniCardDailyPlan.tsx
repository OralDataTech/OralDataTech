import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import { DailyClinicalProcedurePlanning } from "../../../../global/types/DailyClinicalProcedurePlanning";
import useDaily from "../../../../global/hooks/useDaily";

interface MiniCardEdodonticProps {
  dailyPlan: DailyClinicalProcedurePlanning;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniCardDailyPlan({
  dailyPlan,
  trigger,
  triggerDispach,
}: MiniCardEdodonticProps) {
  const [openModal, setOpenModal] = useState(false);
  const { removeDaily } = useDaily();

  const handleDelete = async (idPediatric: string) => {
    await removeDaily(idPediatric);
    triggerDispach(!trigger);
    setOpenModal(false);
  };

  const { SchemaRoundedIcon } = useIcons();
  return (
    <StepCard
      icon={<SchemaRoundedIcon />}
      title={"Criada em:"}
      subtitle={`${new Date(dailyPlan.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModal(false)}
        severity="error"
        open={openModal}
        dispach={() => handleDelete(dailyPlan.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `planejamento-diario/${dailyPlan.id}`,
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
