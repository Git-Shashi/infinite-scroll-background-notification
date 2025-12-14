import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Upload button atom
 * Triggers file upload dialog
 */
export function UploadButton({ onClick }) {
  return (
    <Button onClick={onClick} className="gap-2">
      <Upload className="h-4 w-4" />
      Upload Images
    </Button>
  );
}
