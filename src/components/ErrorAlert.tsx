"use client";

export const ErrorAlert = ({
  errorText,
  onClose,
}: {
  errorText: string;
  onClose?: () => void;
}) => {
  if (!errorText) return null;
  return (
    <div className="border border-red-800 rounded m-4 p-2 flex flex-row items-center">
      <p className="text-red-500">{errorText}</p>
      {onClose && (
        <>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="p-1 border text-red-500 border-red-800 rounded"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};
