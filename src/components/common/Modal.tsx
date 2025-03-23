import Button from "@/components/common/Button";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from "react";

type ModalProps = Readonly<{
  isOpen: boolean;
  title: string;
  isLoading?: boolean;
  withCloseButton?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  submitDisabled?: boolean;
  width?: string;
  children: React.ReactNode;
}>;

export default function Modal({
  isOpen,
  title,
  isLoading,
  withCloseButton = true,
  onClose,
  onSubmit,
  submitText,
  submitDisabled,
  width = "w-1/2",
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-y-auto overflow-x-hidden mx-auto flex justify-center items-center`}
    >
      <div className="flex items-center justify-center min-h-screen min-w-[625px] sm:min-w-full w-1/2">
        <div className="fixed inset-0 bg-[rgba(0,0,0,.75)]"></div>

        <div
          className={`relative bg-white dark:bg-zinc-800 pt-2 pb-3.5 px-3 rounded-lg shadow-lg h-full my-24 ${width}`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h2>
            {withCloseButton && (
              <MdOutlineClose
                onClick={onClose}
                className="text-xl text-black cursor-pointer dark:text-white"
              />
            )}
          </div>
          {children}
          <div className="flex justify-end gap-2 mt-4">
            {onSubmit && (
              <Button
                width="w-20"
                isLoading={isLoading}
                text={submitText ?? "Submit"}
                onClick={onSubmit}
                px="px-4"
                py="py-2"
                bgColor="bg-blue-500"
                textColor="text-white"
                disabled={isLoading || submitDisabled}
                type="submit"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
