/* eslint-disable no-irregular-whitespace */
import { CiClock2 } from 'react-icons/ci'
import { IoBagHandleOutline } from 'react-icons/io5'
import CompanyDetails from '../../Component/CompanyDetails/CompanyDetails'
import ApplicationJob from '../../Component/ApplicationJob/ApplicationJob'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobID } from '../../Redux/Slices/jobSlice'
import dateDifference from '../../utilis/formattedDate'
import './applyJob.css'
import Swal from 'sweetalert2'
import { reset } from '../../Redux/Slices/applicationSlice'

const ApplyJob = () => {
  const {job} = useSelector(state=>state.job)
  const {createApplicationSuccess,createApplicationError} = useSelector(state=>state.application)
  const {id} = useParams()

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getJobID({id: id}))
  },[dispatch, id])

  useEffect(()=>{
    if(createApplicationError){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Application Error',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if(createApplicationSuccess){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Application Successful',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  },[createApplicationError, createApplicationSuccess, dispatch])
  return (
    <section className='pt-20 md:px-0 px-2'>
      <div className='mt-8'>
        <div className='flex justify-center mb-5'>
          <img
            className='rounded-md md:h-[450px] w-full md:mx-10'
            src='https://www.microsoft.com/de-de/microsoft-365/blog/wp-content/uploads/sites/10/2018/09/10-new-ways-for-everyone-to-achieve-more-in-the-modern-workplace-BANNER-1.png'
            alt=''
          />
        </div>
        <h1 className='text-3xl font-semibold md:ml-24'>{job?.title}</h1>
        <div className='flex md:ml-24 mt-2'>
          <div className='flex items-center text-gray-600'>
            <IoBagHandleOutline />
            <p className='ml-1'>{job?.job_type}</p>
          </div>
          <div className='flex items-center text-gray-600 ml-5'>
            <CiClock2 />
            <p className='ml-1'>{dateDifference(job?.createdAt)}</p>
          </div>
        </div>
        <div className='my-5 mx-24'>
          <hr />
        </div>
        <div className='md:flex justify-around max-w-full'>
          <div className='md:w-[700px] ml-15'>
            <div>
              <h1 className='text-3xl font-semibold'>
                Welcome to {job?.company_name}
              </h1>
              <p className='mt-5 text-justify text-lg'>
                The AliStudio Design team has a vision to establish a trusted
                platform that enables productive and healthy enterprises in a
                world of digital and remote everything, constantly changing work
                patterns and norms, and the need for organizational resiliency.
                The ideal candidate will have strong creative skills and a
                portfolio of work which demonstrates their passion for
                illustrative design and typography. This candidate will have
                experiences in working with numerous different design platforms
                such as digital and print forms.
              </p>
            </div>
            <div className='mt-10'>
              <h1 className='text-3xl font-semibold'>
                Job Description
              </h1>
              <div className='design_container text-lg' dangerouslySetInnerHTML={{__html:job?.description}}/>
            </div>
            <div className='mt-5'>
              <h1 className='text-3xl font-semibold'>Preferred Experience</h1>
              <div className='design_container text-lg' dangerouslySetInnerHTML={{__html:job?.requirements}}/>
            </div>
            <div className='my-5'>
              <hr />
            </div>
            <div className='mb-5'>
              <button
                className='btn btn-primary w-[100px] text-lg'
                onClick={() =>
                  document.getElementById('my_modal_3').showModal()
                }
              >
                Apply
              </button>
            </div>
            {/* modal for job application */}
            <dialog id='my_modal_3' className='modal'>
              <div className='modal-box w-11/12 max-w-xl'>
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                    ✕
                  </button>
                </form>
                <ApplicationJob />
              </div>
            </dialog>
          </div>
          <div className='mt-2 '>
            <CompanyDetails />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplyJob
