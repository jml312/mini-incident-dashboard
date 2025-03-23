import Modal from "@/components/common/Modal";
import { useState } from "react";
import Switch from "@/components/common/Switch";
import {
  Incident,
  Status,
  Severity,
  useAddIncidentMutation,
} from "@/generated/graphql";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import RadioGroup from "@/components/common/RadioGroup";
import { toast } from "react-toastify";
import { useTheme } from "@/contexts/ThemeWrapper";

type CreateIncidentProps = Readonly<{
  isOpen: boolean;
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}>;

const initialIncident: Incident = {
  id: "",
  title: "",
  description: "",
  severity: Severity.Low,
  status: Status.Open,
};

export default function CreateIncident({
  isOpen,
  setShowCreateForm,
  setIncidents,
}: CreateIncidentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [incident, setIncident] = useState<Incident>(initialIncident);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [addIncident] = useAddIncidentMutation();
  const { theme } = useTheme();

  const onClose = () => {
    setShowCreateForm(false);
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
      await addIncident({
        variables: {
          input: {
            title: incident.title,
            description: incident.description,
            severity: incident.severity,
            status: incident.status,
          },
        },
      });
      setIncidents((prevIncidents) => [incident, ...prevIncidents]);
      toast.success("Incident created successfully.", {
        theme,
      });
      onClose();
    } catch {
      toast.error("An error occurred. Please try again.", {
        theme,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Incident"
      onSubmit={onSubmit}
      isLoading={isLoading}
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
          id="incident-title"
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
          id="incident-description"
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
