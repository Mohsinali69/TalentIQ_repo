import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
import axios from '../../utilis/axios'

const initialState = {
  jobs: [],
  job: null,
  title: '',
  company_name: null,
  description: null,
  requirements: null,
  job_category: null,
  job_type: null,
  salary: null,
  min: null,
  max: null,
  skills: [],
  experience: null,
  english_fluency: null,
  address: null,
  country: null,
  city: null,
  state: null,
  createJobLoading: false,
  createJobSuccess: false,
  createJobError: false,
  updateJobLoading: false,
  updateJobSuccess: false,
  updateJobError: false,
  deleteJobLoading: false,
  deleteJobSuccess: false,
  deleteJobError: false,
  getJobLoading: false,
  getJobSuccess: false,
  getJobError: false
}

export const createJob = createAsyncThunk('createJob', async data => {
  const response = await axiosSecure.post('/job/create-job', data)
  return response.data.data
})

export const getJobs = createAsyncThunk('getJobs', async ({title,category,country}) => {
  const response = await axios.get(`/job?title=${title}&category=${category}&country=${country}`)
  return response.data.data
})

export const getMyJob = createAsyncThunk('getMyJob', async () => {
  const response = await axiosSecure.get('/job/get-my-job')
  return response.data.data
})

export const getJobID = createAsyncThunk('getJobID', async ({id}) => {
  const response = await axios.get(`/job/${id}`)
  return response.data.data
})

export const updateJob = createAsyncThunk('updateJob', async ({id, data}) => {
  const response = await axiosSecure.put(`/job/edit-job/${id}`, data)
  return response.data.data
})

export const deleteJob = createAsyncThunk('deleteJob', async ({id}) => {
  // eslint-disable-next-line no-unused-vars
  const response = await axiosSecure.delete(`/job/delete-job/${id}`)
  return id
})

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: state => {
      state.createJobLoading = false
      state.createJobSuccess = false
      state.createJobError = false
      state.updateJobLoading = false
      state.updateJobSuccess = false
      state.updateJobError = false
      state.deleteJobLoading = false
      state.deleteJobSuccess = false
      state.deleteJobError = false
      state.getJobLoading = false
      state.getJobSuccess = false
      state.getJobError = false
    },
    resetDetails: state => {
      state.title = null
      state.company_name = null
      state.description = null
      state.requirements = null
      state.job_category = null
      state.job_type = null
      state.salary = null
      state.min = null
      state.max = null
      state.skills = []
      state.experience = null
      state.english_fluency = null
      state.address = null
      state.country = null
      state.city = null
      state.state = null
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setJobDetails: (state, action) => {
      state.title = action.payload
    },
    setCompany_name: (state, action) => {
      state.company_name = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setRequirements: (state, action) => {
      state.requirements = action.payload
    },
    setJob_category: (state, action) => {
      state.job_category = action.payload
    },
    setJob_type: (state, action) => {
      state.job_type = action.payload
    },
    setSalary: (state, action) => {
      state.salary = action.payload
    },
    setExperience: (state, action) => {
      state.experience = action.payload
    },
    setEnglish_fluency: (state, action) => {
      state.english_fluency = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setCountry: (state, action) => {
      state.country = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setState: (state, action) => {
      state.state = action.payload
    },
    setMin: (state, action) => {
      state.min = action.payload
    },
    setMax: (state, action) => {
      state.max = action.payload
    },
    setJob_skills: (state, action) => {
      state.skills = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createJob.pending, state => {
        state.createJobLoading = true
        state.createJobSuccess = false
        state.createJobError = false
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.createJobLoading = false
        state.createJobSuccess = true
        state.createJobError = false
        state.jobs.push(action.payload)
      })
      .addCase(createJob.rejected, state => {
        state.createJobLoading = false
        state.createJobSuccess = false
        state.createJobError = true
      })
      .addCase(getMyJob.pending, state => {
        state.getJobLoading = true
        state.getJobSuccess = false
        state.getJobError = false
      })
      .addCase(getMyJob.fulfilled, (state, action) => {
        state.getJobLoading = false
        state.getJobSuccess = true
        state.getJobError = false
        state.jobs = action.payload
      })
      .addCase(getMyJob.rejected, state => {
        state.getJobLoading = false
        state.getJobSuccess = false
        state.getJobError = true
      })
      .addCase(getJobID.pending, state => {
        state.getJobLoading = true
        state.getJobSuccess = false
        state.getJobError = false
      })
      .addCase(getJobID.fulfilled, (state, action) => {
        state.getJobLoading = false
        state.getJobSuccess = true
        state.getJobError = false
        state.job = action.payload
      })
      .addCase(getJobID.rejected, state => {
        state.getJobLoading = false
        state.getJobSuccess = false
        state.getJobError = true
      })
      .addCase(updateJob.pending,state=>{
        state.updateJobLoading = true
        state.updateJobSuccess = false
        state.updateJobError = false
      })
      .addCase(updateJob.fulfilled, (state) => {
        state.updateJobLoading = false
        state.updateJobSuccess = true
        state.updateJobError = false
      })
      .addCase(updateJob.rejected, state => {
        state.updateJobLoading = false
        state.updateJobSuccess = false
        state.updateJobError = true
      })
      .addCase(deleteJob.pending, state => {
        state.deleteJobLoading = true
        state.deleteJobSuccess = false
        state.deleteJobError = false
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.deleteJobLoading = false
        state.deleteJobSuccess = true
        state.deleteJobError = false
        state.jobs = state.jobs.filter(job => job._id!== action.payload)
      })
      .addCase(deleteJob.rejected, state => {
        state.deleteJobLoading = false
        state.deleteJobSuccess = false
        state.deleteJobError = true
      })
      .addCase(getJobs.pending, state => {
        state.getJobLoading = true
        state.getJobSuccess = false
        state.getJobError = false
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.getJobLoading = false
        state.getJobSuccess = true
        state.getJobError = false
        state.jobs = action.payload
      })
      .addCase(getJobs.rejected, state => {
        state.getJobLoading = false
        state.getJobSuccess = false
        state.getJobError = true
      })
  }
})

export const {
  reset,
  resetDetails,
  setTitle,
  setAddress,
  setCity,
  setCompany_name,
  setCountry,
  setDescription,
  setEnglish_fluency,
  setExperience,
  setJobDetails,
  setJob_category,
  setJob_type,
  setRequirements,
  setSalary,
  setState,
  setMin,
  setMax,
  setJob_skills
} = jobSlice.actions
export default jobSlice.reducer
