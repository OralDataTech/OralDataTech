import { useState } from "react";
import StepCard from "../../../../global/components/step-card/StepCard";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useIcons from "../../../../global/hooks/useIcons";
import { Periogram } from "../../../../global/types/Periogram";
import usePeriogram from "../../../../global/hooks/usePeriogram";

interface MiniPeriogramCardProps {
  periogram: Periogram;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}
export default function MiniPeriogramCard({
  periogram,
  trigger,
  triggerDispach,
}: MiniPeriogramCardProps) {

  const [openModalPeriogram, setOpenModalPeriogram] = useState(false);
  const { removePeriogram } = usePeriogram();
  const { TableChartRoundedIcon } = useIcons();

  const handleDelete = async (idPeriogram: string) => {
    await removePeriogram(idPeriogram);
    triggerDispach(!trigger);
    setOpenModalPeriogram(false);
  };

  return (
    <StepCard
      icon={<TableChartRoundedIcon />}
      title={"Periograma de"}
      subtitle={`${new Date(periogram.created_at).toLocaleDateString()}`}
    >
      <ConfirmModal
        onClose={() => setOpenModalPeriogram(false)}
        severity="error"
        open={openModalPeriogram}
        dispach={() => handleDelete(periogram.id)}
      />
      <MoreOptions
        options={[
          {
            name: "Editar",
            action: () => {},
            isLink: true,
            to: `periograma/${periogram.id}`,
          },
          {
            name: "Remover",
            action: () => setOpenModalPeriogram(true),
            isLink: false,
          },
        ]}
      />
    </StepCard>
  );
}
