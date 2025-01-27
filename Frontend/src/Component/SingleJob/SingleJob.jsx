/* eslint-disable react/prop-types */
import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { IoBagHandleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import dateDifference from '../../utilis/formattedDate'

const SingleJob = ({ job }) => {
  return (
    <div className='border-2 border-inherit bg-base-100 w-80 rounded-md cursor-pointer hover:border-black hover:shadow-lg'>
      <h1 className='text-lg font-semibold px-2 my-2'>{job?.title} </h1>
      <div className='flex justify-between px-3'>
        <div className='flex items-center text-gray-600'>
          <IoBagHandleOutline />
          <p className='ml-2'>{job?.job_type}</p>
        </div>
        <div className='flex items-center text-gray-600'>
          <CiClock2 />
          <p className='ml-2'>{dateDifference(job?.createdAt)}</p>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-x-2 mt-4 pl-2'>
        {job?.skills?.map((skill, index) => (
          <div
            key={index}
            title={skill}
            className='w-18 bg-gray-200 rounded-md text-center text-sm mr-2 py-1'
          >
            {skill?.length > 5 ? skill?.slice(0, 6) + '...' : skill}
          </div>
        ))}
      </div>
      <div className='my-5 px-3'>
        <hr />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center pl-2 text-gray-600 mb-2'>
          <CiLocationOn /> <span className='ml-2'>{job?.address?.country}</span>
        </div>
        <div className='mb-2 pr-2'>
          <Link to={`/apply-job/${job?._id}`}>
            <button className='btn btn-outline btn-primary btn-sm'>
              Apply
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleJob
