import { createSlice } from '@reduxjs/toolkit'

export const cafeSlice = createSlice({
    name: 'cafe',
    initialState: {
        selectedCafeId: "",
        data: [],
  },
  reducers: {
    updateCafeData: (state, action) => {
      state.data = action.payload
    },
    updateSelectedCafeId: (state, action) => {
        state.selectedCafeId = action.payload
    },
  },
})

export const { updateCafeData, updateSelectedCafeId } = cafeSlice.actions

export default cafeSlice.reducer
