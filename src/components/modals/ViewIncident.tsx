import Modal from "@/components/common/Modal";
import { Incident } from "@/generated/graphql";
import Badge from "@/components/common/Badge";
import { STATUS_COLORS, SEVERITY_COLORS } from "@/constants";

type ViewIncidentProps = Readonly<{
  incident: Incident;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export default function ViewIncident({
  incident,
  isOpen,
  setIsOpen,
}: ViewIncidentProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      withCloseButton
      title={incident.title}
    >
      <div className="px-4 pt-2">
        <p>{incident.description}</p>
        <div className="flex space-x-2 mt-2 -mb-3">
          <Badge
            text={incident.severity}
            color={SEVERITY_COLORS[incident.severity.toLowerCase()]}
          />
          <Badge
            text={incident.status}
            color={STATUS_COLORS[incident.status.toLowerCase()]}
          />
        </div>
      </div>
    </Modal>
  );
}
