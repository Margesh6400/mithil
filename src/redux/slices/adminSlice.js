import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: { data: null },
  reducers: {
    setAdminData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAdminData } = adminSlice.actions;
export default adminSlice.reducer;