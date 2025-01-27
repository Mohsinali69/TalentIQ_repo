import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCompany_name,
  setDescription,
  setJob_category,
  setJob_type,
  setMax,
  setMin,
  setRequirements,
  setSalary,
  setTitle
} from '../../../Redux/Slices/jobSlice'

const categories = [
  {
    id: 1,
    icon: <FaRegFileAlt />,
    name: 'content Writer',
    job: 3
  },
  {
    id: 2,
    icon: <TfiHeadphoneAlt />,
    name: 'Human Resource',
    job: 2
  },
  {
    id: 3,
    icon: <BsBank />,
    name: 'Finance',
    job: 1
  },
  {
    id: 4,
    icon: <GrPersonalComputer />,
    name: 'Management',
    job: 0
  },
  {
    id: 5,
    icon: <FaSearchengin />,
    name: 'Market Research',
    job: 1
  },
  {
    id: 6,
    icon: <FaRegFolderOpen />,
    name: 'Retail & Product',
    job: 0
  },
  {
    id: 7,
    icon: <MdProductionQuantityLimits />,
    name: 'Market & Sale',
    job: 0
  },
  {
    id: 8,
    icon: <GrCloudSoftware />,
    name: 'Software',
    job: 0
  }
]

const JobDetailsForm = () => {
  const {
    title,
    company_name,
    description,
    requirements,
    job_category,
    job_type,
    salary,
    min,
    max
  } = useSelector(state => state.job)
  const [value, setValue] = useState('')
  const [req, setReq] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setValue(description)
    setReq(requirements)
  }, [description, requirements])

  useEffect(() => {
    dispatch(setDescription(value))
    dispatch(setRequirements(req))
  }, [value, dispatch, req])

  return (
    <>
      {/* job details */}
      <div>
        <h1 className='text-3xl text-blue-800'>Job Details</h1>
        {/* job title and company name */}
        <div className='grid grid-cols-2 gap-x-5'>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Job Title * </span>
              </div>
              <input
                value={title}
                type='text'
                placeholder='Ex: Product Designer'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => dispatch(setTitle(e.target.value))}
              />
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Company Name * </span>
              </div>
              <input
                value={company_name}
                type='text'
                placeholder='Ex: Product Designer'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => dispatch(setCompany_name(e.target.value))}
              />
            </label>
          </div>
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Description * </span>
            </div>
            <ReactQuill
              theme='snow'
              value={value}
              onChange={setValue}
              className='custom-quill'
            />
          </label>
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Requirement * </span>
            </div>
            <ReactQuill
              theme='snow'
              value={req}
              onChange={setReq}
              className='custom-quill'
            />
          </label>
        </div>
        {/* job category and job type */}
        <div className='grid grid-cols-2 gap-x-5'>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Job Category * </span>
              </div>
              <select
                value={job_category}
                onChange={e => dispatch(setJob_category(e.target.value))}
                className='p-2 rounded-lg w-full border border-black focus:border-black'
              >
                <option value=''>Select Job Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Job Type * </span>
              </div>
              <select
                value={job_type}
                onChange={e => dispatch(setJob_type(e.target.value))}
                className='p-2 rounded-lg w-full border border-black focus:border-black'
              >
                <option value=''>Select Job Type</option>
                <option value='Full Time'>Full Time</option>
                <option value='Part Time'>Part Time</option>
                <option value='Hourly-Contract'>Hourly-Contract</option>
              </select>
            </label>
          </div>
        </div>
        {/* salary section */}
        <div className='grid grid-cols-3 gap-x-5'>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Salary * </span>
              </div>
              <select
                value={salary}
                onChange={e => dispatch(setSalary(e.target.value))}
                className='p-2 rounded-lg w-full border border-black focus:border-black'
              >
                <option value=''>Select Salary</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
              </select>
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                {/* <span className='font-semibold'>Salary * </span> */}
              </div>
              <input
                value={min}
                onChange={e => dispatch(setMin(e.target.value))}
                placeholder='Min'
                className='p-2 rounded-lg w-full border border-black focus:border-black mt-6'
              />
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                {/* <span className='font-semibold'>Salary * </span> */}
              </div>
              <input
                value={max}
                onChange={e => dispatch(setMax(e.target.value))}
                placeholder='Max'
                className='p-2 rounded-lg w-full border border-black focus:border-black mt-6'
              />
            </label>
          </div>
        </div>
      </div>{' '}
      {/*End of job details */}
    </>
  )
}

export default JobDetailsForm
