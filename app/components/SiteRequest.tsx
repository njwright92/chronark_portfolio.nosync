"use client";

import React, { useRef, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
};

export default function SiteRequest({
  isOpen,
  onClose,
  children,
  title,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="m-auto max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 p-0 text-zinc-100 backdrop:bg-black/80"
    >
      <div className="p-6">
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </dialog>
  );
}
