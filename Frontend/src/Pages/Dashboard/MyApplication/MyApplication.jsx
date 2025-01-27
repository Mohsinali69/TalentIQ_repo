import { FcViewDetails } from 'react-icons/fc'
import ApplicationStatus from '../../../Component/Dashboard/ApplicationStatus/ApplicationStatus'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMyApplications,
  setSingleApplication,
  setSingleApplicationNull
} from '../../../Redux/Slices/applicationSlice'

const MyApplication = () => {
  const { applications } = useSelector(state => state.application)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyApplications())
  }, [dispatch])

console.log(applications);

  return (
    <section className='h-[calc(100vh-29px)]'>
      <h1 className='text-4xl m-7'>My Applications</h1>
      <div className='bg-white mx-7 mt-10 px-10 py-10 rounded-xl'>
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
              {/* row 1 */}
              {applications?.map(app => (
                <tr key={app?._id} className='text-[17px]'>
                  <td className='w-[350px]'>
                    <div className='flex items-center gap-3'>
                      <div>
                        <div className='font-bold'>{app?.job?.title}</div>
                        {app?.status === 'applied' ? (
                          <div className='badge badge-warning my-2 p-2'>
                            {app?.status}
                          </div>
                        ) : app?.status === 'interviewing' ? (
                          <div className='badge badge-accent my-2 p-2'>
                            {app?.status}
                          </div>
                        ): app?.status==='offered'?<div className='badge badge-success my-2 p-2'>
                        {app?.status}
                      </div>: (
                          app?.status === 'rejected' && (
                            <div className='badge badge-error my-2 p-2'>
                              {app?.status}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='w-[350px]'>
                    <p className='text-red-600 '>{app?.job?.job_type}</p>
                    <p>
                      {app?.job?.salary?.salary} Salary,{' '}
                      {app?.job?.address?.country}
                    </p>
                  </td>
                  <td className='w-[300px]'>{app?.createdAt.split('T')[0]}</td>
                  <th>
                    <button
                      className='btn btn-ghost btn-xs text-2xl'
                      title='Details'
                      onClick={() => {
                        dispatch(setSingleApplication(app))
                        document.getElementById('my_modal_5').showModal()
                      }}
                    >
                      <FcViewDetails />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog id='my_modal_5' className='modal'>
            <div className='modal-box'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => dispatch(setSingleApplicationNull())}
                  className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                >
                  ✕
                </button>
              </form>
              <ApplicationStatus />
            </div>
          </dialog>
        </div>
      </div>
    </section>
  )
}

export default MyApplication
