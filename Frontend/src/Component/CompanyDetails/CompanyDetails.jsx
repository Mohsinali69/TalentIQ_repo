import { CiClock2, CiLocationOn } from 'react-icons/ci'
import mapImg from '../../assets/images/map.png'
import { IoBagHandleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import dateDifference from '../../utilis/formattedDate'
import { getJobs } from '../../Redux/Slices/jobSlice'
import { Link } from 'react-router-dom'
const CompanyDetails = () => {
  const {job,jobs} = useSelector(state=>state.job)
  const [similarJob,setSimilarJob] = useState([])

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getJobs())
  },[dispatch])

  useEffect(()=>{
    const result = jobs?.filter(item=>item.job_category === job?.job_category && item._id !== job._id)
    setSimilarJob(result)
  },[job, jobs])

  return (
    <section className='w-6/7'>
      <div className=' border-2 rounded-lg'>
        <div className='flex pt-5 pl-5'>
          <div>
            <img
              src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-5.svg'
              alt=''
            />
          </div>
          <div className='ml-3'>
            <h1 className='text-xl font-semibold'>{job?.company_name}</h1>
            <div className='flex items-center text-sm text-gray-600'>
              <CiLocationOn /> <span className='ml-1'>{job?.address?.country}</span>
            </div>
          </div>
        </div>
        <div className='my-5 px-5'>
          <hr />
        </div>
        <div className='pb-3'>
          <div className='flex justify-center'>
            <img src={mapImg} className='w-[400px] h-[180px]' alt='' />
          </div>
          <ul className='list-disc ml-7 text-gray-600 mt-7 px-2'>
            <li>{job?.address?.address}</li>
            <li>Phone : {job?.createdBy?.phone}</li>
            <li>Email : {job?.createdBy?.email}</li>
          </ul>
        </div>
      </div>
      <div className={`border-2 rounded-lg mt-10 overflow-y-auto ${similarJob.length<=1?'h-[200px]':similarJob.length<=3?'h-[400px]':'h-[500px]'}`}>
        <h1 className='text-xl font-semibold pt-5 pl-5'>Similar Jobs</h1>
        <div className='my-5 px-5'>
          <hr />
        </div>
        {/* similar jobs */}
        {
          similarJob.map((item,index)=>
          <Link key={index} to={`/apply-job/${item?._id}`}>
          <div  className='cursor-pointer' >
          <div className='flex px-5 hover:font-semibold'>
            <div>
              <img
                src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-7.svg'
                alt=''
              />
            </div>
            <div className='ml-5'>
              <h2 className='card-title hover:text-blue-700'>{item?.title}</h2>
              <div className='flex text-sm my-1'>
                <div className='flex items-center text-gray-600'>
                  <IoBagHandleOutline />
                  <p className='ml-1'>{item?.job_type}</p>
                </div>
                <div className='flex items-center text-gray-600 ml-10'>
                  <CiClock2 />
                  <p className='ml-1'>{dateDifference(item?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-center pr-8 text-sm text-gray-600 mb-2'>
            <CiLocationOn /> <span className='ml-2'>{item?.address?.country}</span>
          </div>
          <div className='my-3 px-5'>
            <hr />
          </div>
        </div>
          </Link>
          )
        }
      </div>
    </section>
  )
}

export default CompanyDetails
