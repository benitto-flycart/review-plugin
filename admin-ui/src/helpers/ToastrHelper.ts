import { toast, Toaster } from "sonner";

export const toastrSuccess = (message: any) => {
  toast.success(message, {
    style: {color: "white", backgroundColor: "black"  },
    position: "top-right"
  });
};

export const toastrError = (message: any) => {
  if (!message) {
    message = "Error";
  }

  toast.error(message, {
    style: {color: "white", backgroundColor: "black"  },
    position: "top-right",
  });
};

