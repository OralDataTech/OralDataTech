import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import { Exam } from "../../../../global/types/Exam";
import useIcons from "../../../../global/hooks/useIcons";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import useExams from "../../../../global/hooks/useExams";

interface MiniCardAnamnesisProps {
  exam: Exam;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function CardExamsMini({
  exam,
  trigger,
  triggerDispach,
}: MiniCardAnamnesisProps) {
  const { ArticleRoundedIcon } = useIcons();

  const { removeExam } = useExams();
  const [openModalExam, setOpenModalExam] = useState(false);

  const handleRemoveExam = async (idExam: string) => {
    await removeExam(idExam);
    triggerDispach(!trigger);
    setOpenModalExam(false);
  };

  return (
    <>
      <StepCard
        subtitle={`${new Date(exam.created_at).toLocaleDateString()}`}
        title="Exames adicionais"
        icon={<ArticleRoundedIcon />}
      >
        <ConfirmModal
          onClose={() => setOpenModalExam(false)}
          severity="error"
          open={openModalExam}
          dispach={() => handleRemoveExam(exam.id)}
        />
        <MoreOptions
          options={[
            {
              name: "Remover",
              action: () => setOpenModalExam(true),
              isLink: false,
            },
            {
              name: "Editar",
              action: () => {},
              isLink: true,
              to: `exames/${exam.id}`,
            },
          ]}
        />
      </StepCard>
    </>
  );
}
