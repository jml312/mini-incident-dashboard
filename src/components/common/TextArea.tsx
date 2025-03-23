type TextAreaProps = Readonly<{
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  classes?: string;
  containerClasses?: string;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  minLength?: number;
  maxLength?: number;
}>;
export default function TextArea({
  id,
  label,
  value,
  placeholder,
  onChange,
  classes,
  containerClasses,
  error,
  setError,
  minLength,
  maxLength,
}: TextAreaProps) {
  return (
    <div className={`flex flex-col gap-0 ${containerClasses}`}>
      <label
        className="block text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        minLength={minLength}
        maxLength={maxLength}
        id={id}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-md p-2 ${classes} min-h-[100px] max-h-[200px]`}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (setError) setError("");
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
