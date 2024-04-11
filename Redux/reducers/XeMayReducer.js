import { createSlice } from '@reduxjs/toolkit';
import { addXeMayApi, deleteXeMayApi, updateXeMayApi } from '../actions/XeMayAction';

const initialState = {
  listXeMay: [],
};

const xeMaySlice = createSlice({
  name: 'xeMay',
  initialState,
  reducers: {
    addXeMay(state, action) {
      state.listXeMay.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteXeMayApi.fulfilled, (state, action) => {
      state.listXeMay = state.listXeMay.filter(row => row.id !== action.payload)
    }).addCase(deleteXeMayApi.rejected, (state, action) => {
      console.log("Xóa thất bại", action.error.message);
    })
    builder.addCase(addXeMayApi.fulfilled, (state, action) => {
      state.listXeMay.push(action.payload)
    })
    builder.addCase(updateXeMayApi.fulfilled, (state, action) => {
      const { id, ten_xe_ph33497, mau_sac_ph33497, gia_ban_ph33497, mo_ta_ph33497, hinh_anh_ph33497 } = action.payload
      const xeMay = state.listXeMay.find(row => row.id === id)
      if (xeMay) {
        xeMay.ten_xe_ph33497 = ten_xe_ph33497,
          xeMay.mau_sac_ph33497 = mau_sac_ph33497,
          xeMay.gia_ban_ph33497 = gia_ban_ph33497,
          xeMay.mo_ta_ph33497 = mo_ta_ph33497,
          xeMay.hinh_anh_ph33497 = hinh_anh_ph33497
      }
    })
  }
});
export const { addXeMay } = xeMaySlice.actions;
export default xeMaySlice.reducer;
