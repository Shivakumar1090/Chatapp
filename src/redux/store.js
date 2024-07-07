import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slicers/userSlice'
import chatSlice from './Slicers/chatSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
})