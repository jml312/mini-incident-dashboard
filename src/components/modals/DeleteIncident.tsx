import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { Incident, useDeleteIncidentMutation } from "@/generated/graphql";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@/contexts/ThemeWrapper";

type DeleteIncidentProps = Readonly<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  incident: Incident;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}>;
export default function DeleteIncident({
  isOpen,
  setIsOpen,
  incident,
  setIncidents,
}: DeleteIncidentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIncident] = useDeleteIncidentMutation();
  const { theme } = useTheme();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteIncident({ variables: { id: incident.id } });
      toast.success("Incident deleted successfully.", { theme });
      setIncidents((prevIncidents) =>
        prevIncidents.filter((i) => i.id !== incident.id)
      );
      setIsOpen(false);
    } catch {
      toast.error("An error occurred. Please try again.", { theme });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title=""
      isLoading={false}
      onClose={() => {}}
      withCloseButton={false}
      width="auto min-w-[300px] max-w-[50vw]"
    >
      <h2 className="font-bold text-center text-black dark:text-white">
        Delete this incident?
      </h2>

      <div className="flex flex-col items-center justify-center mt-2 gap">
        <h2 className="text-lg font-semibold">{incident.title}</h2>
        <p>{incident.description}</p>
      </div>

      <div className="flex justify-center gap-2 mt-4 -mb-4">
        <Button
          text="Cancel"
          onClick={() => setIsOpen(false)}
          px="px-4"
          py="py-2"
          disabled={isLoading}
          bgColor="bg-stone-200 dark:bg-stone-700"
          textColor="text-black dark:text-white"
        />
        <Button
          width="w-20"
          isLoading={isLoading}
          text="Delete"
          disabled={isLoading}
          onClick={handleDelete}
          px="px-4"
          py="py-2"
          bgColor="bg-red-500"
          textColor="text-white"
        />
      </div>
    </Modal>
  );
}
