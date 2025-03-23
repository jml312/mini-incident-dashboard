type InputProps = Readonly<{
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
  containerClasses?: string;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
}>;

export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  classes = "",
  containerClasses = "",
  error,
  setError,
  disabled = false,
  minLength,
  maxLength,
}: InputProps) {
  return (
    <div className={`flex flex-col w-full gap-0 ${containerClasses}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            disabled
              ? "text-gray-400 dark:text-gray-500"
              : "text-black dark:text-white"
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex w-full">
        <input
          minLength={minLength}
          maxLength={maxLength}
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full min-w-auto field-sizing-content flex-grow border rounded p-2 h-10 transition bg-white dark:bg-zinc-800 ${
            disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-zinc-700 dark:text-gray-500"
              : "border-gray-300 dark:border-gray-600"
          } ${classes}`}
          value={value}
          onChange={(e) => {
            if (!disabled) {
              onChange(e);
              if (setError) setError("");
            }
          }}
          disabled={disabled}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
