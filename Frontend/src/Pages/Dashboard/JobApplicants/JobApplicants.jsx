import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyJob } from '../../../Redux/Slices/jobSlice'
import ResponsivePaginationComponent from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { FcViewDetails } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const JobApplicants = () => {
  const { jobs } = useSelector(state => state.job)
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyJob())
  }, [dispatch])

  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(jobs?.length / itemsPerPage)
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const items = jobs?.slice(indexOfFirstItem, indexOfLastItem)

  const navigate = useNavigate()

  const handleViewApplicants = id =>{
    navigate(`/dashboard/job/applicants/${id}`) 
  }

  return (
    <section className='h-[calc(100vh-19px)]'>
    <h1 className='text-4xl m-7'>My Jobs</h1>

    <div className='bg-white h-[550px] mx-7 mt-10 px-10 py-10 rounded-xl'>
      <div className='overflow-x-auto '>
        <table className='table '>
          {/* head */}
          <thead className=' bg-blue-400 text-black text-lg'>
            <tr>
              <th>Title</th>
              <th className=''>Job</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map(job => (
              <tr key={job._id} className='text-[17px]'>
                <td>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>{job.title}</div>
                      <div className='badge badge-error mt-2 badge-sm p-2'>
                        {job?.status}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {job?.job_type === 'Part Time' ? (
                    <p className='text-green-600 '>{job?.job_type}</p>
                  ) : (
                    job?.job_type === 'Full Time' && (
                      <p className='text-red-600 '>{job?.job_type}</p>
                    )
                  )}
                  <p>
                    {job?.salary?.salary} Salary, {job?.address.country}
                  </p>
                </td>
                <td>{job?.createdAt.split('T')[0]}</td>
                <th className='flex'>
                  
                  <div>
                    <button
                      className='btn btn-ghost btn-xs text-2xl mt-3'
                      title='Details'
                        onClick={()=>handleViewApplicants(job._id)}
                    >
                      <FcViewDetails />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    <div className=' pb-1 pt-1'>
          <ResponsivePaginationComponent
            total={totalPages}
            current={currentPage}
            onPageChange={page => handlePageChange(page)}
          />
        </div>
  </section>
  )
}

export default JobApplicants
