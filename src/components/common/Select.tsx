type Option = {
  value: string;
  label: string;
};

type SelectProps = Readonly<{
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}>;

export default function Select({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: SelectProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={label}
          className={`text-sm font-semibold mb-1 ${
            disabled ? "text-gray-400" : "text-black dark:text-white"
          }`}
        >
          {label}
        </label>
      )}
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`p-2 border rounded-md h-full transition ${
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-zinc-700 dark:text-gray-500"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}