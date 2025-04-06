import Button from "@/components/common/Button";
import Select from "@/components/common/Select";

type PaginationProps = Readonly<{
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  containerClassName?: string;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}>;
export default function Pagination({
  page,
  totalPages,
  setPage,
  containerClassName,
  limit,
  setLimit,
}: PaginationProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row justify-between items-start lg:items-end mt-7 mb-9 ${containerClassName}`}
    >
      <div className="flex items-center space-x-4">
        <Button
          text="Previous"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(page - 1);
          }}
          px="px-4"
          py="py-2"
          bgColor="bg-blue-500"
          textColor="text-white"
          disabled={page === 0}
        />
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <Button
          text="Next"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(page + 1);
          }}
          px="px-4"
          py="py-2"
          bgColor="bg-blue-500"
          textColor="text-white"
          disabled={page === totalPages - 1}
        />
      </div>

      {/* Spacer */}
      <div className="w-10 h-10"></div>

      <div className="flex items-center space-x-4 -mt-6 -mb-1 lg:mt-0 lg:mb-0">
        <p>Items per page</p>
        <Select
          options={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
          value={limit.toString()}
          onChange={(value) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setLimit(Number(value));
            setPage(0);
          }}
        />
      </div>
    </div>
  );
}
