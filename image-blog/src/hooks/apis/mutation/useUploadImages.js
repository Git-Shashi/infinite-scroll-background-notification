import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImages } from '@/apis/images';
import { useDispatch } from 'react-redux';
import { startUpload, setUploadProgress, uploadComplete, uploadError } from '@/store/slices/uploadSlice';
import { toast } from 'sonner';

/**
 * Mutation hook for uploading images
 * Invalidates images query on success
 */
export const useUploadImages = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ files }) => {
      dispatch(startUpload());
      
      return uploadImages({
        files,
        onProgress: (progress) => {
          dispatch(setUploadProgress(progress));
        },
      });
    },
    onSuccess: (data) => {
      dispatch(uploadComplete());
      
      // Invalidate and refetch images
      queryClient.invalidateQueries({ queryKey: ['images'] });
      
      toast.success(`${data.count} image${data.count > 1 ? 's' : ''} uploaded successfully!`);
      
      // Simulate processing notification after 2 seconds
      setTimeout(() => {
        toast.info('Image optimization complete');
      }, 2000);
    },
    onError: (error) => {
      dispatch(uploadError(error.message));
      toast.error('Upload failed. Please try again.');
    },
  });
};
