import Modal from "@/components/common/Modal";
import {
  Incident,
  useUpdateIncidentMutation,
  Status,
  Severity,
} from "@/generated/graphql";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import RadioGroup from "@/components/common/RadioGroup";
import Switch from "@/components/common/Switch";
import { toast } from "react-toastify";
import { useTheme } from "@/contexts/ThemeWrapper";
import { useState } from "react";

type EditIncidentProps = Readonly<{
  isOpen: boolean;
  initialIncident: Incident;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}>;
export default function EditIncident({
  isOpen,
  initialIncident,
  setShowEditForm,
  setIncidents,
}: EditIncidentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [incident, setIncident] = useState<Incident>(initialIncident);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [updateIncident] = useUpdateIncidentMutation();
  const { theme } = useTheme();

  const onClose = () => {
    setShowEditForm(false);
    setIncident(initialIncident);
  };

  const onSubmit = async () => {
    if (!incident.title) {
      setTitleError("Title is required");
      return;
    }
    if (!incident.description) {
      setDescriptionError("Description is required");
      return;
    }
    setIsLoading(true);
    try {
      await updateIncident({
        variables: {
          id: incident.id,
          input: {
            title: incident.title,
            description: incident.description,
            severity: incident.severity,
            status: incident.status,
          },
        },
      });
      toast.success("Incident updated successfully", { theme });
      setIncidents((prevIncidents) =>
        prevIncidents.map((i) => (i.id === incident.id ? incident : i))
      );
      onClose();
    } catch {
      toast.error("An error occurred", { theme });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      title="Edit Incident"
      onSubmit={onSubmit}
      submitText="Update"
      submitDisabled={
        !incident.title ||
        !incident.description ||
        (incident.title === initialIncident.title &&
          incident.description === initialIncident.description &&
          incident.severity === initialIncident.severity &&
          incident.status === initialIncident.status)
      }
    >
      <form>
        <Input
          maxLength={50}
          id="edit-incident-title"
          label="Title"
          type="text"
          placeholder="Title"
          value={incident.title}
          onChange={(e) => setIncident({ ...incident, title: e.target.value })}
          error={titleError}
          setError={setTitleError}
        />
        <TextArea
          maxLength={500}
          containerClasses="mt-3"
          id="edit-incident-description"
          label="Description"
          placeholder="Description"
          value={incident?.description ?? ""}
          onChange={(e) =>
            setIncident({ ...incident, description: e.target.value })
          }
          error={descriptionError}
          setError={setDescriptionError}
        />
        <RadioGroup
          containerClasses="mt-3"
          label="Severity"
          values={[Severity.Low, Severity.Medium, Severity.High]}
          activeValue={incident.severity}
          setValue={(newSeverity) =>
            setIncident({ ...incident, severity: newSeverity as Severity })
          }
        />
        <Switch
          checked={incident.status === Status.Open}
          checkedColor="bg-green-500"
          unCheckedColor="bg-gray-500"
          onChange={() => {
            setIncident({
              ...incident,
              status:
                incident.status === Status.Open ? Status.Closed : Status.Open,
            });
          }}
          label="Status"
          name={incident.status}
          containerClasses="mt-3 flex-col"
        />
      </form>
    </Modal>
  );
}
