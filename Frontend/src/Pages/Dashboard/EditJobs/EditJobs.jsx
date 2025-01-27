import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import JobDetailsForm from '../../../Component/Dashboard/PostJobComponent/JobDetailsForm'
import Skill_ExperienceForm from '../../../Component/Dashboard/PostJobComponent/Skill_ExperienceForm'
import AddressForm from '../../../Component/Dashboard/PostJobComponent/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  getJobID,
  reset,
  setAddress,
  setCity,
  setCompany_name,
  setCountry,
  setDescription,
  setEnglish_fluency,
  setExperience,
  setJob_category,
  setJob_skills,
  setJob_type,
  setMax,
  setMin,
  setRequirements,
  setSalary,
  setState,
  setTitle,
  updateJob
} from '../../../Redux/Slices/jobSlice'
import Swal from 'sweetalert2'

const EditJobs = () => {
  const {
    job,
    title,
    company_name,
    description,
    requirements,
    job_category,
    job_type,
    salary,
    min,
    max,
    skills,
    experience,
    english_fluency,
    address,
    country,
    city,
    state,
    updateJobError,
    updateJobSuccess
  } = useSelector(state => state.job)

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getJobID({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (job) {
      dispatch(setTitle(job?.title))
      dispatch(setCompany_name(job?.company_name))
      dispatch(setDescription(job?.description))
      dispatch(setRequirements(job?.requirements))
      dispatch(setJob_category(job?.job_category))
      dispatch(setJob_type(job?.job_type))
      dispatch(setSalary(job?.salary?.salary))
      dispatch(setMin(job?.salary?.min))
      dispatch(setMax(job?.salary?.max))
      dispatch(setJob_skills(job?.skills))
      dispatch(setExperience(job?.experience))
      dispatch(setEnglish_fluency(job?.english_fluency))
      dispatch(setAddress(job?.address?.address))
      dispatch(setCountry(job?.address?.country))
      dispatch(setState(job?.address?.state))
      dispatch(setCity(job?.address?.city))
    }
  }, [dispatch, job])

  useEffect(() => {
    if(updateJobError){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if(updateJobSuccess){
      navigate('/dashboard/my-jobs')
    }
  }, [updateJobError, dispatch, updateJobSuccess, navigate])

  const handleUpdate = () => {
    const data = {
      title,
      company_name,
      description,
      requirements,
      job_category,
      job_type,
      salary: {
        salary: salary,
        min: parseFloat(min).toFixed(2),
        max: parseFloat(max).toFixed(2)
      },
      skills,
      experience,
      english_fluency,
      address: {
        address,
        country,
        city,
        state
      }
    }
    dispatch(updateJob({ id, data }))
  }
  return (
    <section>
      <h1 className='text-4xl m-7'>Edit Jobs</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <JobDetailsForm />
        {/* Skills and Experience */}
        <Skill_ExperienceForm />
        <AddressForm />
      </div>
      <div className='mt-5 pl-8 mb-2'>
        <button className='btn btn-info' onClick={handleUpdate}>
          Update Job
        </button>
      </div>
    </section>
  )
}

export default EditJobs
