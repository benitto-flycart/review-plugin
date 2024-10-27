"use client"

import React, { useEffect, useState } from "react"
import {Dialog, DialogContent, DialogTitle, DialogDescription} from "../ui/dialog";
import {Button} from "../ui/button";
import {Textarea} from "../ui/textarea";
import {LoadingSpinner} from "../ui/loader";
import { resetPointerEvents } from "../../helpers/resetPointerEvents";

interface ConfirmationDialogProps {
  title: string
  description?: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: (content?: string) => Promise<void>
  onCancel: () => void
  showTextArea?: boolean
  initialContent?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ConfirmationDialog({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  isOpen,
  onOpenChange
}: ConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
        await onConfirm(); // Awaiting the onConfirm function
    }finally {
        setIsLoading(false);
        onOpenChange(false);
    }
}

  const handleCancel = () => {
    setIsLoading(false);
    onOpenChange(false); // Directly handle modal state
  };

    useEffect(() => {
        resetPointerEvents(isOpen);
    }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:frt-max-w[425px]">
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        <div className="frt-flex frt-justify-end -frt-space-x-2 frt-mt-6 frt-gap-4">
          <Button variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}