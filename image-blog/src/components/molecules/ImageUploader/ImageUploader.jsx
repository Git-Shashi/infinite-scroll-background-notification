import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { setSelectedFiles, setPreviewUrls, setModalOpen, removeFile } from "@/store/slices/uploadSlice";
import { useUploadImages } from "@/hooks/apis/mutation/useUploadImages";
import { validateImage } from "@/utils/imageUtils";
import { X, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

/**
 * Image uploader modal component
 * Handles file selection, preview, and upload
 */
export function ImageUploader() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { isModalOpen, selectedFiles, previewUrls, isUploading, uploadProgress } = useSelector(state => state.upload);
  const { mutate: uploadImages } = useUploadImages();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    
    // Validate files
    const validFiles = [];
    for (const file of files) {
      const validation = validateImage(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast.error(`${file.name}: ${validation.error}`);
      }
    }

    if (validFiles.length === 0) return;

    dispatch(setSelectedFiles(validFiles));

    // Generate preview URLs
    const urls = validFiles.map(file => URL.createObjectURL(file));
    dispatch(setPreviewUrls(urls));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    const validFiles = [];
    for (const file of files) {
      const validation = validateImage(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast.error(`${file.name}: ${validation.error}`);
      }
    }

    if (validFiles.length === 0) return;

    dispatch(setSelectedFiles(validFiles));
    const urls = validFiles.map(file => URL.createObjectURL(file));
    dispatch(setPreviewUrls(urls));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    dispatch(removeFile(index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    uploadImages({ files: selectedFiles }, {
      onSuccess: () => {
        dispatch(setModalOpen(false));
      },
    });
  };

  const handleClose = () => {
    // Cleanup preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    dispatch(setModalOpen(false));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
          <DialogDescription>
            Select multiple images to upload to your blog
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              JPG, PNG, GIF, WEBP up to 10MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Preview Grid */}
          {previewUrls.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">
                Selected Images ({selectedFiles.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
