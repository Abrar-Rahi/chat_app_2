import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : null
  },
  reducers: {
    usersLoginInfo: (state,action) => {
      
      state.value = action.payload
      
    },
  },
})


export const { usersLoginInfo } = userSlice.actions

export default userSlice.reducer