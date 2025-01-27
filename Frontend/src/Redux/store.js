import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import educationSlice from './Slices/educationSlice'
import jobSlice from './Slices/jobSlice'
import applicationSlice from './Slices/applicationSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    educations: educationSlice,
    job:jobSlice,
    application:applicationSlice
  },
})

export default store;