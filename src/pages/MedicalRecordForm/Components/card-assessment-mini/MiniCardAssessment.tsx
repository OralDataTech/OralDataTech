import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import { RiskAssessment } from "../../../../global/types/RiskAssessment";
import useRiskAssessment from "../../../../global/hooks/useRiskAssessment";

interface MiniCardAssessmentProps {
  assessment: RiskAssessment;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniCardAssessment({
  assessment,
  trigger,
  triggerDispach,
}: MiniCardAssessmentProps) {
  const [openModal, setOpenModal] = useState(false);
  const { removeRiskAssessment } = useRiskAssessment();

  const handleDelete = async (id: string) => {
    await removeRiskAssessment(id);
    triggerDispach(!trigger);
    setOpenModal(false);
  };

  const { ArticleRoundedIcon } = useIcons();
  return (
    <StepCard
      icon={<ArticleRoundedIcon />}
      title={"Criada em:"}
      subtitle={`${new Date(assessment.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModal(false)}
        severity="error"
        open={openModal}
        dispach={() => handleDelete(assessment.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `avaliacao-risco/${assessment.id}`,
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
