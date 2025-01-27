import { useSelector } from 'react-redux'

const ApplicationStatus = () => {
  const { singleApplication } = useSelector(state => state.application)
  return (
    <section>
      <h1 className='text-center text-2xl font-bold'>Application Details</h1>
      <h1 className='text-center italic mt-3 text-xl'>
        {singleApplication?.job?.title}
      </h1>
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
      <p className='text-black font-bold text-lg text-center'>
        {singleApplication?.createdAt.split('T')[0]}
      </p>
      <div className='flex flex-col w-full items-center gap-1 mt-2'>
        {/* Job type */}
        <span className='text-red-500 font-semibold'>
          {singleApplication?.job?.job_type}
        </span>
        {/* Salary and other details */}
        <span className='text-black font-bold text-lg'>
          ${singleApplication?.job?.salary?.min.split('.')[0]}-$
          {singleApplication?.job?.salary?.max.split('.')[0]}{' '}
          <span className='text-gray-500 font-normal text-base'>
            / {singleApplication?.job.salary?.salary}.{' '}
            {singleApplication?.job?.experience}
          </span>
        </span>
      </div>
      <div className='text-center mt-5'>
        {/* Additional details */}
        <p className='text-gray-500 text-lg'>
          Company: {singleApplication?.job?.company_name} <br />
          Location: {singleApplication?.job?.address?.country}
        </p>
      </div>
      {/* Attachment Section */}
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
      {/* Interview Details */}
      {singleApplication?.interview?.date && (
        <h2 className='mt-5 text-center text-xl font-semibold'>
          Interview Details
        </h2>
      )}
      <div className='flex justify-center mt-3'>
        <div>
          <div className='flex'>
            <div className='w-[70px]'>
              <p>Date</p>
            </div>
            <div className='mx-10'>
              <p>:</p>
            </div>
            <div className='w-[160px]'>
              {singleApplication?.interview?.date}{' '}
              {singleApplication?.interview?.time}
            </div>
          </div>
          <div className='flex'>
            <div className='w-[70px]'>
              <p>Details</p>
            </div>
            <div className='mx-10'>
              <p>:</p>
            </div>
            <div className='w-[150px]'>
              {singleApplication?.interview?.type === 'Offline' ? (
                <p>
                  {singleApplication?.interview?.location}{' '}
                  {singleApplication?.interview?.phone}
                </p>
              ) : (
                <a href={singleApplication?.interview?.location}>Meet Link</a>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Messages Section */}
      <h2 className='mt-5 text-center text-xl font-semibold'>Messages</h2>
      <div className=' max-h-96 overflow-y-auto'>
        <div className='mt-4 space-y-4'>
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
    </section>
  )
}

export default ApplicationStatus
