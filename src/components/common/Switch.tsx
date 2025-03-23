import React from "react";

type SwitchProps = Readonly<{
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedColor?: string;
  unCheckedColor?: string;
  label?: string;
  name: string;
  containerClasses?: string;
}>;

export default function Switch({
  checked,
  onChange,
  checkedColor = "bg-gray-200 dark:bg-gray-600",
  unCheckedColor = "bg-gray-200 dark:bg-gray-600",
  label,
  name,
  containerClasses,
}: SwitchProps) {
  return (
    <div className={`flex ${containerClasses}`}>
      {label && (
        <label className="block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <label
        className={`inline-flex items-center cursor-pointer ${
          label && "mt-0.5"
        }`}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`relative w-11 h-6 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white ${
            checked ? checkedColor : unCheckedColor
          }`}
        />

        <span className="ms-2 text-sm font-medium text-black dark:text-white lowercase first-letter:uppercase">
          {name}
        </span>
      </label>
    </div>
  );
}
