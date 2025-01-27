import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { updateApplicationStatus } from '../../../Redux/Slices/applicationSlice'

const InterviewDetails = () => {
  const [value, setValue] = useState('')
  const [time, setTime] = useState()
  const [interviewType, setInterviewType] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const { singleApplication, updateApplicationStatusLoading } = useSelector(
    state => state.application
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setValue(singleApplication?.interview?.date)
    setTime(singleApplication?.interview?.time)
    setInterviewType(singleApplication?.interview?.type)
    if (singleApplication?.interview?.type === 'Online') {
      setMeetingLink(singleApplication?.interview?.location)
    } else {
      setAddress(singleApplication?.interview?.location)
      setPhone(singleApplication?.interview?.phone)
    }
  }, [singleApplication, updateApplicationStatusLoading])

  const handleTimeChange = time => {
    const [hours, minutes] = time.split(':')
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12 // Converts 0 to 12 for midnight
    return `${formattedHours}:${minutes} ${period}`
  }

  const handleDateChange = date => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }
    const formattedDate = date
      .toLocaleDateString('en-US', options)
      .replace(/,/g, '') // Converts to 'Wed Dec 11 2024'
    setValue(formattedDate)
  }

  const handleSaveInterview = () => {
    const data = {
      interview: {
        date: value,
        time: time,
        type: interviewType,
        location: interviewType === 'Online' ? meetingLink : address,
        phone: phone
      }
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
    setTime('')
    setValue('')
    setInterviewType('')
    setMeetingLink('')
    setAddress('')
    setPhone('')
  }

  return (
    <section>
      <h1 className='text-center text-3xl font-semibold mb-3'>
        Interview Date
      </h1>
      <h1 className='text-center font-semibold text-lg mb-3'>
        Job : {singleApplication?.job?.title}
      </h1>
      <h1 className='text-center text-xl font-semibold mb-3'>
        {singleApplication?.candidate?.name}
      </h1>

      <div className='flex justify-center mb-2'>
        Date:{' '}
        {value && (
          <p className='font-semibold'>
            {' '}
            {value} ({time && handleTimeChange(time)})
          </p>
        )}
      </div>
      <div className='flex justify-center mb-2'>
        <input
          value={time}
          onChange={e => setTime(e.target.value)}
          type='time'
          min='9:00'
          className='border border-black rounded-md p-1'
        />
      </div>
      <div className=' flex justify-center'>
        <Calendar onChange={handleDateChange} value={value} />
      </div>
      <div className='mt-3 md:mx-32'>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Interview type </span>
          </div>
          <select
            value={interviewType}
            onChange={e => setInterviewType(e.target.value)}
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          >
            <option value=''>Select interview type</option>
            <option value='Online'>Online</option>
            <option value='Offline'>Offline</option>
          </select>
        </label>
      </div>
      {interviewType === 'Online' && (
        <div className='mt-3 md:mx-32'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Meeting link </span>
            </div>
            <input
              value={meetingLink}
              type='text'
              placeholder='Online Meeting link'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => setMeetingLink(e.target.value)}
            />
          </label>
        </div>
      )}
      {interviewType === 'Offline' && (
        <div>
          <div className='mt-3 md:mx-32'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Address </span>
              </div>
              <input
                value={address}
                type='text'
                placeholder='Address'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className='mt-3 md:mx-32'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Phone </span>
              </div>
              <input
                value={phone}
                type='text'
                placeholder='Phone Number'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setPhone(e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
      <div className='flex justify-center mt-5'>
        {updateApplicationStatusLoading ? (
          <p>...Loading</p>
        ) : (
          <button
            className='btn btn-primary text-white py-2 px-4 rounded-lg '
            type='submit'
            onClick={handleSaveInterview}
          >
            Submit
          </button>
        )}
      </div>
    </section>
  )
}

export default InterviewDetails
