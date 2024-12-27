import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Sync action: getCategories
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  // If needed, extraReducers can be added for async actions
});

export default categoriesSlice.reducer;  // Exporting the reducer
export const { getCategories } = categoriesSlice.actions;  // Exporting action creator
