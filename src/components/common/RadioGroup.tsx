type RadioGroupProps = Readonly<{
  activeValue: string;
  values: string[];
  setValue: (value: string) => void;
  label: string;
  containerClasses?: string;
}>;
export default function RadioGroup({
  activeValue,
  values,
  setValue,
  label,
  containerClasses,
}: RadioGroupProps) {
  return (
    <div className={`${containerClasses}`}>
      <label className="block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-nowrap">
        {values.map((value) => (
          <button
            type="button"
            className={`w-full sm:w-auto cursor-pointer py-1 px-2 border-[0.5px] border-gray-300 rounded-md sm:rounded-none sm:first-of-type:rounded-l-md sm:last-of-type:rounded-r-md transition-all ease-in-out duration-200 lowercase first-letter:uppercase ${
              activeValue === value
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            key={value}
            onClick={() => setValue(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
