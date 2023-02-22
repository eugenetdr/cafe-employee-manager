import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        selectedEmployeeId: "",
        data: [],
  },
  reducers: {
    updateEmployeeData: (state, action) => {
      state.data = action.payload
    },
    updateSelectedEmployeeId: (state, action) => {
        state.selectedEmployeeId = action.payload
    },
  },
})

export const { updateEmployeeData, updateSelectedEmployeeId } = employeeSlice.actions

export default employeeSlice.reducer
