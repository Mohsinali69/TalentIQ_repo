import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEducation } from '../../../Redux/Slices/educationSlice'

const UpdateEducationForm = () => {
    const {education} = useSelector(state=>state.educations)
  const [title, setTitle] = useState('')
  const [institution, setInstitution] = useState('')
  const [subject, setCourse] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

    useEffect(()=>{
        setTitle(education?.title);
        setInstitution(education?.institution);
        setCourse(education?.subject);
        setStartDate(education?.startDate);
        setEndDate(education?.endDate);
        setDescription(education?.description);
        setStatus(education?.status);
    },[education])

  const dispatch = useDispatch()
  const handleAddEducation = () => {
    const data = {
      title,
      institution,
      subject,
      startDate,
      endDate,
      description,
      status
    }
    dispatch(updateEducation({id:education?._id,data}))
  }
  return (
    <section>
      <div>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Title *</span>
          </div>
          <select
          value={title}
            onChange={e => setTitle(e.target.value)}
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          >
            <option value='0' disabled selected>
              Select Education
            </option>
            <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
            <option value="Master's Degree">Master&apos;s Degree</option>
            <option value='PhD'>PhD</option>
          </select>
        </label>
      </div>
      <div className='grid grid-cols-2 gap-x-5'>
        <div className='mt-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Institution *</span>
            </div>
            <input
            value={institution}
              onChange={e => setInstitution(e.target.value)}
              type='text'
              placeholder='Name of Institution'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
            />
          </label>
        </div>
        <div className='mt-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Courses *</span>
            </div>
            <input
            value={subject}
              onChange={e => setCourse(e.target.value)}
              type='text'
              placeholder='Course'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
            />
          </label>
        </div>
        <div className='mt-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Status *</span>
            </div>
            <select
          value={status}
            onChange={e => setStatus(e.target.value)}
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          >
            <option value='0' disabled selected>
              Select Education
            </option>
            <option value="Graduated">Graduated</option>
            <option value="Current">Current</option>
          </select>
          </label>
        </div>
      </div>
      <div className='mt-3'>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Year *</span>
          </div>
          <div className='grid grid-cols-2 gap-x-5'>
            <div>
              <input
              value={startDate?.split('T')[0]}
                type='date'
                placeholder='Name of Institution'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <input
              value={endDate?.split('T')[0]}
                type='date'
                placeholder='Name of Institution'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </label>
      </div>
      <div className='mt-3'>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Description</span>
          </div>
          <textarea
          value={description}
            onChange={e => setDescription(e.target.value)}
            className='p-2 rounded-lg  w-full border border-black'
            placeholder='Description'
            style={{
              height: '150px',
              resize: 'none'
            }}
          ></textarea>
        </label>
      </div>
      <div className='modal-action'>
        <form method='dialog'>
          {/* if there is a button, it will close the modal */}
          <button className='btn btn-info' onClick={handleAddEducation}>
            Update
          </button>
        </form>
      </div>
    </section>
  )
}

export default UpdateEducationForm
