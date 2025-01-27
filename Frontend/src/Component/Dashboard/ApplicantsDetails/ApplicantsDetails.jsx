import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateApplicationMessage,
  updateApplicationStatus
} from '../../../Redux/Slices/applicationSlice'

const ApplicantsDetails = () => {
  //   const { user } = useSelector(state => state.user)
  const {
    singleApplication,
    updateApplicationMessageLoading,
    updateApplicationStatusLoading
  } = useSelector(state => state.application)
  const [newMessage, setNewMessage] = useState('')

  const dispatch = useDispatch()

  const handleShortList = () => {
    const data = {
      application_status: 'interviewing',
      status: 'interviewing'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
    console.log(singleApplication)
  }

  const handleOfferJob = () => {
    const data = {
      application_status: 'offered',
      status: 'offered'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
  }

  const handleRejectJob = () => {
    const data = {
      application_status: 'rejected',
      status: 'rejected'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
  }

  const handleAddNewMessage = id => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0') // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const year = today.getFullYear()

    const newMessageData = {
      text: newMessage,
      message_date: `${day}-${month}-${year}`
    }
    dispatch(updateApplicationMessage({ id, data: newMessageData }))
  }
  return (
    <section>
      <h1 className='text-center text-xl font-semibold'>
        {singleApplication?.candidate?.name}
      </h1>
      <p className='text-center'>ATS Score: {singleApplication?.ats_score}</p>
      <div className='flex justify-center'>
        {singleApplication?.application_status === 'pending' ? (
          <div className='badge badge-warning mt-2 badge-sm p-2'>
            {singleApplication?.application_status}
          </div>
        ) : singleApplication?.application_status === 'interviewing' ? (
          <div className='badge badge-accent mt-2 badge-sm p-2'>
            {singleApplication?.application_status}
          </div>
        ) : singleApplication?.application_status === 'offered' ? (
          <div className='badge badge-success mt-2 badge-sm p-2'>
            {singleApplication?.application_status}
          </div>
        ) : (
          singleApplication?.application_status === 'rejected' && (
            <div className='badge badge-error mt-2 badge-sm p-2'>
              {singleApplication?.application_status}
            </div>
          )
        )}
      </div>
      {/* button section */}
      <div className='flex justify-center my-4'>
        {updateApplicationStatusLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='mr-3'>
              <button
                disabled={
                  singleApplication?.application_status === 'interviewing'
                }
                onClick={() => handleShortList()}
                className='btn btn-accent btn-sm'
              >
                Short list
              </button>
            </div>
            <div className='mr-3'>
              <button
                disabled={singleApplication?.application_status === 'offered'}
                onClick={() => handleOfferJob()}
                className='btn btn-success btn-sm'
              >
                Offer Job
              </button>
            </div>
            <div>
              <button
                disabled={singleApplication?.application_status === 'rejected'}
                onClick={() => handleRejectJob()}
                className='btn btn-error btn-sm'
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
      <h3 className='text-lg font-medium text-gray-700 mb-2 text-center mt-2'>
        Skills
      </h3>
      <ul className='space-y-2'>
        {singleApplication?.candidate?.skills?.map((skill, index) => (
          <li
            key={index}
            className='px-4 py-2 bg-blue-50 text-blue-800 font-medium rounded-lg shadow-sm border border-blue-100'
          >
            {skill}
          </li>
        ))}
      </ul>
      {singleApplication?.resume && (
        <div className='mt-5 flex justify-center'>
          <div className='flex items-center gap-2 border border-gray-300 rounded-md p-3 shadow-md bg-gray-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 11.828m0 0L19.414 10.414a2 2 0 00-2.828-2.828L11 14.586M12 20h9m-9-4h6'
              />
            </svg>
            <a
              target='_blank'
              href={singleApplication?.resume}
              className='text-blue-600 font-semibold hover:underline'
              rel='noopener noreferrer'
            >
              {singleApplication?.resume?.split('/')[6]}
            </a>
          </div>
        </div>
      )}
      {singleApplication?.offer_letter && (
        <div className='mt-5 flex justify-center'>
          <div className='flex items-center gap-2 border border-gray-300 rounded-md p-3 shadow-md bg-gray-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 11.828m0 0L19.414 10.414a2 2 0 00-2.828-2.828L11 14.586M12 20h9m-9-4h6'
              />
            </svg>
            <a
              target='_blank'
              href={singleApplication?.offer_letter}
              className='text-blue-600 font-semibold hover:underline'
              rel='noopener noreferrer'
            >
              {singleApplication?.offer_letter?.split('/')[5]}
            </a>
          </div>
        </div>
      )}
      <h3 className='text-lg font-medium text-gray-700 mb-2 text-center mt-5'>
        Educations
      </h3>
      {singleApplication?.candidate?.education?.map((item, index) => (
        <div key={item}>
          <div
            key={index}
            className='flex items-center justify-between bg-gray-100 rounded-lg p-4 w-full mb-2'
          >
            <p className='text-gray-800 text-sm md:text-md'>
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
                {item?.startDate?.split('T')[0]} - {item?.endDate?.split('T')[0]}
              </p>
            </p>
          </div>
        </div>
      ))}

      <h2 className='mt-5 text-center text-lg font-semibold'>Messages</h2>
      <div className=' max-h-96 overflow-y-auto'>
        <div className='mt-4 space-y-4'>
          {/* Message 1 */}
          {singleApplication?.messages?.map((message, index) => (
            <div
              key={index}
              className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-md'
            >
              <div className='flex justify-between text-sm text-gray-500'>
                <span className='font-semibold'>
                  {message?.createdBy?.name}
                </span>
                <span>{message?.message_date}</span>
              </div>
              <p className='text-gray-700 mt-2'>{message?.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-3'>
        <label className='text-md font-semibold mb-1'>Add new Message</label>
        <textarea
          className='border border-black p-2 mr-5 w-full rounded-md textarea-bordered'
          placeholder='Add New Message'
          onChange={e => setNewMessage(e.target.value)}
        ></textarea>

        <button
          disabled={updateApplicationMessageLoading}
          className='btn btn-primary btn-sm'
          onClick={() => handleAddNewMessage(singleApplication?._id)}
        >
          {updateApplicationMessageLoading ? '...loading' : 'Add'}
        </button>
      </div>
    </section>
  )
}

export default ApplicantsDetails
