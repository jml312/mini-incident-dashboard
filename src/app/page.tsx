"use client";
import {
  useGetIncidentsQuery,
  Incident,
  Severity,
  Status,
} from "@/generated/graphql";
import IncidentList from "@/components/IncidentList";
import Header from "@/components/Header";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import CreateIncident from "@/components/modals/CreateIncident";
import Select from "@/components/common/Select";
import Input from "@/components/common/Input";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [status, setStatus] = useState<Status | "All">("All");
  const [severity, setSeverity] = useState<Severity | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedState(searchTerm, 400);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { loading, error, data } = useGetIncidentsQuery({
    variables: {
      status: status !== "All" ? status : undefined,
      severity: severity !== "All" ? severity : undefined,
      search: debouncedSearch || undefined,
      limit,
      offset: page * limit,
    },
  });
  const disabledFilters =
    loading || error !== undefined || data?.incidents?.items?.length === 0;

  useEffect(() => {
    setIncidents(data?.incidents?.items ?? []);
  }, [data]);

  return (
    <>
      <CreateIncident
        isOpen={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        setIncidents={setIncidents}
      />

      <div className="w-4/5 md:w-3/5 flex flex-col mx-auto">
        <Header />

        <div className="mb-2.5 mt-0 xl:-mt-2 flex flex-col xl:flex-row justify-between items-start xl:items-end">
          <Button
            text="Create Incident"
            Icon={FaPlus}
            onClick={() => setShowCreateForm(true)}
            px="px-4"
            py="py-2"
            bgColor="bg-blue-500"
            textColor="text-white"
            disabled={loading || error !== undefined}
            margin="mt-1 xl:mt-0"
          />

          {/* Spacer */}
          <div className="w-10 h-10"></div>

          {/* Filter and Search */}
          <div className="flex flex-col xl:flex-row gap-3 -mt-7 xl:mt-4 h-full">
            <Select
              options={[
                { value: "All", label: "All Severity" },
                { value: Severity.Low, label: "Low" },
                { value: Severity.Medium, label: "Medium" },
                { value: Severity.High, label: "High" },
              ]}
              value={severity}
              onChange={(value) => setSeverity(value as Severity | "All")}
              disabled={loading || error !== undefined}
            />
            <Select
              options={[
                { value: "All", label: "All Status" },
                { value: Status.Open, label: "Open" },
                { value: Status.Closed, label: "Closed" },
              ]}
              value={status}
              onChange={(value) => setStatus(value as Status | "All")}
              disabled={loading || error !== undefined}
            />
            <Input
              maxLength={30}
              disabled={
                error !== undefined ||
                (loading && data?.incidents?.items?.length === 0)
              }
              id="search-input"
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <IncidentList
          incidents={incidents}
          loading={loading}
          error={error}
          setIncidents={setIncidents}
        />
        {!disabledFilters && (
          <Pagination
            page={page}
            totalPages={Math.ceil((data?.incidents?.totalCount ?? 0) / limit)}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            containerClassName="mt-4 mb-6"
          />
        )}
      </div>
    </>
  );
}
