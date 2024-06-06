import { useState } from "react";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import StepCard from "../../../../global/components/step-card/StepCard";
import useIcons from "../../../../global/hooks/useIcons";
import { OlearyIndex } from "../../../../global/types/OLearyIndex";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useIndex from "../../../../global/hooks/useOleary";
import { Badge } from "@mui/material";

interface MiniCardOlearyProps {
  olearyIndex: OlearyIndex;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
}

export default function MiniCardOleary({
  olearyIndex,
  trigger,
  triggerDispach,
}: MiniCardOlearyProps) {
  const { PercentIcon } = useIcons();
  const [openModalOleary, setOpenModalOleary] = useState(false);
  const { removeIndex } = useIndex();

  const handleDeleteOleary = async (id: string) => {
    await removeIndex(id);
    triggerDispach(!trigger);
    setOpenModalOleary(false);
  };

  const verifyRisk = () => {
    return (
      Number(olearyIndex.index) >= 50 && olearyIndex.avaliation === "intracampo"
    );
  };

  return (
    <Badge invisible={!verifyRisk()} badgeContent="!" color="error">
      <StepCard
        icon={<PercentIcon />}
        title={"Índice de"}
        subtitle={`${new Date(olearyIndex.created_at).toLocaleDateString()}`}
      >
        <ConfirmModal
          onClose={() => setOpenModalOleary(false)}
          severity="error"
          open={openModalOleary}
          dispach={() => handleDeleteOleary(olearyIndex.id)}
        />
        <MoreOptions
          options={[
            {
              name: "Editar",
              action: () => {},
              isLink: true,
              to: `oleary/${olearyIndex.id}`,
            },
            {
              name: "Remover",
              action: () => setOpenModalOleary(true),
              isLink: false,
            },
          ]}
        />
      </StepCard>
    </Badge>
  );
}
