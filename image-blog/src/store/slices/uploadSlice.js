import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    selectedFiles: [],
    previewUrls: [],
    isUploading: false,
    uploadProgress: 0,
    isModalOpen: false,
    error: null,
  },
  reducers: {
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    
    setPreviewUrls: (state, action) => {
      state.previewUrls = action.payload;
    },
    
    startUpload: (state) => {
      state.isUploading = true;
      state.uploadProgress = 0;
      state.error = null;
    },
    
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    
    uploadComplete: (state) => {
      state.isUploading = false;
      state.uploadProgress = 100;
      state.selectedFiles = [];
      state.previewUrls = [];
    },
    
    uploadError: (state, action) => {
      state.isUploading = false;
      state.error = action.payload;
    },
    
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
      
      if (!action.payload) {
        state.selectedFiles = [];
        state.previewUrls = [];
        state.error = null;
      }
    },
    
    removeFile: (state, action) => {
      const index = action.payload;
      state.selectedFiles = state.selectedFiles.filter((_, i) => i !== index);
      state.previewUrls = state.previewUrls.filter((_, i) => i !== index);
    },
    
    clearSelection: (state) => {
      state.selectedFiles = [];
      state.previewUrls = [];
      state.error = null;
    },
  },
});

export const {
  setSelectedFiles,
  setPreviewUrls,
  startUpload,
  setUploadProgress,
  uploadComplete,
  uploadError,
  setModalOpen,
  removeFile,
  clearSelection,
} = uploadSlice.actions;

export default uploadSlice.reducer;
