import { toast } from "react-toastify";

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Text copied to clipboard")
    })
    .catch((error) => {
        toast.error("Failed to copy text")
    });
};
