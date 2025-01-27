/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import axios from '../../utilis/axios'
import axiosSecure from '../../utilis/axiosSecure'
import auth from '../../Firebase/firebase.config'

const initialState = {
  userDetails: null,
  adminDetails: null,
  user: null,
  users: [],
  isLoading: true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,
  isGetUserDataLoading: false,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  isUpdateUserLoading: false,
  isUpdateUserError: false,
  isUpdateUserSuccess: false,
  isUserImageUpdateLoading: false,
  isUserImageUpdateError: false,
  isUserImageUpdateSuccess: false,
  isUserResumeUpdateLoading: false,
  isUserResumeUpdateError: false,
  isUserResumeUpdateSuccess: false,
  isUserResumeDeleteLoading: false,
  isUserResumeDeleteError: false,
  isUserResumeDeleteSuccess: false,
  isAdminDataLoading: false,
  isAdminDataSuccess: false,
  isAdminDataError: false
}

export const saveUserData = async userData => {
  const response = await axios.post('/user', userData)
  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 3 * 60 * 60 * 1000 // 8 hours from now
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}

export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email: email })
  return response.data.data
})

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: res?.user?.email
    })
    return data
  }
)

export const createUser = createAsyncThunk(
  'createUser',
  async ({ name, email, phone, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const result = updateProfile(auth.currentUser, {
      displayName: name
    })
    const data = await saveUserData({
      name: name,
      email: email,
      phone: phone,
      password: password
    })
    return data
  }
)

export const updateUserImage = createAsyncThunk(
  'updateUserImage',
  async data => {
    const response = await axios.post('/user/update-image', data)
    return response.data.data
  }
)

export const updateUser = createAsyncThunk('updateUser',async data=>{
  const response = await axiosSecure.put('/user/update-user', data)
  return response.data.data
})

export const updateUserResume = createAsyncThunk('updateUserResume',async data=>{
  const response = await axiosSecure.post('/user/update-resume', data)
  return response.data.data
})

export const deleteUserResume = createAsyncThunk('deleteUserResume',async data=>{
  console.log(data)
  const response = await axiosSecure.put('/user/delete-resume', data)
  return response.data.data
})

export const getAdminData = createAsyncThunk('getAdminData',async(req,res,next)=>{
  const response = await axiosSecure.get('/user//admin-data')
  return response.data.data
})


export const logOut = createAsyncThunk('logOut', async () => {
  const response = await signOut(auth)
  localStorage.removeItem('userToken')
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.userDetails = null
      state.adminDetails = null
      // state.isLoading = true
      state.isLoginLoading = false
      state.isLoginError = false
      state.isLoginSuccess = false
      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false
      state.isGetUsersLoading = false
      state.isGetUsersSuccess = false
      state.isGetUsersError = false
      state.isAdminDataLoading = false
      state.isAdminDataSuccess = false
      state.isAdminDataError = false
      state.isUserImageUpdateLoading = false
      state.isUserImageUpdateError = false
      state.isUserImageUpdateSuccess = false
      state.isUserResumeUpdateLoading = false
      state.isUserResumeUpdateError = false
      state.isUserResumeUpdateSuccess = false
      state.isUpdateUserLoading=false
      state.isUpdateUserError=false
      state.isUpdateUserSuccess=false
      state.isUserResumeDeleteLoading=false
      state.isUserResumeDeleteError=false
      state.isUserResumeDeleteSuccess=false
    },
    startLoading: (state, action) => {
      state.isLoading = true
    },
    setUsers: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    logout: async (state, action) => {
      signOut(auth).then(() => {
        state.user = null
        localStorage.removeItem('userToken')
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(fetchUser.pending, state => {
        state.isGetUserDataLoading = true
        state.isGetUserDataError = false
        state.isGetUserDataSuccess = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isGetUserDataLoading = false
        state.isGetUserDataError = true
        state.isGetUserDataSuccess = false
      })
      .addCase(updateUserImage.pending, state => {
        state.isUserImageUpdateLoading = true
        state.isUserImageUpdateError = false
        state.isUserImageUpdateSuccess = false
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.isUserImageUpdateError = false
        state.isUserImageUpdateSuccess = true
        state.isUserImageUpdateLoading = false
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.isUserImageUpdateLoading = false
        state.isUserImageUpdateError = true
        state.isUserImageUpdateSuccess = false
      })
      .addCase(updateUser.pending, state => {
        state.isUpdateUserLoading = true
        state.isUpdateUserError = false
        state.isUpdateUserSuccess = false
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.isUpdateUserError = false
        state.isUpdateUserSuccess = true
        state.isUpdateUserLoading = false
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdateUserLoading = false
        state.isUpdateUserError = true
        state.isUpdateUserSuccess = false
      })
      .addCase(updateUserResume.pending, state => {
        state.isUserResumeUpdateLoading = true
        state.isUserResumeUpdateError = false
        state.isUserResumeUpdateSuccess = false
      })
      .addCase(updateUserResume.fulfilled, (state, action) => {
        state.isUserResumeUpdateError = false
        state.isUserResumeUpdateSuccess = true
        state.isUserResumeUpdateLoading = false
        state.user = action.payload
      })
      .addCase(updateUserResume.rejected, (state, action) => {
        state.isUserResumeUpdateLoading = false
        state.isUserResumeUpdateError = true
        state.isUserResumeUpdateSuccess = false
      })
      .addCase(deleteUserResume.pending, state => {
        state.isUserResumeDeleteLoading = true
        state.isUserResumeDeleteError = false
        state.isUserResumeDeleteSuccess = false
      })
      .addCase(deleteUserResume.fulfilled, (state, action) => {
        state.isUserResumeDeleteError = false
        state.isUserResumeDeleteSuccess = true
        state.isUserResumeDeleteLoading = false
        state.user = action.payload
      })
      .addCase(deleteUserResume.rejected, (state, action) => {
        state.isUserResumeDeleteLoading = false
        state.isUserResumeDeleteError = true
        state.isUserResumeDeleteSuccess = false
      })
      .addCase(getAdminData.pending, state => {
        state.isAdminDataLoading = true
        state.isAdminDataError = false
        state.isAdminDataSuccess = false
      })
      .addCase(getAdminData.fulfilled, (state, action) => {
        state.isAdminDataError = false
        state.isAdminDataSuccess = true
        state.isAdminDataLoading = false
        state.adminDetails = action.payload
      })
      .addCase(getAdminData.rejected, (state, action) => {
        state.isAdminDataLoading = false
        state.isAdminDataError = true
        state.isAdminDataSuccess = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(logOut.rejected, (state, action) => {})
  }
})

export const { reset, setUser, logout, startLoading } = userSlice.actions
export default userSlice.reducer
