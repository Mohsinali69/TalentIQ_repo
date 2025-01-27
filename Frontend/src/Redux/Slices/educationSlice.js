/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'

const initialState = {
    education:null,
    educations:[],
    getEducationLoading:false,
    getEducationSuccess:false,
    getEducationError:false,
    createEducationLoading:false,
    createEducationSuccess:false,
    createEducationError:false,
    updateEducationLoading:false,
    updateEducationSuccess:false,
    updateEducationError:false,
    deleteEducationLoading:false,
    deleteEducationSuccess:false,
    deleteEducationError:false,
}

export const createEducation = createAsyncThunk('createEducation',async data =>{
    const response = await axiosSecure.post('/education/create-education',data);
    return response.data.data
})

export const getEducationList = createAsyncThunk('getEducationList',async () =>{
    const response = await axiosSecure.get('/education/get-education');
    return response.data.data
})

export const updateEducation = createAsyncThunk('updateEducation',async ({id,data}) =>{
    const response = await axiosSecure.put(`/education/update-education/${id}`,data);
    return response.data.data
})

export const deleteEducation = createAsyncThunk('deleteEducation',async(id)=>{
    const response = await axiosSecure.delete(`/education/delete-education/${id}`);
    return id
})

const educationSlice = createSlice({
    name:'educations',
    initialState,
    reducers:{
        eduReset:state=>{
            state.getEducationLoading=false
            state.getEducationSuccess=false
            state.getEducationError=false
            state.createEducationLoading = false
            state.createEducationSuccess = false
            state.createEducationError = false
            state.updateEducationLoading = false
            state.updateEducationSuccess = false
            state.updateEducationError = false
            state.deleteEducationLoading = false
            state.deleteEducationSuccess = false
            state.deleteEducationError = false
        },
        setEducation:(state,action)=>{
            state.education = action.payload
        }
    },
    extraReducers:builder => {
        builder
        .addCase(createEducation.pending, (state) => {
            state.createEducationLoading = true
            state.createEducationSuccess = false
            state.createEducationError = false
        })
        .addCase(createEducation.fulfilled, (state, action) => {
            state.educations.push(action.payload)
            state.createEducationLoading = false
            state.createEducationSuccess = true
            state.createEducationError = false
        })
        .addCase(createEducation.rejected, (state, action) => {
            state.createEducationLoading = false
            state.createEducationSuccess = false
            state.createEducationError = true
        })
        .addCase(getEducationList.pending, (state) => {
            state.getEducationLoading = true
            state.getEducationSuccess = false
            state.getEducationError = false
        })
        .addCase(getEducationList.fulfilled, (state, action) => {
            state.educations = action.payload
            state.getEducationLoading = false
            state.getEducationSuccess = true
            state.getEducationError = false
        })
        .addCase(getEducationList.rejected, (state, action) => {
            state.getEducationLoading = false
            state.getEducationSuccess = false
            state.getEducationError = true
        })
        .addCase(updateEducation.pending, (state) => {
            state.updateEducationLoading = true
            state.updateEducationSuccess = false
            state.updateEducationError = false
        })
        .addCase(updateEducation.fulfilled, (state, action) => {
            state.updateEducationLoading = false
            state.createEducationError= false 
            state.updateEducationSuccess = true
        })
        .addCase(updateEducation.rejected, (state, action) => {
            state.updateEducationLoading = false
            state.updateEducationSuccess = false
            state.updateEducationError = true
        })
        .addCase(deleteEducation.pending, (state) => {
            state.deleteEducationLoading = true
            state.deleteEducationSuccess = false
            state.deleteEducationError = false
        })
        .addCase(deleteEducation.fulfilled, (state, action) => {
            state.deleteEducationLoading = false
            state.deleteEducationSuccess = true
            state.deleteEducationError = false
            state.educations = state.educations.filter(edu => edu._id!== action.payload)
        })
        .addCase(deleteEducation.rejected, (state, action) => {
            state.deleteEducationLoading = false
            state.deleteEducationSuccess = false
            state.deleteEducationError = true
        })
    }
})

export const { eduReset ,setEducation} = educationSlice.actions
export default educationSlice.reducer