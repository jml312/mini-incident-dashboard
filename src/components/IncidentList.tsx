"use client";

import { Incident } from "@/generated/graphql";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Loader from "@/components/common/Loader";
import Button from "@/components/common/Button";
import { ApolloError } from "@apollo/client";
import EditIncident from "@/components/modals/EditIncident";
import DeleteIncident from "@/components/modals/DeleteIncident";
import ViewIncident from "@/components/modals/ViewIncident";
import { useState } from "react";
import Badge from "@/components/common/Badge";
import { SEVERITY_COLORS, STATUS_COLORS } from "@/constants";

type IncidentListProps = Readonly<{
  incidents: Incident[];
  loading: boolean;
  error: ApolloError | undefined;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}>;
export default function IncidentList({
  incidents,
  loading,
  error,
  setIncidents,
}: IncidentListProps) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (incidents.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          setIncidents={setIncidents}
        />
      ))}
    </div>
  );
}

type IncidentCardProps = Readonly<{
  incident: Incident;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}>;
function IncidentCard({ incident, setIncidents }: IncidentCardProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewIncident, setShowViewIncident] = useState(false);
  return (
    <>
      <EditIncident
        isOpen={showEditForm}
        initialIncident={incident}
        setShowEditForm={setShowEditForm}
        setIncidents={setIncidents}
      />
      <DeleteIncident
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        incident={incident}
        setIncidents={setIncidents}
      />
      <ViewIncident
        incident={incident}
        isOpen={showViewIncident}
        setIsOpen={setShowViewIncident}
      />

      <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{incident.title}</h2>
          <div className="flex space-x-2">
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
        <p className="mt-2 line-clamp-2">{incident.description}</p>

        <div className="flex gap-3 mt-3 w-full justify-between items-end">
          <div className="flex gap-2">
            <Button
              text="Edit"
              Icon={FaRegEdit}
              onClick={() => setShowEditForm(true)}
              px="px-2"
              py="py-1"
              bgColor="bg-stone-200 dark:bg-stone-700"
              textColor="text-black dark:text-white"
            />
            <Button
              text="Delete"
              Icon={FaRegTrashAlt}
              onClick={() => setShowDeleteModal(true)}
              px="px-2"
              py="py-1"
              bgColor="bg-stone-200 dark:bg-stone-700"
              textColor="text-black dark:text-white"
            />
          </div>

          <div>
            <button
              className="cursor-pointer text-[.825rem] font-medium"
              onClick={() => setShowViewIncident(true)}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-250px)]">
      <Loader />
    </div>
  );
}

type ErrorStateProps = Readonly<{
  error: ApolloError;
}>;
function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-250px)]">
      <p className="text-red-500 font-medium text-lg">{error.message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-250px)]">
      <p className="text-gray-500 mt-10 font-medium text-lg">
        No incidents found.
      </p>
    </div>
  );
}
