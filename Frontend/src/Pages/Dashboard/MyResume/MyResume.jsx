import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'
import UploadResume from '../../../Component/Dashboard/UploadResume/UploadResume'
import UploadEducation from '../../../Component/Dashboard/UploadEducation/UploadEducation'
import {
  deleteEducation,
  eduReset,
  getEducationList,
  setEducation
} from '../../../Redux/Slices/educationSlice'
import { AiOutlineClose } from 'react-icons/ai'
import UpdateEducationForm from '../../../Component/Dashboard/UpdateEducationForm/UpdateEducationForm'
import MySkills from '../../../Component/Dashboard/MySkills/MySkills'

const MyResume = () => {
  const {
    educations,
    createEducationSuccess,
    createEducationError,
    updateEducationSuccess,
    updateEducationError,
    deleteEducationSuccess,
    deleteEducationError
  } = useSelector(state => state.educations)
  const {
    isUserResumeUpdateSuccess,
    isUserResumeUpdateError,
    isUpdateUserError,
    isUpdateUserSuccess
  } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEducationList())
  }, [dispatch, updateEducationSuccess])

  useEffect(() => {
    if (isUpdateUserSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUpdateUserError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'User update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserResumeUpdateSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Resume update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserResumeUpdateError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Resume update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (createEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education Create success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (createEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education Create failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (updateEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education Update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (updateEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education Update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (deleteEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education delete success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (deleteEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education delete failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
  }, [
    createEducationError,
    createEducationSuccess,
    deleteEducationError,
    deleteEducationSuccess,
    dispatch,
    isUpdateUserError,
    isUpdateUserSuccess,
    isUserResumeUpdateError,
    isUserResumeUpdateSuccess,
    updateEducationError,
    updateEducationSuccess
  ])

  const handleDeleteResume = id => {
    dispatch(deleteEducation(id))
  }

  return (
    <section>
      <h1 className='text-4xl m-7'>My Resume</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Resume Attachment</h1>
        <UploadResume />
      </div>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800 mb-8'>Education Background</h1>
        {educations?.map((item, index) => (
          <div key={item}>
            <div
              key={index}
              className='flex items-center justify-between bg-gray-100 rounded-lg p-4 w-full mb-2'
            >
              <p
                className='text-gray-800 text-sm md:text-md hover:text-blue-500 cursor-pointer'
                onClick={() => {
                  dispatch(setEducation(item))
                  document.getElementById('my_modal_4').showModal()
                }}
              >
                {item?.title} of {item?.subject} in {item?.institution}{' '}
                <span
                  className={`ml-5 badge  badge-sm md:badge-md ${
                    item?.status === 'Graduated'
                      ? 'badge-success'
                      : 'badge-warning'
                  }`}
                >
                  {item?.status}
                </span>
                <p className='md:text-sm text-xs'>
                  {item?.startDate.split('T')[0]} -{' '}
                  {item?.endDate.split('T')[0]}
                </p>
              </p>
              <button
                aria-label='Remove file'
                className='text-green-600 hover:text-green-800'
                onClick={() => handleDeleteResume(item?._id)}
              >
                <AiOutlineClose size={18} />
              </button>
            </div>
          </div>
        ))}
        <UploadEducation />
      </div>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl mb-5'>
        <h1 className='text-3xl text-blue-800'>Skills</h1>
        <MySkills />
      </div>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box '>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <UpdateEducationForm />
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </section>
  )
}

export default MyResume
