import { AiOutlineClose } from 'react-icons/ai'
import { deleteUserResume, reset, updateUserResume } from '../../../Redux/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const UploadResume = () => {
  const { user,isUserResumeDeleteError,isUserResumeDeleteSuccess } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleResumeUpload = e => {
    const formData = new FormData()
    formData.append('resume', e.target.files[0])
    dispatch(updateUserResume(formData))
  }

  useEffect(()=>{
    if(isUserResumeDeleteError){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error deleting resume',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if(isUserResumeDeleteSuccess){
      Swal.fire({
        position: 'top-end',
        icon:'success',
        title: 'Resume deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  },[dispatch, isUserResumeDeleteError, isUserResumeDeleteSuccess])

  const handleDeleteResume = item => {
    const data ={
      resume:item
    }
    dispatch(deleteUserResume(data))
  }
  return (
    <>
      <div className='mt-7'>
        {user?.resume.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between bg-gray-100 rounded-lg p-4 w-full mb-2'
          >
            <a href={item} target='_blank'>
              <p className='text-gray-800 text-md hover:text-blue-500'>
                {item?.split('/')[6]}
              </p>
            </a>
            <button
              aria-label='Remove file'
              className='text-green-600 hover:text-green-800'
              onClick={() => handleDeleteResume(item)}
            >
              <AiOutlineClose size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className='mt-5'>
        <input
          type='file'
          className='file-input file-input-bordered w-full max-w-xs'
          accept='.pdf'
          onChange={handleResumeUpload}
        />
      </div>
    </>
  )
}

export default UploadResume
