import { toast } from "sonner";

export const toastrSuccess = (message: any) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const toastrError = (message: any) => {
  if (!message) {
    message = "Error";
  }

  toast.error(message, {
    position: "top-right",
  });
};

