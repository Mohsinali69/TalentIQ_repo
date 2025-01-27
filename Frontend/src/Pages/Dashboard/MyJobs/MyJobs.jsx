import { useEffect, useState } from 'react'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  deleteJob,
  getMyJob,
  reset,
  resetDetails
} from '../../../Redux/Slices/jobSlice'
import ResponsivePaginationComponent from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const MyJobs = () => {
  const { jobs, updateJobSuccess, deleteJobSuccess, deleteJobError } =
    useSelector(state => state.job)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyJob())
  }, [dispatch])

  useEffect(() => {
    if (updateJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (deleteJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job deleted Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (deleteJobError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Job delete failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
  }, [updateJobSuccess, deleteJobError, dispatch, deleteJobSuccess])

  const handledeleteJob = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteJob({ id: id }))
      }
    })
  }
  const handleEditJobs = id => {
    navigate(`/dashboard/my-jobs/${id}`)
  }

  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(jobs?.length / itemsPerPage)
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const items = jobs?.slice(indexOfFirstItem, indexOfLastItem)
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
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Details'
                        onClick={() => handleEditJobs(job?._id)}
                      >
                        <MdOutlineModeEditOutline />
                      </button>
                    </div>
                    <div>
                      <button
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Details'
                        onClick={() => handledeleteJob(job?._id)}
                      >
                        <MdDeleteOutline />
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

export default MyJobs
