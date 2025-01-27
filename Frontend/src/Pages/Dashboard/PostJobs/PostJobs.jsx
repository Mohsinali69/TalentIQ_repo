import './postJobs.css'
import JobDetailsForm from '../../../Component/Dashboard/PostJobComponent/JobDetailsForm'
import Skill_ExperienceForm from '../../../Component/Dashboard/PostJobComponent/Skill_ExperienceForm'
import AddressForm from '../../../Component/Dashboard/PostJobComponent/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { createJob, reset, resetDetails } from '../../../Redux/Slices/jobSlice'

const PostJobs = () => {
  const {
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
    createJobSuccess,
    createJobError
  } = useSelector(state => state.job)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(resetDetails())
  },[dispatch])

  useEffect(() => {
    if (createJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Created Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (createJobError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
  }, [createJobError, createJobSuccess, dispatch])

  const handlePostJob = () => {
    const data = {
      title,
      company_name,
      description,
      requirements,
      job_category,
      job_type,
      salary: {
        salary: salary,
        min: parseInt(min).toFixed(2),
        max: parseInt(max).toFixed(2)
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
    dispatch(createJob(data))
  }

  return (
    <section>
      <h1 className='text-4xl m-7'>Post a New Jobs</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <JobDetailsForm />
        {/* Skills and Experience */}
        <Skill_ExperienceForm />
        <AddressForm />
      </div>
      <div className='mt-5 pl-8 mb-2'>
        <button className='btn btn-info' onClick={handlePostJob}>
          Save Job
        </button>
      </div>
    </section>
  )
}

export default PostJobs
