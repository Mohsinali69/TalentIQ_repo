import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
// import axios from '../../utilis/axios'

const initialState = {
    applications:[],
    applicants:[],
    singleApplication:null,
    createApplicationLoading:false,
    createApplicationSuccess:false,
    createApplicationError:false,
    getApplicationsLoading:false,
    getApplicationsSuccess:false,
    getApplicationsError:false,
    getMyApplicationsLoading:false,
    getMyApplicationsSuccess:false,
    getMyApplicationsError:false,
    getJobApplicantsLoading:false,
    getJobApplicantsSuccess:false,
    getJobApplicantsError:false,
    updateApplicationMessageLoading:false,
    updateApplicationMessageSuccess:false,
    updateApplicationMessageError:false,
    updateApplicationStatusLoading:false,
    updateApplicationStatusSuccess:false,
    updateApplicationStatusError:false,
    updateApplicationAtsScoreLoading:false,
    updateApplicationAtsScoreSuccess:false,
    updateApplicationAtsScoreError:false,
    deleteApplicationLoading:false,
    deleteApplicationSuccess:false,
    deleteApplicationError:false,
    uploadOfferLetterLoading:false,
    uploadOfferLetterSuccess:false,
    uploadOfferLetterError:false,
}

export const createApplication = createAsyncThunk('createApplication',async data=>{
    const response = await axiosSecure.post('/app/create-app',data)
    return response.data.data
})

export const getMyApplications = createAsyncThunk('getMyApplications',async()=>{
    const response = await axiosSecure.get('/app/my-applications')
    return response.data.data
})

export const getJobApplicants = createAsyncThunk('getJobApplicants',async(id)=>{
    const response = await axiosSecure.get(`/app/get-applicants/${id}`)
    return response.data.data
})

export const updateApplicationMessage = createAsyncThunk('updateApplicationMessage',async({id,data})=>{
    const response = await axiosSecure.put(`/app/add-message/${id}`,data)
    return response.data.data
})

export const evaluateApplication = createAsyncThunk('evaluateApplication',async(id)=>{
    const response = await axiosSecure.post(`/app/evaluate-resume/${id}`)
    return response.data.data
})

export const updateApplicationStatus = createAsyncThunk('updateApplicationStatus',async ({id,data})=>{
    const response = await axiosSecure.put(`/app/update-status/${id}`,data)
    return response.data.data
})


export const uploadOfferLetter = createAsyncThunk('uploadOfferLetter',async ({id,data})=>{
    const response = await axiosSecure.put(`/app/upload-offer-letter/${id}`,data)
    return response.data.data
})

const applicationSlice = createSlice({
    name:'application',
    initialState,
    reducers:{
        reset:state=>{
            state.createApplicationLoading = false
            state.createApplicationSuccess = false
            state.createApplicationError = false
            state.getApplicationsLoading = false
            state.getApplicationsSuccess = false
            state.getApplicationsError = false
            state.getMyApplicationsLoading=false
            state.getMyApplicationsSuccess=false
            state.getMyApplicationsError=false
            state.getJobApplicantsLoading=false
            state.getJobApplicantsSuccess=false
            state.getJobApplicantsError=false
            state.updateApplicationStatusLoading=false
            state.updateApplicationStatusSuccess=false
            state.updateApplicationStatusError=false
            state.updateApplicationMessageLoading=false
            state.updateApplicationMessageSuccess=false
            state.updateApplicationMessageError=false
            state.updateApplicationAtsScoreLoading=false
            state.updateApplicationAtsScoreSuccess=false
            state.updateApplicationAtsScoreError=false
            state.deleteApplicationLoading=false
            state.deleteApplicationSuccess=false
            state.deleteApplicationError=false
            state.uploadOfferLetterLoading=false
            state.uploadOfferLetterSuccess=false
            state.uploadOfferLetterError=false
        },
        setSingleApplication:(state,action)=>{
            state.singleApplication = action.payload
        },
        setSingleApplicationNull:(state)=>{
            state.singleApplication = null
        }
    },
    extraReducers:builder => {
        builder
        .addCase(createApplication.pending, (state) => {
            state.createApplicationLoading = true
            state.createApplicationSuccess = false
            state.createApplicationError = false
        })
        .addCase(createApplication.fulfilled, (state) => {
            state.createApplicationLoading = false
            state.createApplicationSuccess = true
            state.createApplicationError = false
        })
        .addCase(createApplication.rejected, (state) => {
            state.createApplicationLoading = false
            state.createApplicationSuccess = false
            state.createApplicationError = true
        })
        .addCase(getMyApplications.pending, (state) => {
            state.getMyApplicationsLoading = true
            state.getMyApplicationsSuccess = false
            state.getMyApplicationsError = false
        })
        .addCase(getMyApplications.fulfilled, (state, action) => {
            state.getMyApplicationsLoading = false
            state.getMyApplicationsSuccess = true
            state.getMyApplicationsError = false
            state.applications = action.payload
        })
        .addCase(getMyApplications.rejected, (state) => {
            state.getMyApplicationsLoading = false
            state.getMyApplicationsSuccess = false
            state.getMyApplicationsError = true
        })
        .addCase(getJobApplicants.pending, (state) => {
            state.getJobApplicantsLoading = true
            state.getJobApplicantsSuccess = false
            state.getJobApplicantsError = false
        })
        .addCase(getJobApplicants.fulfilled, (state, action) => {
            state.getJobApplicantsLoading = false
            state.getJobApplicantsSuccess = true
            state.getJobApplicantsError = false
            state.applicants = action.payload
        })
        .addCase(getJobApplicants.rejected, (state) => {
            state.getJobApplicantsLoading = false
            state.getJobApplicantsSuccess = false
            state.getJobApplicantsError = true
        })
        .addCase(updateApplicationMessage.pending, (state) => {
            state.updateApplicationMessageLoading = true
            state.updateApplicationMessageSuccess = false
            state.updateApplicationMessageError = false
        })
        .addCase(updateApplicationMessage.fulfilled, (state,action) => {
            state.updateApplicationMessageLoading = false
            state.updateApplicationMessageSuccess = true
            state.updateApplicationMessageError = false
            console.log(action.payload)
            state.singleApplication = action.payload
        })
        .addCase(updateApplicationMessage.rejected, (state) => {
            state.updateApplicationMessageLoading = false
            state.updateApplicationMessageSuccess = false
            state.updateApplicationMessageError = true
        })
        .addCase(evaluateApplication.pending, (state) => {
            state.updateApplicationAtsScoreLoading = true
            state.updateApplicationAtsScoreSuccess = false
            state.updateApplicationAtsScoreError = false
        })
        .addCase(evaluateApplication.fulfilled, (state,action) => {
            state.updateApplicationAtsScoreLoading = false
            state.updateApplicationAtsScoreSuccess = true
            state.updateApplicationAtsScoreError = false
            state.applicants = action.payload
        })
        .addCase(evaluateApplication.rejected, (state) => {
            state.updateApplicationAtsScoreLoading = false
            state.updateApplicationAtsScoreSuccess = false
            state.updateApplicationAtsScoreError = true
        })
        .addCase(updateApplicationStatus.pending,(state)=>{
            state.updateApplicationStatusLoading = true
            state.updateApplicationStatusSuccess = false
            state.updateApplicationStatusError = false
        })
        .addCase(updateApplicationStatus.fulfilled,(state,action)=>{
            state.updateApplicationStatusLoading = false
            state.updateApplicationStatusSuccess = true
            state.updateApplicationStatusError = false
            state.singleApplication = action.payload
        })
        .addCase(uploadOfferLetter.pending,(state)=>{
            state.uploadOfferLetterLoading = true
            state.uploadOfferLetterSuccess = false
            state.uploadOfferLetterError = false
        })
        .addCase(uploadOfferLetter.fulfilled,(state,action)=>{
            state.uploadOfferLetterLoading = false
            state.uploadOfferLetterSuccess = true
            state.uploadOfferLetterError = false
        })
        .addCase(updateApplicationStatus.rejected,(state)=>{
            state.updateApplicationStatusLoading = false
            state.updateApplicationStatusSuccess = false
            state.updateApplicationStatusError = true
        })
    }
})

export const {reset,setSingleApplication,setSingleApplicationNull} = applicationSlice.actions

export default applicationSlice.reducer