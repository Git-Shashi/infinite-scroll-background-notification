import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    posts: [],
    currentPage: 0,
    hasMore: true,
    isLoading: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.currentPage = 0;
      state.hasMore = true;
    },
    
    addPosts: (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    },
    
    loadMorePosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.currentPage += 1;
      
      if (action.payload.length < 20) {
        state.hasMore = false;
      }
    },
    
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    resetPagination: (state) => {
      state.currentPage = 0;
      state.hasMore = true;
    },
  },
});

export const {
  setPosts,
  addPosts,
  loadMorePosts,
  deletePost,
  setLoading,
  resetPagination,
} = imageSlice.actions;

export default imageSlice.reducer;
