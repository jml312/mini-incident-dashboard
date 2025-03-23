import Loader from "@/components/common/Loader";

type ButtonProps = Readonly<{
  px: string;
  py: string;
  bgColor: string;
  textColor: string;
  text: string;
  Icon?: React.ComponentType;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  width?: string;
  margin?: string;
}>;

export default function Button({
  px,
  py,
  bgColor,
  textColor,
  text,
  Icon,
  onClick,
  disabled = false,
  type = "button",
  isLoading,
  width,
  margin,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} rounded ${py} ${px} inline-flex justify-center items-center gap-1 ${width} ${margin} ${
        disabled
          ? "opacity-50 cursor-not-allowed hover:opacity-50"
          : "cursor-pointer hover:opacity-80 transition-opacity ease-in-out duration-200"
      }`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader width="w-6" height="h-6" fillColor="fill-white" />
      ) : (
        <>
          {Icon && <Icon />} {text}
        </>
      )}
    </button>
  );
}
