import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImage } from '@/apis/images';
import { toast } from 'sonner';

/**
 * Mutation hook for deleting images
 * Uses optimistic updates
 */
export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,
    onMutate: async ({ id }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['images'] });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(['images']);

      // Optimistically update cache
      queryClient.setQueryData(['images'], (old) => {
        if (!old) return old;
        
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            images: page.images.filter(img => img.id !== id),
          })),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(['images'], context.previousData);
      }
      toast.error('Failed to delete image');
    },
    onSuccess: () => {
      toast.success('Image deleted');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};
